import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";

export default function AppInitializer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const tg = window.Telegram?.WebApp;

  useEffect(() => {
    const initApp = async () => {
      try {
        // 1. Mahalliy xotiradan foydalanuvchini tekshiramiz
        const localUser = JSON.parse(localStorage.getItem("user"));
        const telegramId = tg?.initDataUnsafe?.user?.id ? String(tg.initDataUnsafe.user.id) : null;

        // Agar brauzer xotirasida to'liq ro'yxatdan o'tgan foydalanuvchi bo'lsa, to'g'ridan-to'g'ri o'tkazamiz
        if (localUser && localUser.region && localUser.job) {
          if (localUser.role === "admin") {
            navigate("/admin-dashboard", { replace: true });
          } else {
            navigate("/user-dashboard", { replace: true });
          }
          return;
        }

        // 2. Agar xotirada bo'lmasa, lekin Telegram orqali kirgan bo'lsa, bazadan tekshiramiz
        if (telegramId) {
          const { data: user, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("telegram_id", telegramId)
            .maybeSingle();

          if (error) throw error;

          // Agar foydalanuvchi bor bo'lsa VA viloyati hamda kasbi to'ldirilgan bo'lsa
          if (user && user.region && user.job) {
            localStorage.setItem("user", JSON.stringify(user)); // Xotiraga saqlaymiz

            if (user.role === "admin") {
              navigate("/admin-dashboard", { replace: true });
            } else {
              navigate("/user-dashboard", { replace: true });
            }
            return;
          }
        }

        // 3. Agar foydalanuvchi umuman topilmasa yoki ma'lumotlari chala bo'lsa, registratsiyaga yuboramiz
        navigate("/register", { replace: true });

      } catch (err) {
        console.error("Ilovani yuklashda xatolik:", err.message);
        // Xatolik yuz bersa ham xavfsizlik uchun ro'yxatdan o'tishga yo'naltiramiz
        navigate("/register", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    initApp();
  }, [tg, navigate]);

  if (loading) {
    return (
      <div 
        className="auth-page-wrapper" 
        style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "100vh",
          fontFamily: "sans-serif",
          color: "#333",
          background: "#f4f6f9"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div className="loader" style={{ marginBottom: "15px", fontSize: "18px", fontWeight: "bold" }}>
            Tizim tekshirilmoqda...
          </div>
          <p style={{ color: "#777", fontSize: "14px" }}>Iltimos, kuting.</p>
        </div>
      </div>
    );
  }

  return null;
}