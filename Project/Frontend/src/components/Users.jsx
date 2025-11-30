import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import DeleteUserModal from "./DeleteUser";
import AddUserModal from "./AddUser";
import EditUserModal from "./EditUser";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../services/api";

function UsersTable() {
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [userIdDel, setUserIdDel] = useState(null);
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    api.users.getAll()
      .then((res) => setUsers(res.data || []))
      .catch((err) => console.error("Failed to fetch users:", err));
  };

  const handleDeleteClick = (user) => {
    setUserIdDel(user._id);
    setDeleteModalShow(true);
  };

  return (
    <div className="container mt-3" id="users">
      <div className="rounded-3 p-4 mx-auto shadow-sm"
        style={{ backgroundColor: "#fff", color: "#333", overflowX: "auto" }}>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold m-0">Users Management</h4>


                    <Button variant="primary" onClick={() => setModalShow(true)} size="sm">
                      <span className="fw-bold fs-5 me-1">+</span> Add New User
                    </Button>
        </div>

        <Table striped bordered hover responsive className="align-middle">
          <thead className="table-light">
            <tr>
              
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="text-center">
  <div className="d-flex justify-content-center gap-3">

    <span
      className="user-icon edit"
      onClick={() => {
        setSelectedUser(user);
        setEditModalShow(true);
      }}
    >
      <FaEdit />
    </span>

    <span
      className="user-icon delete"
      onClick={() => handleDeleteClick(user)}
    >
      <FaTrash />
    </span>

  </div>
</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <DeleteUserModal
          show={deleteModalShow}
          onHide={() => {
            setDeleteModalShow(false);
            fetchUsers();
          }}
          userId={userIdDel}
        />

        <EditUserModal
          show={editModalShow}
          onHide={() => {
            setEditModalShow(false);
            fetchUsers();
          }}
          user={selectedUser}
        />


        <AddUserModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            fetchUsers();
          }}
        />
      </div>
    </div>
  );
}

export default UsersTable;
