import { Link } from "react-router-dom";

function Footer() {
    return ( 
        <>
        <div className="home-body">
            <footer>
                <div className="home-container">
                    <div className="footer-content">
                        <div className="footer-about">
                            <h3>Luxury Haven Hotel</h3>
                            <p>Experience unparalleled luxury and comfort in the heart of the city. Your perfect getaway awaits.</p>
                            <div className="social-icons">
                                <Link to="#"><i className="fab fa-facebook-f"></i></Link>
                                <Link to="#"><i className="fab fa-twitter"></i></Link>
                                <Link to="#"><i className="fab fa-instagram"></i></Link>
                                <Link to="#"><i className="fab fa-linkedin-in"></i></Link>
                            </div>
                        </div>

                        <div className="footer-links">
                            <h4>Quick Links</h4>
                            <Link to="#">Home</Link>
                            <Link to="#about">About Us</Link>
                            <Link to="#rooms">Rooms</Link>
                            <Link to="#services">Services</Link>
                        </div>

                        <div className="footer-links">
                            <h4>Support</h4>
                            <Link to="#">FAQ</Link>
                            <Link to="#">Privacy Policy</Link>
                            <Link to="#">Terms & Conditions</Link>
                            <Link to="#contact">Contact</Link>
                        </div>

                        <div className="footer-newsletter">
                            <h4>Newsletter</h4>
                            <p>Subscribe to our newsletter for special offers and updates.</p>
                            <div className="newsletter-form">
                                <input type="email" className="newsletter-input" placeholder="Your Email" />
                                <button className="newsletter-btn">Subscribe</button>
                            </div>
                        </div>
                    </div>

                    <div className="copyright">
                        <p>&copy; 2023 Luxury Haven Hotel. All rights reserved.</p>
                    </div>
                </div>
            </footer>
            </div>
        </>
     );
}

export default Footer;