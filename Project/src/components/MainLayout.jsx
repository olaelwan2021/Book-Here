import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  }

export default MainLayout;