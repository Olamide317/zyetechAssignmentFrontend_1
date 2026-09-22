import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage.jsx';
import LoginPage from './pages/loginPage.jsx';
import RegisterPage from './pages/registerPage.jsx';
import DashboardPage from './pages/dashBoardPage.jsx';
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./middleware/ProtectedRoute.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />} >
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>

      <ToastContainer />

    </Router>
  );
}