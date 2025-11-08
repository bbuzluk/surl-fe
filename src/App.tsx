import { Routes, Route, Navigate } from "react-router-dom";
import type { JSX } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuth } from "./commons/AuthContext";
import NotFoundPage from "./pages/NotFoundPage";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? <Navigate to="/" replace /> : children;
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
    </Routes>
  );
}