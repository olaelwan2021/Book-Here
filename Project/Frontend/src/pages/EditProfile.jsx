import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { BsCameraFill } from "react-icons/bs";
import api from "../services/api";
import { toast } from "react-toastify";

function EditProfileModal({ show, onHide, user, onUpdate }) {
  const [formData, setFormData] = useState({
    avatar: null,
    name: "",
    email: "",
    password: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        avatar: null,
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
      setAvatarPreview(user.avatar ? `http://localhost:5000/uploads/${user.avatar}` : null);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files[0]) {
      setFormData((prev) => ({ ...prev, avatar: files[0] }));
      setAvatarPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      if (formData.avatar) data.append("avatar", formData.avatar);
      data.append("name", formData.name);
      data.append("email", formData.email);
      if (formData.password) data.append("password", formData.password);
      const res = await api.auth.updateProfile(data);  
      console.log(data)
      toast.success("Profile Updated Successfully");
      onUpdate(res.data); 
      onHide();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={4} className="text-center">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Preview"
                  className="rounded-circle mb-2"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="rounded-circle bg-secondary mb-2"
                  style={{ width: "120px", height: "120px" }}
                />
              )}
              <Form.Group>
                <Form.Label className="d-block">
                  <BsCameraFill /> Change Avatar
                </Form.Label>
                <Form.Control type="file" name="avatar" accept="image/*" onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

        

              <Form.Group className="mb-3">
                <Form.Label>Password (Leave blank to keep current)</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-end">
            <Button variant="secondary" className="me-2" onClick={onHide}>
              Cancel
            </Button>
            <Button type="submit" className="profile-booking-modal-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditProfileModal;
