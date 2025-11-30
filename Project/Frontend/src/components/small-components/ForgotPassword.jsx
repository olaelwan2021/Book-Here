import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import api from "../../services/api";
 

function ForgotPassword() {
    const emailRef = useRef();
    const codeRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const [sendEmail, setSendEmail] = useState(true);

    const handleSubmitForget = async(e) => {
        e.preventDefault();
        const email = emailRef.current.value;

        try {
            await api.auth.forgetPassword({ email });
            MySwal.fire({
                title: "Email Sent!",
                icon: "success",
                text: "Please check your email for password reset instructions",
                confirmButtonColor: "#0E6B87",
            });
            setSendEmail(false);
            emailRef.current.value = ""
        }catch (err) {
            console.error(err);
            MySwal.fire({
                title: "Failed!",
                icon: "error",
                text: err.response?.data?.message || "Something went wrong",
                confirmButtonColor: "#0E6B87",
            });
        }
    }

    const handleSubmitReset = async(e) => {
        e.preventDefault();
        const code = codeRef.current.value;
        const password = newPasswordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (password !== confirmPassword) {
            return MySwal.fire({
                title: "Error!",
                icon: "error",
                text: "Passwords do not match",
                confirmButtonColor: "#0E6B87",
            });
        }

        await api.auth.resetPassword({ code, password })
            .then(() => {
                MySwal.fire({
                    title: "Password Reset!",
                    icon: "success",
                    text: "You can now login with your new password",
                    confirmButtonColor: "#0E6B87",
                });
                console.log("Password reset successful");
                navigate("/registration");
            })
            .catch((err) => {
                MySwal.fire({
                    title: "Failed!",
                    icon: "error",
                    text: err.response?.data?.message || "Something went wrong",
                    confirmButtonColor: "#0E6B87",
                });
                console.error(err);
            });
    };

    return (
        <section className="registeration-bg d-flex justify-content-center align-items-center">
            <div className="forgot-password-box form-wrapper text-color p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h1 className="text-center fw-bolder mb-4">Reset Password</h1>
                <form onSubmit={sendEmail ? handleSubmitForget : handleSubmitReset}>
                    <div className="form-group mb-4 mt-5">
                        <div className="input-box">
                            <input
                                type="text"
                                id="email"
                                required
                                ref={emailRef}
                                disabled={!sendEmail}
                            />

                            <label htmlFor="email">Email</label>
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <div className="input-box">
                            <input type="text" id="code" required ref={codeRef}  disabled={sendEmail}  />
                            <label htmlFor="code">Code</label>
                            <i className="fa-solid fa-key"></i>

                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <div className="input-box">
                            <input type="password" id="newPassword" required ref={newPasswordRef}  disabled={sendEmail}  />
                            <label htmlFor="newPassword">New Password</label>
                            <i className="fa-solid fa-lock"></i>
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <div className="input-box">
                            <input type="password" id="confirmPassword" required ref={confirmPasswordRef}  disabled={sendEmail}  />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <i className="fa-solid fa-lock"></i>
                        </div>
                    </div>
                    <div className="text-center mb-3">
                        {sendEmail ? (
                        <input type="submit" value="Forgot Password" className="btn w-100 py-2 btn-main-color" />
                        ) : (
                        <input type="submit" value="Reset Password" className="btn w-100 py-2 btn-main-color" />
                        )}
                    </div>
                    <div className="text-center">
                        <button type="button" className="links text-color btn btn-link p-0" onClick={() => navigate("/registration")}>
                            Back to Login
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default ForgotPassword;
