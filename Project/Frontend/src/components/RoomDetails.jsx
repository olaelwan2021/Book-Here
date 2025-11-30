import React, { useEffect, useState } from 'react';
import '../RoomDetails.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const RoomDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [activeTab, setActiveTab] = useState('overview');
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roomId = searchParams.get("id");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        console.log("Fetching room with id:", roomId);
        const response = await api.rooms.getById(roomId);
        console.log("API response:", response);
        setRoom(response.data);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [searchParams]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.reviews.getByRoomId(roomId)
        console.log("Fetched reviews:", res.data);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
  }, [roomId, showRatingModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!roomId) return;
      if(!checkInDate || !checkOutDate) {
        toast.error("Please select check-in and check-out dates.");
        return;
      }


      navigate(`/payment?guests=${guests}&checkIn=${checkInDate}&checkOut=${checkOutDate}`, { state: { room } });
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking.");
    }
  };

  const handleRatingSubmit = async () => {
    try {
      await api.reviews.create({
        userId: JSON.parse(localStorage.getItem("user"))._id,
        roomId,
        rating,
        comment,
      });

      toast.success("Thank you for your rating!");
      setShowRatingModal(false);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating. Please try again.");
    }

  };

  if (!room) return <div>Loading...</div>;

  const roomImages = room.images || [];
  const amenities = room.amenities?.map(a => ({
    icon: a,
    name: a.charAt(0).toUpperCase() + a.slice(1),
    description: ''
  })) || [];

  const roomFeatures = [
    { icon: '📺', text: '65" 4K Smart TV' },
    { icon: '❄️', text: 'Smart Climate Control' },
    { icon: '🔇', text: 'Soundproof Walls' },
    { icon: '🛡️', text: 'Digital Safe' },
    { icon: '🌅', text: 'Private Balcony' },
    { icon: '🧴', text: 'Luxury Toiletries' }
  ];

  const services = [
    { category: 'Luxury Services', items: ['24/7 Concierge', 'Butler Service', 'Luxury Car Rental', 'Personal Shopper', 'VIP Airport Transfer'] },
    { category: 'Wellness & Spa', items: ['Infinity Pool', 'Luxury Spa', 'Fitness Center', 'Yoga Studio', 'Sauna & Steam Room'] },
    { category: 'Dining', items: ['Fine Dining Restaurant', 'Rooftop Bar', '24/7 Room Service', 'Wine Cellar', 'Private Chef'] },
    { category: 'Business', items: ['Executive Lounge', 'Meeting Rooms', 'Business Center', 'Video Conferencing', 'Printing Services'] }
  ];

  const sectionImages = {
    overview: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&h=400&fit=crop',
    amenities: 'https://images.unsplash.com/photo-1694999175409-316907623edc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    services: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop'
  };

  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate) return room.price;
    const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
    return nights > 0 ? room.price * nights : room.price;
  };

  const totalPrice = calculateTotal();

  return (
    <div className="modern-hotel">
      {/* Rating Modal */}
      {showRatingModal && (
        <div className="modal-overlay">
          <div className="rating-modal p-4">
            <div className="modal-header">
              <h2>Rate Your Experience</h2>
              <button
                className="close-btn"
                onClick={() => setShowRatingModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="rating-section">
                <label htmlFor="rating" className="rating-label">
                  How would you rate your stay?
                </label>
                <div className="rating-input-group">
                  <input
                    type="range"
                    id="rating"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="rating-slider"
                  />
                  <div className="rating-display">
                    <span className="rating-value">{rating}</span>
                    <span className="rating-scale">/5</span>
                  </div>
                </div>
                <div className="rating-labels">
                  <span>Poor</span>
                  <span>Exceptional</span>
                </div>
              </div>

              <div className="comment-section">
                <label htmlFor="comment" className="comment-label">
                  Share your experience (optional)
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you loved about your stay, or how we can improve..."
                  className="comment-textarea"
                  rows="4"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setShowRatingModal(false)}
              >
                Cancel
              </button>
              <button
                className="rating-btn-primary"
                onClick={handleRatingSubmit}
                disabled={!rating}
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="modern-header">
        <div className="header-container">
          <div className="header-content mt-5">
            <div className="hotel-info">
              <h1 className="hotel-title">
                {room.name}
                <span className="hotel-subtitle">{room.description}</span>
              </h1>
              <div className="rating-display">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <span className="rating-text">
                  {room.rating} {room.rate}
                  <button
                    className="rating-icon-btn text-color"
                    onClick={() => setShowRatingModal(true)}
                    title="Rate this room"
                  >
                    {/* 💬 */} <i class="fa-regular fa-comment-dots"></i>
                  </button>
                </span>
              </div>
            </div>
            <div className="price-display">
              <div className="price-from">Starting from</div>
              <div className="price-amount">{room.price} {room.currency}</div>
              <div className="price-period">per night</div>
            </div>
          </div>
        </div>
      </header>

      {/* Rest of your existing JSX remains the same */}
      {/* Hero Gallery */}
      <section className="hero-section mt-3">
        <div className="gallery-container">
          <div className="main-gallery">
            <img src={"http://localhost:5000/uploads/" + roomImages[selectedImage]} alt="Room" />
            <div className="gallery-controls">
              <button className="nav-btn prev" onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : roomImages.length - 1)}>‹</button>
              <div className="image-counter">{selectedImage + 1} / {roomImages.length}</div>
              <button className="nav-btn next" onClick={() => setSelectedImage(prev => prev < roomImages.length - 1 ? prev + 1 : 0)}>›</button>
            </div>
          </div>
          <div className="thumbnail-strip">
            {roomImages.map((img, index) => (
              <div key={index} className={`thumbnail ${selectedImage === index ? 'active' : ''}`} onClick={() => setSelectedImage(index)}>
                <img src={"http://localhost:5000/uploads/" + img} alt={`View ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="main-content">
        <div className="content-layout">
          <div className="content-full">
            <nav className="content-tabs">
              <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
              <button className={`tab ${activeTab === 'amenities' ? 'active' : ''}`} onClick={() => setActiveTab('amenities')}>Amenities</button>
              <button className={`tab ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>Services</button>
            </nav>

            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="content-section">
                  <div className="section-with-image">
                    <div className="section-content">
                      <h2>{room.name}</h2>
                      <p>{room.description}</p>
                      <div className="features-grid">
                        {roomFeatures.map((feature, index) => (
                          <div key={index} className="feature-item">
                            <span className="feature-icon">{feature.icon}</span>
                            <span>{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="section-image"><img src={sectionImages.overview} alt="Overview" /></div>
                  </div>
                </div>
              )}

              {activeTab === 'amenities' && (
                <div className="content-section">
                  <div className="section-with-image">
                    <div className="section-content">
                      <h2>Premium Amenities</h2>
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
                    <div className="section-image"><img src={sectionImages.amenities} alt="Amenities" /></div>
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="content-section">
                  <div className="section-with-image">
                    <div className="section-content">
                      <h2>Exclusive Services</h2>
                      <div className="services-grid">
                        {services.map((service, index) => (
                          <div key={index} className="service-category">
                            <h3>{service.category}</h3>
                            <ul>{service.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="section-image"><img src={sectionImages.services} alt="Services" /></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Form - Minimal Version */}
        <div className="booking-form-minimal">
          <div className="form-border-wrapper">
            <div className="form-container-minimal">
              {/* Header */}
              <div className="form-header-minimal">
                <h3>Reserve Your Stay</h3>
                <div className="price-display-minimal">
                  <span className="current-price-minimal">{totalPrice} {room.currency}</span>
                  <span className="discount-minimal">Best Price</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
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
                        <option value={2}>2 Adults</option>
                        <option value={1}>1 Adult</option>
                        <option value={3}>2 Adults, 1 Child</option>
                        <option value={4}>2 Adults, 2 Children</option>
                      </select>
                      <div className="input-line"></div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="form-group-minimal">
                    <button type="submit" className="modern-book-button">
                      <span className="button-content">
                        <span className="button-text">Book Now</span>
                        <span className="button-arrow">→</span>
                      </span>
                      <div className="button-shine"></div>
                    </button>
                  </div>
                </div>
              </form>

              {/* Footer */}
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
        <div className="container mt-4">
          {reviews.map((review) => (
            <div key={review._id} className="card mb-3 review-card shadow-sm">

              <div className="card-body">


                <div className="d-flex justify-content-between align-items-center">


                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={
                        review?.userId?.avatar
                          ? `http://localhost:5000/uploads/${review.userId.avatar}`
                          : "/default-avatar.png"
                      }
                      alt="avatar"
                      className="rounded-circle review-avatar"
                    />

                    <div>
                      <h6 className="mb-0 fw-bold">{review?.userId?.name}</h6>
                      <small className="text-muted">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>


                  <div className="text-warning fs-5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>


                <p className="mt-3 mb-0 review-text">{review.comment}</p>

              </div>
            </div>
          ))}
        </div>



      </div>
    </div>
  );
};

export default RoomDetails;