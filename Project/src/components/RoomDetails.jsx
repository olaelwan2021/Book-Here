import React, { useState } from 'react';
import '../RoomDetails.css';

import { useLocation, useNavigate } from 'react-router-dom';

const RoomDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('2 Adults');
  const [activeTab, setActiveTab] = useState('overview');

  // const roomImages = [
  //   'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
  //   'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
  //   'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop',
  //   'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
  //   'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
  //   'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop',
  //   'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
  //   'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
  //   'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800&h=600&fit=crop',
  //   'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
  //   'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop',
  //   'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800&h=600&fit=crop'
  // ];

  const sectionImages = {
    overview: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&h=400&fit=crop',
    amenities: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
    services: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop'
  };

  // const amenities = [
  //   { icon: '🏙️', name: 'City View', description: 'Breathtaking panoramic city views' },
  //   { icon: '🛏️', name: 'King Bed', description: 'Premium king size luxury bed' },
  //   { icon: '🧖', name: 'Spa Bathroom', description: 'Marble bathroom with rain shower' },
  //   { icon: '📶', name: 'High-Speed WiFi', description: 'Free unlimited fiber internet' },
  //   { icon: '☕', name: 'Coffee Machine', description: 'Nespresso premium coffee' },
  //   { icon: '🍽️', name: 'Room Service', description: '24/7 gourmet dining service' },
  //   { icon: '🏊', name: 'Infinity Pool', description: 'Heated infinity pool access' },
  //   { icon: '💼', name: 'Business Center', description: 'Full business facilities' }
  // ];

  const roomFeatures = [
    { icon: '📺', text: '65" 4K Smart TV' },
    { icon: '❄️', text: 'Smart Climate Control' },
    { icon: '🔇', text: 'Soundproof Walls' },
    // { icon: '🍷', text: 'Premium Mini Bar' },
    // { icon: '💼', text: 'Executive Work Desk' },
    { icon: '🛡️', text: 'Digital Safe' },
    { icon: '🌅', text: 'Private Balcony' },
    { icon: '🧴', text: 'Luxury Toiletries' }
  ];

  const services = [
    {
      category: 'Luxury Services',
      items: ['24/7 Concierge', 'Butler Service', 'Luxury Car Rental', 'Personal Shopper', 'VIP Airport Transfer']
    },
    {
      category: 'Wellness & Spa',
      items: ['Infinity Pool', 'Luxury Spa', 'Fitness Center', 'Yoga Studio', 'Sauna & Steam Room']
    },
    {
      category: 'Dining',
      items: ['Fine Dining Restaurant', 'Rooftop Bar', '24/7 Room Service', 'Wine Cellar', 'Private Chef']
    },
    {
      category: 'Business',
      items: ['Executive Lounge', 'Meeting Rooms', 'Business Center', 'Video Conferencing', 'Printing Services']
    }
  ];

  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate) return 899;
    const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
    return nights > 0 ? 299 * nights + 49 + 99 : 899;
  };

  const totalPrice = calculateTotal();

  const navigate = useNavigate()

  const location = useLocation()
  const {room} = location.state

  const roomImages = [
    room.pic1,
    room.pic2,
    room.pic3
  ]

  const amenities = [
    {icon: room.amenities[0], name: room.amenitiesName[0], description: room.amenitiesDescription[0]},
    {icon: room.amenities[1], name: room.amenitiesName[1], description: room.amenitiesDescription[1]},
    {icon: room.amenities[2], name: room.amenitiesName[2], description: room.amenitiesDescription[2]},
    {icon: room.amenities[3], name: room.amenitiesName[3], description: room.amenitiesDescription[3]},
    {icon: room.amenities[4], name: room.amenitiesName[4], description: room.amenitiesDescription[4]},
    {icon: room.amenities[5], name: room.amenitiesName[5], description: room.amenitiesDescription[5]},
    {icon: room.amenities[6], name: room.amenitiesName[6], description: room.amenitiesDescription[6]},
    {icon: room.amenities[7], name: room.amenitiesName[7], description: room.amenitiesDescription[7]}
  ]

  return (
    <div className="modern-hotel">
      {/* Modern Header */}
      <header className="modern-header">
        <div className="header-container">
          {/* <nav className="modern-breadcrumb">
            <a href="#" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-divider">/</span>
            <a href="#" className="breadcrumb-link">Hotels</a>
            <span className="breadcrumb-divider">/</span>
            <a href="#" className="breadcrumb-link">Dubai</a>
            <span className="breadcrumb-divider">/</span>
            <span className="breadcrumb-current">{room.title}</span>
          </nav> */}
          
          <div className="header-content mt-5">
            <div className="hotel-info">
              <h1 className="hotel-title">
                {room.title}
                <span className="hotel-subtitle">Luxury Beachfront Experience</span>
              </h1>
              <div className="rating-display">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
                <span className="rating-text">{room.rating} ({room.reviews})</span>
              </div>
            </div>
            
            <div className="price-display">
              <div className="price-from">Starting from</div>
              <div className="price-amount">{room.price} EGP</div>
              <div className="price-period">per night</div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Gallery */}
      <section className="hero-section">
        <div className="gallery-container">
          <div className="main-gallery">
            <img src={roomImages[selectedImage]} alt="Luxury Suite" />
            <div className="gallery-controls">
              <button 
                className="nav-btn prev" 
                onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : roomImages.length - 1)}
              >
                ‹
              </button>
              <div className="image-counter">
                {selectedImage + 1} / {roomImages.length}
              </div>
              <button 
                className="nav-btn next" 
                onClick={() => setSelectedImage(prev => prev < roomImages.length - 1 ? prev + 1 : 0)}
              >
                ›
              </button>
            </div>
          </div>
          
          <div className="thumbnail-strip">
            {roomImages.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`View ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-layout">
          {/* Left Content - Full Width */}
          <div className="content-full">
            {/* Navigation Tabs */}
            <nav className="content-tabs">
              <button 
                className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`tab ${activeTab === 'amenities' ? 'active' : ''}`}
                onClick={() => setActiveTab('amenities')}
              >
                Amenities
              </button>
              <button 
                className={`tab ${activeTab === 'services' ? 'active' : ''}`}
                onClick={() => setActiveTab('services')}
              >
                Services
              </button>
            </nav>

            {/* Tab Content */}
            <div className="tab-content">
              {/* Overview Section */}
              {activeTab === 'overview' && (
                <div className="content-section">
                  <div className="section-with-image">
                    <div className="section-content">
                      <h2>{room.title}</h2>
                      <p>
                        Experience unparalleled luxury in our signature Ocean View Suite. 
                        Featuring floor-to-ceiling windows with breathtaking ocean views, 
                        contemporary design, and premium amenities for the ultimate comfort.
                      </p>
                      
                      <div className="features-grid">
                        {roomFeatures.map((feature, index) => (
                          <div key={index} className="feature-item">
                            <span className="feature-icon">{feature.icon}</span>
                            <span>{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="section-image">
                      <img src={sectionImages.overview} alt="Suite Overview" />
                    </div>
                  </div>
                </div>
              )}

              {/* Amenities Section */}
              {activeTab === 'amenities' && (
                <div className="content-section">
                  <div className="section-with-image">
                    <div className="section-content">
                      <h2>Premium Amenities</h2>
                      <p>
                        Every detail is carefully curated to provide you with an exceptional stay. 
                        From smart room controls to luxury bathroom amenities.
                      </p>
                      
                      <div className="amenities-grid">
                        {amenities.map((amenity, index) => (
                          <div key={index} className="amenity-item">
                            <div className="amenity-icon"><i className={`fa-solid fa-${amenity.icon}`}></i></div>
                            <div className="amenity-info">
                              <h3>{amenity.name}</h3>
                              <p>{amenity.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="section-image">
                      <img src={sectionImages.amenities} alt="Room Amenities" />
                    </div>
                  </div>
                </div>
              )}

              {/* Services Section */}
              {activeTab === 'services' && (
                <div className="content-section">
                  <div className="section-with-image">
                    <div className="section-content">
                      <h2>Exclusive Services</h2>
                      <p>
                        Our dedicated team is committed to providing exceptional service 
                        and creating memorable experiences during your stay.
                      </p>
                      
                      <div className="services-grid">
                        {services.map((service, index) => (
                          <div key={index} className="service-category">
                            <h3>{service.category}</h3>
                            <ul>
                              {service.items.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="section-image">
                      <img src={sectionImages.services} alt="Hotel Services" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Form - Minimal Design */}
        <div className="booking-form-minimal">
          <div className="form-border-wrapper">
            <div className="form-container-minimal">
              <div className="form-header-minimal">
                <h3>Reserve Your Stay</h3>
                <div className="price-display-minimal">
                  <span className="current-price-minimal">{room.price} EGP</span>
                  <span className="discount-minimal">25% OFF</span>
                </div>
              </div>

              <div className="minimal-form-grid">
                <div className="form-group-minimal">
                  <div className="input-line-wrapper">
                    <span className="input-icon-minimal">📅</span>
                    <input 
                      type="date" 
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="line-input"
                    />
                    <div className="input-line"></div>
                  </div>
                </div>
                
                <div className="form-group-minimal">
                  <div className="input-line-wrapper">
                    <span className="input-icon-minimal">🚪</span>
                    <input 
                      type="date" 
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="line-input"
                    />
                    <div className="input-line"></div>
                  </div>
                </div>
                
                <div className="form-group-minimal">
                  <div className="input-line-wrapper">
                    <span className="input-icon-minimal">👥</span>
                    <select 
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="line-input"
                    >
                      <option className='text-bcolor'>2 Adults</option>
                      <option className='text-bcolor'>1 Adult</option>
                      <option className='text-bcolor'>2 Adults, 1 Child</option>
                      <option className='text-bcolor'>2 Adults, 2 Children</option>
                    </select>
                    <div className="input-line"></div>
                  </div>
                </div>

                
                <div className="form-group-minimal">
                  <button className="modern-book-button" onClick={() => navigate("/payment", {state: {room, checkInDate, checkOutDate, guests}})}>
                    <span className="button-content">
                      <span className="button-text">Book Now</span>
                      <span className="button-arrow">→</span>
                    </span>
                    <div className="button-shine"></div>
                  </button>
                </div>
              </div>

              <div className="form-footer-minimal">
                <div className="guarantees-minimal">
                  <span className="guarantee-text">🛡️ Free cancellation • Best price guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Offers */}
        <div className="offers-section">
          <div className="offers-container">
            <h2>Special Offers</h2>
            <div className="offers-grid">
              <div className="offer-card-large">
                <div className="offer-badge">Most Popular</div>
                <h3>Stay 4+ Nights</h3>
                <p>Get complimentary airport transfer + spa treatment for all stays of 4 nights or more</p>
                <div className="offer-features">
                  <span>✓ Free airport transfer</span>
                  <span>✓ Spa treatment</span>
                  <span>✓ Late checkout</span>
                </div>
              </div>
              
              <div className="offer-card-large">
                <div className="offer-badge">Honeymoon</div>
                <h3>Romantic Package</h3>
                <p>Perfect for couples with champagne, rose petals, and private dinner included</p>
                <div className="offer-features">
                  <span>✓ Champagne on arrival</span>
                  <span>✓ Romantic dinner</span>
                  <span>✓ Room decoration</span>
                </div>
              </div>
              
              <div className="offer-card-large">
                <div className="offer-badge">Early Bird</div>
                <h3>Early Bird Discount</h3>
                <p>Book 30 days in advance and save 15% on your entire stay</p>
                <div className="offer-features">
                  <span>✓ 15% discount</span>
                  <span>✓ Free breakfast</span>
                  <span>✓ Room upgrade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;