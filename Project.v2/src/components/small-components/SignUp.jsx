import { useRef } from "react";
import { Link } from "react-router-dom";

function SignUp(props) {
    const emailRef = useRef()
    const passwordRef = useRef()

    return ( 
        <>
            <div className="form-box signup pt-4" style={{height: "43.03rem"}}>
                <h1 className="text-center fw-bolder">Sign Up</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    props.handleSubmit([emailRef.current.value, passwordRef.current.value])
                }}>
                    <div className="form-group w-75 mt-5 m-auto">
                        <div className="input-box">
                            <input type="text" id="signupName" required />
                            <label htmlFor="signupName">Name</label>
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="input-box my-5">
                            <input type="text" id="signupEmail" required ref={emailRef}/>
                            <label htmlFor="signupEmail">Email</label>
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <div className="input-box">
                            <input type="password" id="signupPassword" required ref={passwordRef}/>
                            <label htmlFor="signupPassword">Password</label>
                            <i className="fa-solid fa-lock"></i>
                        </div>
                        <div className="my-4">
                            <input type="checkbox" id="terms" className="form-check-input me-2" required/>
                            <label htmlFor="terms">I agree to the terms & conditions</label>
                        </div>
                        <div className="text-center">
                            <input type="submit" value="Sign Up" className="btn w-100 py-2 bg-main-color" />
                        </div>
                        <div className="text-center mt-3">
                            <p>Already have an account? <Link className="links text-color" onClick={() => {props.setMode("login")
                             }}>Sign in</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
     );
}

export default SignUp;