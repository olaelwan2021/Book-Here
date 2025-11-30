// Mohamed
import Listing from './components/Listing'
import { Route, Routes } from 'react-router-dom'
import Registration from './components/Registration'
import Payment from './components/Payment'

// Omar
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/shared/ProtectedRoute'
import NotFound from './pages/PageNotFound'
import AdminRoute from './components/shared/AdminRoute'
import ForgotPasswordPage from './components/small-components/ForgotPassword' 


// Eman
import RoomDetails from './components/RoomDetails'

// Ola
// import Navbar from './components/Navbar'
import Home from './components/Home'
// import Profile from './components/Profile'
// import Footer from './components/Footer'
// import Services from "./components/Services";

import MainLayout from './components/MainLayout'

import { ToastContainer } from 'react-toastify'
import Profile from './pages/Profile'

function App() {

  return (
    <>
          <ToastContainer
        position="top-right"
        autoClose={3000}  
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route element={<MainLayout />}>
         <Route path="/" element={<ProtectedRoute > <Home /></ProtectedRoute>} />
          {/* <Route path="/Profile" element={<Profile />} /> */}
          {/* <Route path="/Services" element={<Services />} /> */}
         <Route path='/listing' element={ <ProtectedRoute ><Listing /></ProtectedRoute> } />
          {/* <Route path='/registration' element={<Registration />} /> */}
          {/* <Route path='/payment' element={<Payment />} /> */}
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}
         <Route path='/details' element={<ProtectedRoute ><RoomDetails /></ProtectedRoute> } /> 
         <Route path='/profile' element={<ProtectedRoute ><Profile /></ProtectedRoute> } /> 
        </Route>
        <Route path='/dashboard' element={<AdminRoute ><ProtectedRoute ><Dashboard /></ProtectedRoute></AdminRoute> } />

        <Route path="/registration" element={<Registration />} />
        <Route path="/forget-password" element={<ForgotPasswordPage />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='*' element={<NotFound/> } />
      </Routes>
      
 
    </>
  )
}

export default App
