import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import api from "../../services/api";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const avatarRef = useRef();


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.auth.profile();
        setProfile(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    if (isLoggedIn) fetchProfile();
  }, [isLoggedIn]);

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    navigate("/registration");
  };


useEffect(() => {
  if (isLoggedIn && profile) {
    localStorage.setItem("user", JSON.stringify(profile));
  }
}, [isLoggedIn, profile]);


  useEffect(() => {
        if (profile.role) {
          profile.role == 'admin' ? localStorage.setItem("isAdmin", true) : localStorage.setItem("isAdmin", false);
        }
  }, [profile]);


  const sections = ["home", "about", "rooms", "services", "contact"];

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm rounded-bottom"
      style={{
        transition: "0.3s",
      }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to="/">
          <i className="fas fa-hotel me-2 "></i>Book Here
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {sections.map((section) => (
              <li className="nav-item link-hover" key={section}>
                <Link
                  to={`/#${section}`}
                  className="nav-link text-white "
                  onClick={() => scrollToSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              </li>
            ))}

            {profile.role == 'admin' && (
              <li className="nav-item">
                <Link
                  to="/dashboard"
                  className="nav-link text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {isLoggedIn ? (
            <div className="ms-lg-3 position-relative" ref={avatarRef}>
              <img
                src={`http://localhost:5000/uploads/${profile.avatar }`|| "https://i.pravatar.cc/40"}
                alt="avatar"
                className="rounded-circle"
                style={{
                  width: "45px",
                  height: "45px",
                  cursor: "pointer",
                  transition: "0.3s",
                  border: "1px solid #fff",
                }}
                onClick={() => setAvatarOpen(!avatarOpen)}
              />
              {avatarOpen && (
                <div
                  className="position-absolute end-0 mt-2 py-2 bg-white rounded shadow"
                  style={{ minWidth: "150px", zIndex: 1000, padding: "10px" }}
                >
                  <button
                    className="dropdown-item text-dark"
                    onClick={() => {
                      navigate("/profile");
                      setAvatarOpen(false);
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="dropdown-item text-dark"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="btn btn-light ms-lg-3 fw-bold"
              onClick={() => navigate("/registration")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
