import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand">CampusFix</Link>
      <nav>
        {user ? (
          <>
            <span className="nav-user">{user.name} ({user.role})</span>
            <button className="btn btn-outline" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/signup" className="btn">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
