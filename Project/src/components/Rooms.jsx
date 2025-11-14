import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import AddRoomModal from "./AddRoom";
import EditRoomModal from "./EditRoom";
import DeleteRoomModal from "./DeleteRoom";


function RoomsTable() {
  const [rooms, setRooms] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/rooms");
      setRooms(res.data.data || []);
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="container mt-3" id="rooms">
      <div
        className="rounded-3 p-4 mx-auto"
        style={{ backgroundColor: "#fff", color: "#333", overflowX: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">Rooms Management</h4>
          <Button variant="primary" onClick={() => setAddModalShow(true)} size="sm">
            <span className="fw-bold fs-5 me-1">+</span> Add New Room
          </Button>
        </div>

        <Table striped bordered hover responsive className="mt-2 align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Capacity</th>
              <th>Price</th>
              <th>Currency</th>
              <th>Status</th>
              <th>Amenities</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.name}</td>
                <td>{room.description}</td>
                <td>{room.capacity}</td>
                <td>{room.price}</td>
                <td>{room.currency}</td>
                <td>{room.available ? "Available" : "Booked"}</td>
                <td>{room.amenities.join(", ")}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setSelectedRoom(room);
                      setEditModalShow(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setSelectedRoom(room);
                      setDeleteModalShow(true);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <AddRoomModal
          show={addModalShow}
          onHide={() => setAddModalShow(false)}
          refresh={fetchRooms}
        />
        <EditRoomModal
          show={editModalShow}
          onHide={() => setEditModalShow(false)}
          room={selectedRoom}
          refresh={fetchRooms}
        />
        <DeleteRoomModal
          show={deleteModalShow}
          onHide={() => setDeleteModalShow(false)}
          roomId={selectedRoom?._id}
          refresh={fetchRooms}
        />
      </div>
    </div>
  );
}

export default RoomsTable;
