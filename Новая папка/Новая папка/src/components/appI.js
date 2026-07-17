import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client"; // Supabase clientingizning aniq yo'lini yozing

export default function AppInitializer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const tg = window.Telegram?.WebApp;
      
      if (tg) {
        tg.ready();
        tg.expand();
      }

      // Telegram WebApp ichidan foydalanuvchi ID sini olamiz
      const telegramId = tg?.initDataUnsafe?.user?.id;

      // 1. Agar Telegram ichidan kirmagan bo'lsa (oddiy brauzerda ochilgan bo'lsa)
      if (!telegramId) {
        const localUser = localStorage.getItem("user");
        if (localUser) {
          const parsed = JSON.parse(localUser);
          if (parsed.role === "admin") {
            navigate("/admin-dashboard", { replace: true });
          } else {
            navigate("/user-dashboard", { replace: true });
          }
        } else {
          navigate("/login", { replace: true });
        }
        setLoading(false);
        return;
      }

      // 2. Agar Telegram orqali kirgan bo'lsa
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("telegram_id", telegramId)
          .maybeSingle();

        if (error) throw error;

        if (profile) {
          // Profil to'liq kiritilganligini tekshiramiz (viloyat, tuman, kasb bormi?)
          if (profile.region && profile.district && profile.job) {
            
            // Ma'lumotlar to'liq bo'lsa, local xotiraga yozamiz va to'g'ri Dashboardga o'tamiz
            localStorage.setItem("user", JSON.stringify(profile));
            
            if (profile.role === "admin") {
              navigate("/admin-dashboard", { replace: true });
            } else {
              navigate("/user-dashboard", { replace: true });
            }
          } else {
            // Profil bor, lekin ma'lumotlar to'liq emas (faqat botdan kontakt ulashgan)
            navigate("/register", { state: { profile }, replace: true });
          }
        } else {
          // Bazada bunday foydalanuvchi umuman bo'lmasa
          navigate("/register", { replace: true });
        }
      } catch (err) {
        console.error("Avtorizatsiya xatoligi:", err);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    }

    // Telegram to'liq yuklanishi uchun 150ms kechikish bilan ishga tushiramiz
    const timeout = setTimeout(() => {
      checkUser();
    }, 150);

    return () => clearTimeout(timeout);
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#111", color: "#fff" }}>
        <h3>Yuklanmoqda...</h3>
      </div>
    );
  }

  return null;
}