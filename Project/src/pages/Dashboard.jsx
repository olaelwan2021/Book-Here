import BookingsTable from "../components/bookings";
import HotelInfo from "../components/HotelInfo";
import RoomsTable from "../components/Rooms";
import UsersTable from "../components/Users";
import { ToastContainer } from "react-toastify";

import Slide from "../components/Slide"

function Dashboard() {
  return (
    <div className="d-flex gap-5" style={{backgroundColor:"#f0f2f5"}}>
    <Slide />
    <div className="flex-grow-1 p-4 container" style={{ marginLeft: "250px" }}>
        <ToastContainer position="top-right" autoClose={3000} />
    <UsersTable />
    <RoomsTable />
    <BookingsTable />
    <HotelInfo />
    </div>
    </div>
  );
}

export default Dashboard;
