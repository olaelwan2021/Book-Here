import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function DeleteRoomModal({ show, onHide, roomId, refresh }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/rooms/${roomId}`);
      toast.success("Room Deleted Successfully");
      refresh();
      onHide();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message||"Failed to delete room");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Room</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h5>Are you sure you want to delete this Room?</h5>
        <p className="text-muted">This action cannot be undone.</p>
        <div className="d-flex justify-content-center mt-4">
          <Button variant="secondary" onClick={onHide} className="me-3 px-4">
            Cancel
          </Button>
          <Button variant="danger" className="px-4" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteRoomModal;