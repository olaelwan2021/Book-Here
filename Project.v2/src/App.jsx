import Listing from './components/Listing'
import { Route, Routes } from 'react-router-dom'
import Registration from './components/Registration'
import Payment from './components/Payment'

// Omar
import Dashboard from "./pages/dashboard"

// Eman
import RoomDetails from './components/RoomDetails'

// Ola
// import Navbar from './components/Navbar'
import Home from './components/Home'
// import Profile from './components/Profile'
// import Footer from './components/Footer'
// import Services from "./components/Services";

import MainLayout from './components/MainLayout'

function App() {

  return (
    <>
      
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/Profile" element={<Profile />} /> */}
          {/* <Route path="/Services" element={<Services />} /> */}
          <Route path='/listing' element={<Listing />} />
          {/* <Route path='/registration' element={<Registration />} /> */}
          {/* <Route path='/payment' element={<Payment />} /> */}
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}
          <Route path='/details' element={<RoomDetails />} />
        </Route>

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/registration" element={<Registration />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
      

    </>
  )
}

export default App
