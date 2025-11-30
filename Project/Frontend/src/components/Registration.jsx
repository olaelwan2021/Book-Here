import { useState } from "react";
import SignUp from "./small-components/SignUp";
import Login from "./small-components/Login";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import api from "../services/api"

function Registration() {
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const [mode, setMode] = useState("login")

    // HANDLE SUBMIT (Login + Register)
    function handleSubmit(handler) {
        const email = handler[0];
        const password = handler[1];
        const name = handler[2];

        // LOGIN MODE
        if (mode === "login") {
            api.auth.login({ email, password })
                .then((res) => {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    
                    navigate("/");
                })
                .catch((err) => {
                    MySwal.fire({
                        title: "Login Failed!",
                        icon: "error",
                        text: err.response?.data?.message || "Invalid email or password",
                        confirmButtonColor: "#0E6B87",
                    });
                });
            return;
        }

        // SIGNUP MODE
        if (mode === "signup") {
            api.auth.register({ name, email, password })
                .then((res) => {
                    MySwal.fire({
                        title: "Account Created!",
                        icon: "success",
                        text: "You can now log in",
                        confirmButtonColor: "#0E6B87",
                    });
                    // setMode("login");
                })
                .catch((err) => {
                    MySwal.fire({
                        title: "Signup Failed!",
                        icon: "error",
                        text: err.response?.data?.message || "Something went wrong",
                        confirmButtonColor: "#0E6B87",
                    });
                });
            return;
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
                        <p className="text-color">
                            Experience timeless elegance and exceptional comfort. Discover thoughtfully designed rooms, exclusive offers,
                            and a seamless booking experience crafted to make every stay truly unforgettable.
                        </p>
                    </div>
                </div>

                <div className={`text-color form-wrapper ${mode == "signup" ? "active" : ""}`}>
                    <SignUp setMode={setMode} handleSubmit={handleSubmit} />
                    <Login setMode={setMode} handleSubmit={handleSubmit} />
                    
                </div>

            </section>
        </>
    );
}

export default Registration;
