import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import StudentHome from "./StudentHome.jsx";
import AdminHome from "./AdminHome.jsx";

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <p className="page-message">Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return user.role === "admin" ? <AdminHome /> : <StudentHome />;
}
