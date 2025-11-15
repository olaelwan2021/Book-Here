import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import DeleteUserModal from "./DeleteUser";
import AddUserModal from "./AddUser";
import EditUserModal from "./EditUser";

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
    axios
      .get("http://localhost:5000/api/v1/users")
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
            + Add New User
          </Button>
        </div>

        <Table striped bordered hover responsive className="align-middle">
          <thead className="table-light">
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="text-center"><img src={`http://localhost:5000/uploads/${user.avatar}`} alt="avatar" width={'40px'} height={'40px'} style={{ borderRadius: "50%" }} /></td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex gap-3">
                  <Button
                    variant="success"
                    className="me-2"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user);
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
