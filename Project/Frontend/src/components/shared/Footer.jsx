import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Footer() {
    const navigate = useNavigate()
    const [activeModal, setActiveModal] = useState(null); // 'faq', 'privacy', 'terms'

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

    const openModal = (modalType) => {
        setActiveModal(modalType);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    const modalContent = {
        faq: {
            title: "Frequently Asked Questions",
            content: `
                <h3>Booking & Reservations</h3>
                <p><strong>Q: How do I make a reservation?</strong><br>
                A: You can book directly through our website, mobile app, or by calling our reservation desk.</p>
                
                <p><strong>Q: What is your cancellation policy?</strong><br>
                A: Cancellations made 48 hours before check-in receive a full refund. Late cancellations may incur a fee.</p>
                
                <h3>Check-in & Check-out</h3>
                <p><strong>Q: What are your check-in and check-out times?</strong><br>
                A: Check-in is from 3:00 PM, and check-out is by 11:00 AM.</p>
                
                <p><strong>Q: Can I request early check-in or late check-out?</strong><br>
                A: Early check-in and late check-out are subject to availability and may require an additional fee.</p>
                
                <h3>Amenities & Services</h3>
                <p><strong>Q: Do you have parking available?</strong><br>
                A: Yes, we offer both valet and self-parking options for guests.</p>
                
                <p><strong>Q: Is breakfast included?</strong><br>
                A: Breakfast is included in some room packages. Please check your booking details.</p>
            `
        },
        privacy: {
            title: "Privacy Policy",
            content: `
                <h3>Information We Collect</h3>
                <p>We collect information that you provide directly to us, including:</p>
                <ul>
                    <li>Personal identification information (Name, email address, phone number)</li>
                    <li>Payment information</li>
                    <li>Booking preferences and history</li>
                    <li>Communication preferences</li>
                </ul>
                
                <h3>How We Use Your Information</h3>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>Process your bookings and manage your stay</li>
                    <li>Provide customer support</li>
                    <li>Send you important updates about your reservation</li>
                    <li>Improve our services and guest experience</li>
                    <li>Send marketing communications (with your consent)</li>
                </ul>
                
                <h3>Data Security</h3>
                <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                
                <h3>Your Rights</h3>
                <p>You have the right to access, correct, or delete your personal data. Contact us at privacy@bookherehotel.com for any data-related requests.</p>
            `
        },
        terms: {
            title: "Terms & Conditions",
            content: `
                <h3>Booking Terms</h3>
                <p>By making a reservation with Book Here Hotel, you agree to the following terms:</p>
                
                <h3>Reservations & Payments</h3>
                <ul>
                    <li>A valid credit card is required for all reservations</li>
                    <li>Room rates are subject to change without notice</li>
                    <li>Additional charges may apply for extra guests or services</li>
                    <li>We accept major credit cards and debit cards</li>
                </ul>
                
                <h3>Cancellation Policy</h3>
                <ul>
                    <li>Cancellations made 48+ hours before check-in: Full refund</li>
                    <li>Cancellations made 24-48 hours before check-in: 50% refund</li>
                    <li>Cancellations made less than 24 hours before check-in: No refund</li>
                    <li>No-shows will be charged the full amount of the reservation</li>
                </ul>
                
                <h3>Hotel Policies</h3>
                <ul>
                    <li>Check-in: 3:00 PM | Check-out: 11:00 AM</li>
                    <li>Smoking is prohibited in all rooms</li>
                    <li>Pets are allowed in designated rooms only</li>
                    <li>Guests are responsible for any damages to hotel property</li>
                </ul>
                
                <h3>Liability</h3>
                <p>Book Here Hotel is not liable for loss or damage to guest property, personal injury, or any other claims except where proven negligent.</p>
            `
        }
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
                                    <Link to="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></Link>
                                    <Link to="https://www.x.com/" target="_blank"><i className="fab fa-x-twitter"></i></Link>
                                    <Link to="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i></Link>
                                    <Link to="https://www.linkedin.com/" target="_blank"><i className="fab fa-linkedin-in"></i></Link>
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
                                <Link to="#" onClick={() => openModal('faq')}>FAQ</Link>
                                <Link to="#" onClick={() => openModal('privacy')}>Privacy Policy</Link>
                                <Link to="#" onClick={() => openModal('terms')}>Terms & Conditions</Link>
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
                            <p>&copy; 2025 Book Here Hotel. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Modal Component */}
            {activeModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="legal-modal p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="footer-modal-header p-2 mb-2 rounded">
                            <h2>{modalContent[activeModal].title}</h2>
                            <button className="close-btn" onClick={closeModal}>×</button>
                        </div>
                        
                        <div className="footer-modal-body">
                            <div 
                                className="footer-modal-content"
                                dangerouslySetInnerHTML={{ __html: modalContent[activeModal].content }}
                            />
                        </div>
                        
                        <div className="footer-modal-footer">
                            <button className="btn-primary" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Footer;