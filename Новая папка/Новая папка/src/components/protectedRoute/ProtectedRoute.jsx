import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const userString = localStorage.getItem("user");

  // 1. Agar foydalanuvchi tizimga kirmagan bo'lsa -> Tekshiruv bosh sahifasiga yuborish
  if (!userString) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(userString);

  // 2. Ruxsat berilgan rollarni tekshirish
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }
    return <Navigate to="/user-dashboard" replace />;
  }

  // 3. Hamma tekshiruvdan o'tsa sahifani ko'rsatish
  return children;
}