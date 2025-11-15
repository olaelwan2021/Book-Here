import { useRef } from "react";
import { Link } from "react-router-dom";

function Login(props) {
    const emailRef = useRef()
    const passwordRef = useRef()

    return ( 
        <>
            <div className="form-box login pt-4" style={{height: "43.03rem"}}>
                <h1 className="text-center fw-bolder">Login</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    props.handleSubmit([emailRef.current.value, passwordRef.current.value])
                }}>
                    <div className="form-group w-75 mt-5 m-auto">
                        <div className="input-box ">
                            <input type="text" id="loginEmail" required ref={emailRef}/>
                            <label htmlFor="loginEmail">Email</label>
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <div className="input-box my-5">
                            <input type="password" id="loginPassword" required ref={passwordRef}/>
                            <label htmlFor="loginPassword">Password</label>
                            <i className="fa-solid fa-lock"></i>
                        </div>
                        <div className="my-4">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <input type="checkbox" id="remember" className="form-check-input me-2" />
                                    <label htmlFor="remember">Remember me</label>
                                </div>
                                <div>
                                    <Link className="links text-color">Forgot password</Link>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <input type="submit" value="Login" className="btn w-100 py-2 bg-main-color" />
                        </div>
                        <div className="text-center mt-3">
                            <p>Dont't have an account? <Link className="links text-color" onClick={() => {props.setMode("signup")
                             }}>Sign up</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
     );
}

export default Login;