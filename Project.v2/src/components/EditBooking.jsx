import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function EditBookingModal({ show, onHide, booking, refresh }) {
  const [formData, setFormData] = useState({
    userName: "",
    roomNumber: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    totalPrice: "",
    status: "",
  });

  useEffect(() => {
    if (booking) {
      setFormData(booking);
    }
  }, [booking]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/v1/bookings/${room._id}`, formData);
      toast.success("Booking Updated Successfully");
      refresh();
      onHide();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message||"Failed to update booking");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Booking</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Room Number</Form.Label>
            <Form.Control
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Check In</Form.Label>
            <Form.Control
              type="date"
              name="checkIn"
              value={formData.checkIn.slice(0, 10)}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Check Out</Form.Label>
            <Form.Control
              type="date"
              name="checkOut"
              value={formData.checkOut.slice(0, 10)}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Guests</Form.Label>
            <Form.Control
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Total Price</Form.Label>
            <Form.Control
              type="number"
              name="totalPrice"
              value={formData.totalPrice}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange}>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Checked In</option>
              <option>Checked Out</option>
              <option>Cancelled</option>
            </Form.Select>
          </Form.Group>

          <div className="text-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditBookingModal;