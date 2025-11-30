import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate();

    return (
        <>
            <div className="form-box login pt-4" style={{ height: "43.03rem" }}>
                <h1 className="text-center fw-bolder">Login</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    props.handleSubmit([emailRef.current.value, passwordRef.current.value])
                }}>
                    <div className="form-group w-75 mt-5 m-auto">
                        <div className="input-box">
                            <input type="text" id="loginEmail" required ref={emailRef} />
                            <label htmlFor="loginEmail">Email</label>
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <div className="input-box my-5">
                            <input type="password" id="loginPassword" required ref={passwordRef} />
                            <label htmlFor="loginPassword">Password</label>
                            <i className="fa-solid fa-lock"></i>
                        </div>
                        <div className="text-center">
                            <input type="submit" value="Login" className="btn w-100 py-2 btn-main-color" />
                        </div>
                        <div className="text-center mt-3">
                            <p>Dont't have an account? <Link className="links" onClick={() => { props.setMode("signup") }}>Sign up</Link></p>
                        </div>
                        <div className="text-center">
                            <button
                                type="button"
                                className="links btn btn-link p-0"
                                onClick={() => navigate("/forget-password")}
                            >
                                Forgot password
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
