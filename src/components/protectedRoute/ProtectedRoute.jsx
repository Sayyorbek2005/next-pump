import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const userString = localStorage.getItem("user");

  // 1. Agar foydalanuvchi hali aniqlanmagan va ro'yxatdan o'tmagan bo'lsa -> Tekshiruv nuqtasiga yuborish
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

  return children;
}