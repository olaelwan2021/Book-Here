import { Link, useNavigate } from "react-router-dom";
import p1 from "../assets/Home/1.avif"
import p2 from "../assets/Home/2.avif"
import p3 from "../assets/Home/3.avif"
import p4 from "../assets/Home/4.avif"

import p8 from '../assets/rooms/room_6/2.jpg'
import p9 from '../assets/rooms/room_6/3.jpg'
import p11 from '../assets/rooms/room_5/1.jpg'
import p5 from '../assets/rooms/room_5/2.jpg'
import p7 from '../assets/rooms/room_6/1.jpg'
import p10 from '../assets/rooms/room_4/3.jpg'

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


function Home() {
    const navigate = useNavigate()
    const form = useRef();
    const resetName = useRef()
    const resetEmail = useRef()
    const resetSubject = useRef()
    const resetMessage = useRef()
    const MySwal = withReactContent(Swal)

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_ep1j9u6', 'template_awisvfc', form.current, {
                publicKey: '9sT-4YJHDdrrQeOFn',
            })
            .then(
                () => {
                    MySwal.fire({
                        title: "Message sent successfully!",
                        icon: "success",
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
            resetName.current.value = ""
            resetEmail.current.value = ""
            resetSubject.current.value = ""
            resetMessage.current.value = ""
    };

    const rooms = [{
            id: 4,
            title: "Executive Suite",
            price: 10000,
            rating: 9.2,
            rate: "Wonderful",
            reviews: "115 reviews",
            
            pic1: p2,
            pic2: p8,
            pic3: p9,
            
            amenities: ["wifi", "spa", "dumbbell", "person-swimming", "gifts", "leaf", "mug-hot", "kitchen-set"],
    
            amenitiesName: ["Wifi included", "Spa", "Workout gear", "Pool", "Welcome gifts", "Outdoor space", "Coffee machine", "Kitchen"],
    
            amenitiesDescription: ["Stay connected with high-speed complimentary WiFi.", "Relax with access to a soothing spa and wellness area.", "Access modern fitness equipment for your daily workout.", "Take a refreshing dip in the outdoor or indoor swimming pool.", "Complimentary treats and drinks to greet your arrival.", "Unwind in a private balcony, patio, or garden area.", "Brew your favorite coffee anytime with the in-room machine.", "Fully equipped kitchen for cooking your own meals."],
    
            meals: "Lunch included",

            description: "Spacious room with city view, king-sized bed, and modern amenities."
        },
        {
            id: 5,
            title: "Premier Deluxe Room",
            price: 9500,
            rating: 8.7,
            rate: "Very Good",
            reviews: "1,124 reviews",
            
            pic1: p3,
            pic2: p7,
            pic3: p10,
            
            amenities: ["wifi", "snowflake", "computer", "dumbbell", "mattress-pillow", "kitchen-set", "paw", "dumbbell",],
    
            amenitiesName: ["Wifi included", "Air Conditioner", "Working space", "Workout gear", "Linen included", "Kitchen", "Pet friendly", "Workout gear"],
    
            amenitiesDescription: ["Stay connected with high-speed complimentary WiFi.", "Adjustable air conditioning for your comfort.", "Dedicated desk area perfect for work or study.", "Fresh, high-quality linens and towels provided daily.", "Fully equipped kitchen for cooking your own meals.", "Bring your furry friends — pets are warmly welcomed.", "Access modern fitness equipment for your daily workout."],
    
            meals: "Breakfast included",

            description: "Luxurious suite with separate living area and premium amenities."
        },
        {
            id: 6,
            title: "Grand Horizon Suite",
            price: 8199,
            rating: 7.5,
            rate: "Good",
            reviews: "989 reviews",
            
            pic1: p4,
            pic2: p5,
            pic3: p11,
            
            amenities: ["wifi", "snowflake", "gifts", "mug-hot", "paw", "tv", "suitcase-rolling", "computer"],
    
            amenitiesName: ["Wifi included", "Air Conditioner", "Welcome gifts", "Coffee machine", "Pet friendly", "Entertainment", "Luggage storage", "Working space"],
    
            amenitiesDescription: ["Stay connected with high-speed complimentary WiFi.", "Adjustable air conditioning for your comfort.", "Complimentary treats and drinks to greet your arrival.", "Brew your favorite coffee anytime with the in-room machine.", "Bring your furry friends — pets are warmly welcomed.", "Enjoy premium channels and streaming services on a smart TV.", "Store your bags securely before check-in or after checkout.", "Dedicated desk area perfect for work or study."],
    
            meals: "Lunch included",

            description: "Our most luxurious offering with panoramic views and exclusive services."
        }]

    return ( 
        <>
        <div className="home-body">
            {/* Hero Section */}
            <section id="hero" className="home-hero-section mt-0" style={{paddingTop: "80px",paddingBottom: "80px"}}>
                <div className="home-container">
                    <h1>Experience Unforgettable Luxury</h1>
                    <p>Luxury Haven Hotel offers exceptional accommodation that combines comfort, luxury, and premium service in the heart of the city.</p>
                    <Link to="/listing" className="home-btn">Discover our rooms</Link>
                </div>
            </section>

            {/* About Section */}
            <section id="about" style={{paddingTop: "80px",paddingBottom: "80px"}}>
                <div className="home-container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2 className="section-title">Welcome to Luxury Haven</h2>
                            <p>Our hotel is strategically located in the city center, offering breathtaking views and an atmosphere of luxury and comfort. We provide upscale hotel services that meet the expectations of the most discerning guests.</p>
                            <p>With link professional team and 24/7 customer service, we guarantee link comfortable and enjoyable stay. We pride ourselves on the high standards of cleanliness and quality we maintain in every detail.</p>
                            <ul className="about-list">
                                <li><i className="fas fa-check"></i> Premium location in city center</li>
                                <li><i className="fas fa-check"></i> 24/7 concierge service</li>
                                <li><i className="fas fa-check"></i> Award-winning restaurant</li>
                                <li><i className="fas fa-check"></i> Luxury spa and wellness center</li>
                            </ul>
                        </div>
                        <div className="about-image">
                            <img src={p1} alt="Hotel Lobby" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Rooms Section */}
            <section id="rooms" className="bg-white" style={{paddingTop: "80px",paddingBottom: "80px"}}>
                <div className="home-container">
                    <h2 className="section-title text-center">Our Popular Rooms & Suites</h2>
                    <p className="text-center" style={{ marginBottom: "50px"}} >Choose from our selection of beautifully appointed rooms and suites designed for your comfort.</p>

                    <div className="rooms-grid">
                        {rooms.map((room) => (
                            <div className="room-card">
                                <img src={room.pic1} alt="Deluxe Room" />
                                <div className="room-card-body">
                                    <h3>{room.title}</h3>
                                    <p>{room.description}</p>
                                    <div className="room-card-footer">
                                        <span className="room-price">{room.price} EGP/night</span>
                                        <button className="home-btn" onClick={() => navigate("/details", {state: {room}})}>Details</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {/* <div className="room-card">
                            <img src={p2} alt="Deluxe Room" />
                                <div className="room-card-body">
                                    <h3>Deluxe Room</h3>
                                    <p>Spacious room with city view, king-sized bed, and modern amenities.</p>
                                    <div className="room-card-footer">
                                        <span className="room-price">$199/night</span>
                                        <Link to="#" className="home-btn">Book Now</Link>
                                    </div>
                                </div>
                        </div>

                        <div className="room-card">
                            <img src={p3} alt="Executive Suite" />
                                <div className="room-card-body">
                                    <h3>Executive Suite</h3>
                                    <p>Luxurious suite with separate living area and premium amenities.</p>
                                    <div className="room-card-footer">
                                        <span className="room-price">$299/night</span>
                                        <Link to="#" className="home-btn">Book Now</Link>
                                    </div>
                                </div>
                        </div>

                        <div className="room-card">
                            <img src={p4} alt="Presidential Suite" />
                                <div className="room-card-body">
                                    <h3>Presidential Suite</h3>
                                    <p>Our most luxurious offering with panoramic views and exclusive services.</p>
                                    <div className="room-card-footer">
                                        <span className="room-price">$499/night</span>
                                        <Link to="#" className="home-btn">Book Now</Link>
                                    </div>
                                </div>
                        </div> */}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" style={{paddingTop: "80px",paddingBottom: "80px"}}>
                <div className="home-container">
                    <h2 className="section-title text-center">Our Services</h2>
                    <p className="text-center" style={{ marginBottom: "50px"}}>We offer Link wide range of premium services to make your stay exceptional.</p>

                    <div className="services-grid">
                        <div className="feature-box">
                            <div className="feature-icon">
                                <i className="fas fa-utensils"></i>
                            </div>
                            <h3>Fine Dining</h3>
                            <p>Experience culinary excellence at our award-winning restaurant with international cuisine.</p>
                        </div>

                        <div className="feature-box">
                            <div className="feature-icon">
                                <i className="fas fa-spa"></i>
                            </div>
                            <h3>Spa & Wellness</h3>
                            <p>Relax and rejuvenate at our luxury spa with Link range of treatments and therapies.</p>
                        </div>

                        <div className="feature-box">
                            <div className="feature-icon">
                                <i className="fas fa-swimming-pool"></i>
                            </div>
                            <h3>Pool & Fitness</h3>
                            <p>Stay active in our state-of-the-art fitness center or relax by our infinity pool.</p>
                        </div>

                        <div className="feature-box">
                            <div className="feature-icon">
                                <i className="fas fa-concierge-bell"></i>
                            </div>
                            <h3>24/7 Concierge</h3>
                            <p>Our dedicated concierge team is available around the clock to assist with your needs.</p>
                        </div>

                        <div className="feature-box">
                            <div className="feature-icon">
                                <i className="fas fa-wifi"></i>
                            </div>
                            <h3>High-Speed Internet</h3>
                            <p>Stay connected with our complimentary high-speed WiFi throughout the hotel.</p>
                        </div>

                        <div className="feature-box">
                            <div className="feature-icon">
                                <i className="fas fa-shuttle-van"></i>
                            </div>
                            <h3>Airport Transfer</h3>
                            <p>Enjoy complimentary airport transfers for Link seamless travel experience.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-white" style={{paddingTop: "80px",paddingBottom: "80px"}}>
                <div className="home-container">
                    <h2 className="section-title text-center">What Our Guests Say</h2>
                    <p className="text-center" style={{ marginBottom: "50px"}}>Read testimonials from our satisfied guests.</p>

                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="testimonial-text">
                                "The service was exceptional from check-in to check-out. The room was spacious and beautifully appointed. Will definitely return!"
                            </div>
                            <div className="testimonial-author">- Sarah Johnson</div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-text">
                                "The attention to detail at Luxury Haven is remarkable. The staff went above and beyond to make our anniversary special."
                            </div>
                            <div className="testimonial-author">- Michael Chen</div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-text">
                                "Best hotel experience I've had in years. The spa treatments were incredible and the dining options were exceptional."
                            </div>
                            <div className="testimonial-author">- Emma Rodriguez</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" style={{paddingTop: "80px",paddingBottom: "80px"}}>
                <div className="home-container">
                    <h2 className="section-title text-center">Contact Us</h2>
                    <p className="text-center" style={{ marginBottom: "50px"}}>Get in touch with us for reservations or inquiries.</p>

                    <div className="contact-content">
                        <div className="contact-form">
                            <form ref={form} onSubmit={sendEmail}>
                                <div className="home-form-row">
                                    <div className="home-form-group">
                                        <input type="text" className="home-form-control" placeholder="Your Name" name="user_name" required ref={resetName}/>
                                    </div>
                                    <div className="home-form-group">
                                        <input type="email" className="home-form-control" placeholder="Your Email" name="user_email" required ref={resetEmail}/>
                                    </div>
                                </div>
                                <div className="home-form-group">
                                    <input type="text" className="home-form-control" placeholder="Subject" name="subject" ref={resetSubject}/>
                                </div>
                                <div className="home-form-group">
                                    <textarea className="home-form-control" placeholder="Your Message" name="message" required ref={resetMessage}></textarea>
                                </div>
                                <button type="submit" className="home-btn">Send Message</button>
                            </form>
                        </div>

                        <div className="contact-info">
                            <h3 style={{ marginBottom: "20px"}}>Contact Information</h3>
                            <p><i className="fas fa-map-marker-alt contact-icon"></i> 123 Luxury Avenue, City Center</p>
                            <p><i className="fas fa-phone contact-icon"></i> +1 (555) 123-4567</p>
                            <p><i className="fas fa-envelope contact-icon"></i> info@BookHere.com</p>

                            <h4 style={{ marginTop: "30px", marginBottom: "15px"}}>Opening Hours</h4>
                            <p>Reception: 24/7</p>
                            <p>Restaurant: 7:00 AM - 11:00 PM</p>
                            <p>Spa: 9:00 AM - 9:00 PM</p>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </>
     );
}

export default Home;