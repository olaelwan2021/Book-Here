import axios from "axios";
import { Eraser } from "lucide";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function HotelInfo() {
  const [hotelInfo, setHotelInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    facilities: "",
    contactEmail: "",
    description: "",
  });


  const fetchHotelInfo = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/hotel/info");
      setHotelInfo(res.data[0]);
      setFormData({
        name: res.data[0].name || "",
        phone: res.data[0].phone || "",
        location: res.data[0].location || "",
        facilities: res.data[0].facilities || "",
        contactEmail: res.data[0].contactEmail || "",
        description: res.data[0].description || "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHotelInfo();
  }, []);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/v1/hotel/info/${hotelInfo._id}`,
        formData
      );
      toast.success("Hotel information updated successfully!");
      fetchHotelInfo(); 
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message||"Failed to update hotel info");
    }
  };

  if (!hotelInfo) return <p>Loading...</p>;

  return (
    <div className="container my-3" id="hotel">
      <div
        className="rounded-3 p-4 mx-auto"
        style={{ backgroundColor: "#fff", color: "#333" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold">Hotel Information</h3>
        </div>

        <Form>
          <div className="d-flex justify-content-between align-items-center gap-3">
            <div className="w-50">
              <Form.Label htmlFor="hotelName">Hotel Name</Form.Label>
              <Form.Control
                type="text"
                id="hotelName"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-50">
              <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
              <Form.Control
                type="text"
                id="phoneNumber"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="d-flex gap-3 mt-3">
            <div className="w-50">
              <Form.Label htmlFor="location">Address</Form.Label>
              <Form.Control
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="w-50">
              <Form.Label htmlFor="facilities">Facilities</Form.Label>
              <Form.Control
                type="text"
                id="facilities"
                name="facilities"
                value={formData.facilities}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-3">
            <Form.Label htmlFor="contactEmail">Email</Form.Label>
            <Form.Control
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
            />
          </div>

          <div className="mt-3">
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <Button className="mt-3" variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default HotelInfo;
