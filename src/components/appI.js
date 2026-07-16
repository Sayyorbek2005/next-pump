import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client"; // Supabase client manzilingizni tekshirib oling

export default function AppInitializer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const tg = window.Telegram?.WebApp;

  useEffect(() => {
    async function checkUser() {
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

      // 2. Agar foydalanuvchi Telegram orqali kirgan bo'lsa
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("telegram_id", telegramId)
          .maybeSingle();

        if (error) throw error;

        if (profile) {
          // BAZADA BOR: Profil to'liq kiritilganligini tekshiramiz (viloyat, tuman, kasb bormi?)
          if (profile.region && profile.district && profile.job) {
            
            // Ma'lumotlar to'liq! LocalStorage ga yozamiz va hecham Register-ga kirmasdan Dashboardga o'tamiz.
            localStorage.setItem("user", JSON.stringify(profile));
            
            if (profile.role === "admin") {
              navigate("/admin-dashboard", { replace: true });
            } else {
              navigate("/user-dashboard", { replace: true });
            }
          } else {
            // Profil bor, lekin ma'lumotlar to'liq emas (faqat botdan kontakt ulashgan)
            // Register sahifasiga profil ma'lumotlari bilan birga jo'natamiz
            navigate("/register", { state: { profile }, replace: true });
          }
        } else {
          // Bazada bunday foydalanuvchi umuman yo'q bo'lsa
          navigate("/register", { replace: true });
        }
      } catch (err) {
        console.error("Avtorizatsiya xatoligi:", err);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    }

    if (tg) {
      tg.ready();
      tg.expand();
    }
    checkUser();
  }, [tg, navigate]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#111", color: "#fff" }}>
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  return null;
}