import { House, Users, BedDouble, CalendarDays, Building2 } from "lucide-react";

function Slide() {
    return (
        <div
            className="flex-column p-4 fw-semibold shadow-sm slide"
            style={{
                width: "250px",
                height: "100vh",
                backgroundColor: "#f8f9fa",
                color: "#333",
                position: "fixed",
                display:"flex"
            }}
        >
    
            <div className="d-flex align-items-center mb-4" >
                <img
                    src="./logo.jpg"
                    alt="Logo"
                    style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "8px",
                        marginRight: "10px",
                    }}
                />
                <h5 className="m-0">Hotel Admin</h5>
            </div>


            <ul className="list-unstyled mt-3">
                <li className="mb-2">
                    <a
                        href="#users"
                        className="d-flex align-items-center p-2 rounded text-decoration-none text-dark hover-item"
                    >
                        <Users size={18} className="me-2" />
                        Users
                    </a>
                </li>
                <li className="mb-2">
                    <a
                        href="#rooms"
                        className="d-flex align-items-center p-2 rounded text-decoration-none text-dark hover-item"
                    >
                        <BedDouble size={18} className="me-2" />
                        Rooms
                    </a>
                </li>
                <li className="mb-2">
                    <a
                        href="#bookings"
                        className="d-flex align-items-center p-2 rounded text-decoration-none text-dark hover-item"
                    >
                        <CalendarDays size={18} className="me-2" />
                        Bookings
                    </a>
                </li>
                <li>
                    <a
                        href="#hotel"
                        className="d-flex align-items-center p-2 rounded text-decoration-none text-dark hover-item"
                    >
                        <Building2 size={18} className="me-2" />
                        Hotel Info
                    </a>
                </li>
            </ul>


        </div>
    );
}

export default Slide;
