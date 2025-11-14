import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import EditBookingModal from "./EditBooking";
import DeleteBookingModal from "./DeleteBooking";


function BookingsTable() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingIdDel, setBookingIdDel] = useState(null);


  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/bookings")
      setBookings(res.data.data || []);
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filtered = bookings.filter((b) =>
    b.roomNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.userName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

    const handleDeleteClick = (user) => {
    setBookingIdDel(user._id);
    setDeleteModalShow(true);
  };

  return (
    <div className="container mt-3" id="bookings">
      <div className="rounded-3 p-4 mx-auto shadow-sm"
        style={{ backgroundColor: "#fff", color: "#333", overflowX: "auto" }}>

       <div className="d-flex justify-content-between align-items-center mb-3">
         <h4 className="fw-bold">Bookings Management</h4>

        <input
          type="text"
          className="form-control my-3 w-50"
          placeholder="Search by room number or name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
       </div>

        <Table bordered hover>
          <thead>
            <tr>
              <th>User</th>
              <th>Room</th>
              <th>CheckIn</th>
              <th>CheckOut</th>
              <th>Guests</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.userName}</td>
                <td>{booking.roomNumber}</td>
                <td>{booking.checkIn.slice(0, 10)}</td>
                <td>{booking.checkOut.slice(0, 10)}</td>
                <td>{booking.guests}</td>
                <td>{booking.totalPrice}</td>
                <td>{booking.status}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setSelectedBooking(booking);
                      setEditModalShow(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClick(user)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>


        <EditBookingModal
          show={editModalShow}
          onHide={() => setEditModalShow(false)}
          booking={selectedBooking}
          refresh={fetchBookings}
        />

        <DeleteBookingModal
          show={deleteModalShow}
          onHide={() => setDeleteModalShow(false)}
          bookingId={bookingIdDel}
          refresh={fetchBookings}
        />
      </div>
    </div>
  );
}

export default BookingsTable;
