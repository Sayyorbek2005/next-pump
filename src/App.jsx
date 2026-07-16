import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sahifalarni import qilish
import Register from "./pages/registrer/Register";
import Login from "./pages/login/Login";
import UserDash from "./pages/user/userDash/UserDash"; 
import AdminDashboard from "./pages/admin/admindash/AdminDash"; 
import MasterDetail from "./pages/admin/userdetals/UserDestals";

// Himoyalangan marshrut komponenti
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import AppInitializer from "./components/appI"; // Yangi qo'shiladigan komponent

function App() {
  return (
    <>
      {/* ToastContainer bildirishnomalari uchun */}
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
        {/* ENG ASOSIY LINK: Kirganda tekshirish */}
        <Route path="/" element={<AppInitializer />} />

        {/* Ochiq sahifalar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER DASHBOARD */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDash />
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* YANGI MARSHRUT */}
        <Route
          path="/admin/master/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MasterDetail />
            </ProtectedRoute>
          }
        />

        {/* Qolgan barcha holatlarda avtomat yo'naltirish */}
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

function RoleBasedRedirect() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }
  return <Navigate to="/user-dashboard" replace />;
}

export default App;