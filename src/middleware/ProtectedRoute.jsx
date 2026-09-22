import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = Cookies.get("token");

  if (!token) {
    Cookies.remove("token");
    return <Navigate to="/login" replace />;
  }

  try {
    jwtDecode(token);
  } catch (error) {
    console.error(error);
    Cookies.remove("token");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}