import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  // LocalStorage-dan ma'lumotni olamiz
  const userString = localStorage.getItem("user");

  // 1. Agar foydalanuvchi tizimga umuman kirmagan bo'lsa -> Registratsiya sahifasiga o'tkazish
  if (!userString) {
    return <Navigate to="/register" replace />;
  }

  // Matnni JSON obyektga o'giramiz
  const user = JSON.parse(userString);

  // 2. Agar foydalanuvchining roli ruxsat berilgan rollar ro'yxatida bo'lmasa:
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Roliga qarab tegishli sahifaga qaytarish
    if (user.role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }
    return <Navigate to="/user-dashboard" replace />;
  }

  // 3. Hamma tekshiruvlardan muvaffaqiyatli o'tsa -> Sahifani ko'rsatish
  return children;
}