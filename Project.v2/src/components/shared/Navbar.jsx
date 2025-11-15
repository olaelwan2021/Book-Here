import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate()

    return ( 
        <>
        {/* <Link to="#" className="navbar-brand"></Link> */}
        <div className="home-body">
            <nav className="navbar fixed-top text-color">
                <div className="home-container nav-container">
                    <h4><i className="fas fa-hotel"></i> Book Here</h4>
                    <button className="nav-toggle" id="navToggle">
                        <i className="fas fa-bars"></i>
                    </button>
                    <ul className="nav-menu" id="navMenu">
                        <li className="nav-item">
                            <a href="#hero" className="nav-link" onClick={() => navigate("/#")}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="#about" className="nav-link" onClick={() => navigate("/#")}>About</a>
                        </li>
                        <li className="nav-item">
                            <a href="#rooms" className="nav-link" onClick={() => navigate("/#")}>Rooms</a>
                        </li>
                        <li className="nav-item">
                            <a href="#services" className="nav-link" onClick={() => navigate("/#")}>Services</a>
                        </li>
                        <li className="nav-item">
                            <a href="#contact" className="nav-link" onClick={() => navigate("/#")}>Contact</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        </li>
                    </ul>
                    <button className="navbar-btn rounded px-4 py-1 fw-bold" onClick={() => navigate("/registration")}>Login</button>
                </div>
            </nav>
            </div>
        </>
     );
}

export default Navbar;