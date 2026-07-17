import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sahifalarni import qilish
import Register from "./pages/registrer/Register";
import Login from "./pages/login/Login";
import UserDash from "./pages/user/userDash/UserDash"; 
import AdminDashboard from "./pages/admin/admindash/AdminDash"; 
import MasterDetail from "./pages/admin/userdetals/UserDestals";

// Himoyalangan marshrut va Tekshiruvchi komponentlar
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import AppInitializer from "./components/appI";

function App() {
  return (
    <>
      {/* Bildirishnomalar uchun ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <Routes>
        {/* BOSH KIRISH NUQTASI (Tekshiruvchi) */}
        <Route path="/" element={<AppInitializer />} />

        {/* Ochiq sahifalar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER DASHBOARD (Faqat foydalanuvchilar uchun) */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDash />
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD (Faqat adminlar uchun) */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* USTALAR PROFILI (Faqat adminlar uchun) */}
        <Route
          path="/admin/master/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MasterDetail />
            </ProtectedRoute>
          }
        />

        {/* Noto'g'ri havolalar yozilganda avtomat yo'naltirish */}
        <Route
          path="*"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <RoleBasedRedirect />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

// Rollarga qarab avtomat yo'naltiruvchi yordamchi komponent
function RoleBasedRedirect() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }
  return <Navigate to="/user-dashboard" replace />;
}

export default App;