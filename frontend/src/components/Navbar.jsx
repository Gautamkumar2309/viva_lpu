// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ FIXED: correct import
import "../styles/app.css";

function Navbar() {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserEmail(decoded.email || "User");
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
        setUserEmail(null);
      }
    } else {
      setUserEmail(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserEmail(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">🏠 Home</Link>
      </div>

      <div className="nav-right">
        {userEmail ? (
          <>
            <div className="profile-circle" title={userEmail}>
              {userEmail[0].toUpperCase()}
            </div>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
