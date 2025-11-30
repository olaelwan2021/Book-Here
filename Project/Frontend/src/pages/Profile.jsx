import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Badge, Modal, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { 
  BsPersonFill,
  BsEnvelopeFill,
  BsCalendarFill,
  BsPeopleFill,
  BsCurrencyDollar,
  BsPencilFill,
  BsEyeFill,
  BsStarFill,
  BsBuilding,
  BsGeoAltFill,
  BsTelephoneFill,
  BsCameraFill,
  BsThreeDots
} from "react-icons/bs";

 
import cover from "../assets/pexels-catiamatos-1072179.jpg";  
import api from "../services/api";
import "./Profile.css";
import EditProfileModal from "./EditProfile";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("bookings");
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) return navigate("/registration");

        const userRes = await api.auth.profile();
        const userData = userRes.data;
        setUser(userData);

        const bookingsRes = await api.bookings.getUserBookings(userData._id);
        setBookings(bookingsRes.data.data || []);

      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const getBookingStatus = (checkIn, checkOut) => {
    const now = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (now < checkInDate) return { variant: "warning", text: "Upcoming" };
    if (now >= checkInDate && now <= checkOutDate) return { variant: "success", text: "Active" };
    return { variant: "secondary", text: "Completed" };
  };

  const getStats = () => {
    const totalBookings = bookings.length;
    const activeStays = bookings.filter(b => getBookingStatus(b.checkIn, b.checkOut).text === "Active").length;
    const completedStays = bookings.filter(b => getBookingStatus(b.checkIn, b.checkOut).text === "Completed").length;
    const totalSpent = bookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);

    return { totalBookings, activeStays, completedStays, totalSpent };
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading your profile...</p>
      </div>
    );

  if (!user)
    return (
      <div className="text-center mt-5">
        <BsBuilding size={50} />
        <h3>No user data found</h3>
        <p>Please log in to view your profile</p>
        <Button variant="primary" onClick={() => navigate("/registration")}>
          Go to Login
        </Button>
      </div>
    );

  const stats = getStats();

  return (
    <div className="profile-page facebook-style" style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
    
      <div className="cover-section position-relative">
        <img 
          src={cover} 
          alt="Cover" 
          className="cover-photo w-100"
          style={{ height: "350px", objectFit: "cover" }}
        />
        <div className="profile-photo-container position-absolute">
          <div className="profile-photo-wrapper">
            <img 
              src={`http://localhost:5000/uploads/${user.avatar || "default-profile.png"}`} 
              alt={user.name} 
              className="profile-photo rounded-circle border-4 border-white"
            />
            <Button 
              variant="light" 
              size="sm" 
              className="camera-btn position-absolute"
            >
              <BsCameraFill />
            </Button>
          </div>
        </div>
      </div>

      <Container className="py-4">
    
        <Card className="profile-header-card shadow-sm mb-4">
          <Card.Body className="pt-5">
            <Row className="align-items-end">
              <Col md={8}>
                <h2 className="mb-1">{user.name}</h2>
                <p className="text-muted mb-2">
                  <BsEnvelopeFill className="me-2" />
                  {user.email}
                </p>
                {user.phone && (
                  <p className="text-muted mb-2">
                    <BsTelephoneFill className="me-2" />
                    {user.phone}
                  </p>
                )}
                {user.address && (
                  <p className="text-muted mb-3">
                    <BsGeoAltFill className="me-2" />
                    {user.address}
                  </p>
                )}
                <div className="d-flex gap-2">

<Button className="btn-main-color border-0"  onClick={() => setShowEditModal(true)}>
  <BsPencilFill className="me-2" /> Edit Profile
</Button>
                  <Button variant="outline-secondary">
                    <BsThreeDots />
                  </Button>
                </div>
              </Col>
              <Col md={4}>
                <div className="stats-grid text-end">
                  <div className="stat-item">
                    <h4 className="mb-0 ">{stats.totalBookings}</h4>
                    <small className="text-muted">Bookings</small>
                  </div>
                  <div className="stat-item">
                    <h4 className="mb-0">{stats.activeStays}</h4>
                    <small className="text-muted">Active</small>
                  </div>
                  <div className="stat-item">
                    <h4 className="mb-0">{stats.completedStays}</h4>
                    <small className="text-muted">Completed</small>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

     
        <Row>
          <Col lg={12}>
            <Card className="shadow-sm">
              <Card.Body>
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-3 profile-tabs"
                >
                  <Tab eventKey="bookings" title={
                    <span>
                      <BsCalendarFill className="me-2" />
                      My Bookings
                    </span>
                  }>
                    {bookings.length === 0 ? (
                      <div className="text-center py-5">
                        <BsCalendarFill size={50} className="text-muted mb-3" />
                        <h5>No bookings yet</h5>
                        <p className="text-muted mb-4">Start planning your next stay</p>
                        <Button variant="primary" onClick={() => navigate("/listing")}>
                          Browse Available Rooms
                        </Button>
                      </div>
                    ) : (
                      <Row xs={1} md={2} lg={3} className="g-3 mt-2">
                        {bookings.map((booking) => {
                          const status = getBookingStatus(booking.checkIn, booking.checkOut);
                          return (
                            <Col key={booking._id}>
                              <Card 
                                className="h-100 shadow-sm booking-card" 
                                onClick={() => handleBookingClick(booking)}
                              >
                                <div className="position-relative">
                                  <img
                                    src={`http://localhost:5000/uploads/${booking.roomId?.images?.[0] || "default-room.jpg"}`}
                                    alt={booking.roomId?.name}
                                    className="card-img-top"
                                    style={{ height: "180px", objectFit: "cover" }}
                                  />
                                  <Badge 
                                    bg={status.variant} 
                                    className="position-absolute top-0 start-0 m-2"
                                  >
                                    {status.text}
                                  </Badge>
                                </div>
                                <Card.Body>
                                  <Card.Title className="h6">
                                    <BsBuilding className="me-2" />
                                    {booking.roomId?.name}
                                  </Card.Title>
                                  <div className="booking-details">
                                    <small className="text-muted d-block mb-1">
                                      <BsCalendarFill className="me-2" />
                                      {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                                    </small>
                                    <small className="text-muted d-block mb-1">
                                      <BsPeopleFill className="me-2" />
                                      {booking.guests} Guests
                                    </small>
                                    <small className="text-muted d-block mb-2">
                                      <BsCurrencyDollar className="me-2" />
                                      {booking.totalPrice} EGP
                                    </small>
                                  </div>
                                  <div className="d-flex gap-2">
                                    <Button
                                      className="profile-booking-card-btn"
                                      // variant="outline-primary"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/details?id=${booking.roomId?._id}`);
                                      }}
                                    >
                                      <BsEyeFill className="me-1" />
                                      View Room
                                    </Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                    )}
                  </Tab>

                  <Tab eventKey="stats" title={
                    <span>
                      <BsStarFill className="me-2" />
                      Statistics
                    </span>
                  }>
                    <Row className="g-3 mt-3">
                      <Col md={3} sm={6}>
                        <Card className="stat-card text-center">
                          <Card.Body>
                            <BsCalendarFill size={30} className="text-primary mb-2" />
                            <h3>{stats.totalBookings}</h3>
                            <p className="text-muted mb-0">Total Bookings</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={3} sm={6}>
                        <Card className="stat-card text-center">
                          <Card.Body>
                            <BsPersonFill size={30} className="text-success mb-2" />
                            <h3>{stats.activeStays}</h3>
                            <p className="text-muted mb-0">Active Stays</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={3} sm={6}>
                        <Card className="stat-card text-center">
                          <Card.Body>
                            <BsStarFill size={30} className="text-warning mb-2" />
                            <h3>{stats.completedStays}</h3>
                            <p className="text-muted mb-0">Completed</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={3} sm={6}>
                        <Card className="stat-card text-center">
                          <Card.Body>
                            <BsCurrencyDollar size={30} className="text-info mb-2" />
                            <h3>{stats.totalSpent} EGP</h3>
                            <p className="text-muted mb-0">Total Spent</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <Row>
              <Col md={6}>
                <img
                  src={`http://localhost:5000/uploads/${selectedBooking.roomId?.images?.[0] || "default-room.jpg"}`}
                  alt={selectedBooking.roomId?.name}
                  className="w-100 rounded mb-3"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </Col>
              <Col md={6}>
                <h5>{selectedBooking.roomId?.name}</h5>
                <div className="booking-info">
                  <p><BsCalendarFill className="me-2" /> 
                    <strong>Check-in:</strong> {new Date(selectedBooking.checkIn).toLocaleDateString()}
                  </p>
                  <p><BsCalendarFill className="me-2" /> 
                    <strong>Check-out:</strong> {new Date(selectedBooking.checkOut).toLocaleDateString()}
                  </p>
                  <p><BsPeopleFill className="me-2" /> 
                    <strong>Guests:</strong> {selectedBooking.guests}
                  </p>
                  <p><BsCurrencyDollar className="me-2" /> 
                    <strong>Total Price:</strong> {selectedBooking.totalPrice} EGP
                  </p>
                  <Badge bg={getBookingStatus(selectedBooking.checkIn, selectedBooking.checkOut).variant}>
                    {getBookingStatus(selectedBooking.checkIn, selectedBooking.checkOut).text}
                  </Badge>
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button className="profile-booking-modal-btn" onClick={() => {
            setShowModal(false);
            navigate(`/details?id=${selectedBooking?.roomId?._id}`);
          }}>
            View Room Details
          </Button>
        </Modal.Footer>
      </Modal>
      <EditProfileModal
  show={showEditModal}
  onHide={() => setShowEditModal(false)}
  user={user}
  onUpdate={(updatedUser) => setUser(updatedUser)}
/>
    </div>
  );
}

export default Profile;