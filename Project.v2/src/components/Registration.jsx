import { useState } from "react";
import SignUp from "./small-components/SignUp";
import Login from "./small-components/Login";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Registration() {
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const [mode, setMode] = useState("login")

    function handleSubmit(handler) {
        if(handler[0].includes("@") && handler[1].length >= 8) {
            navigate("/")
        }else if(handler[0] == "" || handler[1] == ""){
            
        }else {
            MySwal.fire({
                title: "Invalid Email or Password!",
                icon: "error",
                text: "Password must be 8 characters or more.",
                confirmButtonColor: "#0E6B87",
                draggable: false
            })
        }
    }

    return ( 
        <>
            <section className="registeration-bg d-flex justify-content-between">
                <div className="m-5 fw-bold">
                    <div className="registeration-brand mb-5">
                        <h2 className="fw-bolder text-color-darker">Book Here</h2>
                    </div>
                    <div className="registration-welcoming w-50">
                        <h1 className="text-color-darker fw-bold">Welcome!</h1>
                        <h3 className="text-color-dark fw-bold">To Our Website.</h3>
                        <p className="text-color">Experience timeless elegance and exceptional comfort. Discover thoughtfully designed rooms, exclusive offers, and a seamless booking experience crafted to make every stay truly unforgettable.</p>
                    </div>
                </div>

                <div className={`text-color form-wrapper ${mode == "signup" ? "active" : ""}`}>
                    {/* Sign Up */}
                    <SignUp setMode={setMode}
                    handleSubmit={handleSubmit} />
                    
                    {/* Login */}
                    <Login setMode={setMode}
                    handleSubmit={handleSubmit} />
                </div>

            </section>
        </>
     );
}

export default Registration;