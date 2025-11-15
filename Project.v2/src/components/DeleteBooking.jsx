import { Button, Modal } from "react-bootstrap";

function DeleteBookingModal({ show, onHide,bookingId,refresh }) {
     const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/bookings/${bookingId}`);
      toast.success("Booking Deleted Successfully");
      refresh();
      onHide();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message||"Failed to delete Booking");
    }
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h5>Are you sure?</h5>
        <p className="text-muted">This action cannot be undone.</p>

        <div className="d-flex justify-content-center">
          <Button variant="secondary" className="me-3" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteBookingModal;