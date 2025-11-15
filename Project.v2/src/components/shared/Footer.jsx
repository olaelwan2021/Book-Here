import { Link, useNavigate } from "react-router-dom";

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Footer() {
    const navigate = useNavigate()

    const form = useRef();
    const resetEmail = useRef()
    const MySwal = withReactContent(Swal)

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_ep1j9u6', 'template_koyyv5n', form.current, {
                publicKey: '9sT-4YJHDdrrQeOFn',
            })
            .then(
                () => {
                    MySwal.fire({
                        title: "Message sent successfully!",
                        icon: "success",
                        text: "Your subscription details will be delivered to you shortly",
                        confirmButtonColor: "#0E6B87",
                        draggable: false
                    })
                },
                (error) => {
                    MySwal.fire({
                        title: "Message error!",
                        icon: "error",
                        text: error,
                        confirmButtonColor: "#0E6B87",
                        draggable: false
                    })
                },
            );
            resetEmail.current.value = ""
    };

    return ( 
        <>
        <div className="home-body">
            <footer>
                <div className="home-container">
                    <div className="footer-content">
                        <div className="footer-about">
                            <h3>Book Here Hotel</h3>
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
                            <a href="#hero" onClick={() => navigate("/#")}>Home</a>
                            <a href="#about" onClick={() => navigate("/#")}>About Us</a>
                            <a href="#rooms" onClick={() => navigate("/#")}>Rooms</a>
                            <a href="#services" onClick={() => navigate("/#")}>Services</a>
                        </div>

                        <div className="footer-links">
                            <h4>Support</h4>
                            <Link to="#">FAQ</Link>
                            <Link to="#">Privacy Policy</Link>
                            <Link to="#">Terms & Conditions</Link>
                            <a href="#contact" onClick={() => navigate("/#")}>Contact</a>
                        </div>

                        <div className="footer-newsletter">
                            <h4>Newsletter</h4>
                            <p>Subscribe to our newsletter for special offers and updates.</p>
                            <div>
                                <form className="newsletter-form" ref={form} onSubmit={sendEmail}>
                                    <input type="email" className="newsletter-input" placeholder="Your Email" name="user_email" required ref={resetEmail} />
                                    <button type="submit" className="newsletter-btn">Subscribe</button>
                                </form>
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