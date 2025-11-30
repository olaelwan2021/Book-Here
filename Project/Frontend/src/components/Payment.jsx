import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useRef, useState } from "react"

import MakePayment from "./small-components/MakePayment"
import PaymentMethods from "./small-components/PaymentMethods"
import { useLocation, useSearchParams } from "react-router-dom"
import api from "../services/api";
import { toast } from "react-toastify";

function Payment() {
    const MySwal = withReactContent(Swal)

    const [paymentInfoFlag, setPaymentInfoFlag] = useState(false)
    const [paymentLogo, setPaymentLogo] = useState(null)

    const [cardNumber, setCardNumber] = useState("");
    const [expDate, setExpDate] = useState("");
    const [cvc, setCvc] = useState("");
    const saveInfoRef = useRef()

    const location = useLocation()
    const { room } = location.state
    const [searchParams] = useSearchParams();
    const checkInDate = searchParams.get("checkIn");
    const checkOutDate = searchParams.get("checkOut");
    const guests = searchParams.get("guests");
    const roomImage = room.images[0] || [];

    const nightsDiff = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * nightsDiff;

    const handleConfirm = async (e) => {
        e.preventDefault();

        const isValid =
            cardNumber !== "" &&
            expDate !== "" &&
            cvc !== "" &&
            saveInfoRef.current.checked === true;

        if (!isValid) {
            return MySwal.fire({
                title: "Incomplete Submission!",
                icon: "error",
                text: `Please fill in all required fields and check the security confirmation box to continue.`,
                confirmButtonColor: "#0E6B87",
                draggable: false
            });
        }
            setPaymentInfoFlag(true);



    };

    return (
        <>
            <section>
                <div className="my-3">
                    <h1 className="text-center fw-bold"><span className="text-color-darker">P</span>ayment</h1>
                </div>

                <div className="payment-container container m-auto my-5 d-flex justify-content-between gap-2">

                    {paymentInfoFlag ? <MakePayment
                        cardNumber={cardNumber}
                        expDate={expDate}
                        cvc={cvc}
                        paymentLogo={paymentLogo}
                        room={room}
                        totalPrice={totalPrice} /> : <PaymentMethods
                        setPaymentLogo={setPaymentLogo}
                        />}
                        
                    

                    <div className="summary-container w-25">
                        <div className="rounded border p-3">
                            <div className="d-flex gap-4">
                                <div className="d-flex flex-column gap-2">
                                    <div><img className="rounded" src={"http://localhost:5000/uploads/" + roomImage} alt="" width="180" /></div>
                                    <p className="text-color-light fw-bold">{room.name}</p>
                                </div>
                                <div className="listingAmenities">
                                    <div><i className={`fa-solid fa-${room.amenities[0]}`}></i></div>
                                    <div><i className={`fa-solid fa-${room.amenities[1]}`}></i></div>
                                    <div><i className={`fa-solid fa-${room.amenities[2]}`}></i></div>
                                    <div><i className={`fa-solid fa-${room.amenities[3]}`}></i></div>
                                    <div><i className={`fa-solid fa-${room.amenities[4]}`}></i></div>
                                    <div><i className={`fa-solid fa-${room.amenities[5]}`}></i></div>
                                    <div><i className={`fa-solid fa-${room.amenities[6]}`}></i></div>
                                    <div><i className={`fa-solid fa-${room.amenities[7]}`}></i></div>
                                </div>
                            </div>

                            <div className="my-2">
                                <div className="d-flex gap-2">
                                    <div className="rate rounded"><p>{room.rating}</p></div>
                                    <p className="fw-bold mt-1">{room.rate}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded border p-3 mt-2">
                            <h6 className="text-color-dark fw-bold">Your booking details</h6>

                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6>Check in</h6>
                                    <p className="fw-bold">{checkInDate} <br /> <span className="fw-normal">15:00</span></p>
                                </div>
                                <div>
                                    <h6>Check out</h6>
                                    <p className="fw-bold">{checkOutDate} <br /> <span className="fw-normal">15:00</span></p>
                                </div>
                            </div>

                            <p>Number of guests: <br /> <span className="fw-bold">{guests}</span></p>
                        </div>

                        <div className="bg-main-color rounded mt-2 p-3 d-flex justify-content-between">
                            <h4>Price</h4>
                            <h4>{totalPrice} EGP</h4>
                        </div>
                    </div>

                </div>
            </section>

            <div className="modal mt-5" id="exampleModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bolder fs-3 text-color-darker">Payment Information</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="">
                                    <label htmlFor="cardNumber" className="fw-bold">Card Number</label>
                                    <input type="text" className="w-100 p-2 rounded" placeholder="4321-4321-4321-4321" id="modalCardNumber" value={cardNumber} required onChange={(e) => setCardNumber(e.target.value)} />
                                </div>
                                <div className="d-flex gap-3 my-4">
                                    <div className="w-50">
                                        <label htmlFor="expDate" className="fw-bold">Exp. Date</label>
                                        <input type="text" className="w-100 p-2 rounded" placeholder="02/27" id="modalExpDate" value={expDate} required onChange={(e) => setExpDate(e.target.value)} />
                                    </div>
                                    <div className="w-50" >
                                        <label htmlFor="cvc" className="fw-bold">CVC</label>
                                        <input type="text" className="w-100 p-2 rounded" placeholder="123" id="modalCvc" value={cvc} required onChange={(e) => setCvc(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-check mb-4">
                                    <input type="checkbox" className="form-check-input" id="saveInfo" ref={saveInfoRef} required />
                                    <label className="form-check-label" htmlFor="saveInfo">Securely save my information for 1-click checkout</label>
                                </div>

                                <input type="submit" className="btn btn-main-color w-100" value="Confirm" data-bs-dismiss="modal" onClick={handleConfirm} />
                            </form>


                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Payment;