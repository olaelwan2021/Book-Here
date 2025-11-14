import { useEffect, useState } from "react";
import SignUp from "./small-components/SignUp";
import Login from "./small-components/Login";

function Registration() {
    

    const [mode, setMode] = useState("login")

    // const [email, setEmail] = useState("")
    // function handleSubmit(email) {
    //     if(email.includes("@")) {
    //         alert("valid Email")
    //     }else {
    //         alert("Invalid Email")
    //     }
    // }

    // useEffect(() => {
    //     handleSubmit(email)
    // }, [email])
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
                    <SignUp setMode={setMode} />
                    
                    {/* Login */}
                    <Login setMode={setMode} />
                </div>

            </section>
        </>
     );
}

export default Registration;