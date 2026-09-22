import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    let isValid = true;

    try {
        const token = Cookies.get("token");

        if (!token) {
            isValid = false;
        } else {
            const decoded = jwtDecode(token);

            console.log(decoded);

            if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
                isValid = false;
            }
        }
    } catch (error) {
        console.log(error);
        isValid = false;
    }

    if (!isValid) {
        Cookies.remove("token");
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}