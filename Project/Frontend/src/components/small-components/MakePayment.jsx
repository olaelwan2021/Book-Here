import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import api from "../../services/api";
import { useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function MakePayment(props) {
    const MySwal = withReactContent(Swal);

    const [pay, setPay] = useState(false);


    const location = useLocation();
    const [searchParams] = useSearchParams();
    const checkInDate = searchParams.get("checkIn");
    const checkOutDate = searchParams.get("checkOut");
    const guests = searchParams.get("guests");
    const { room } = location.state;

    const handlePay = async () => {

        if (pay) return;




        try {
            const response = await api.bookings.create({
                roomId: room._id,
                guests,
                checkIn: checkInDate,
                checkOut: checkOutDate,
            });
        setPay(true);

        MySwal.fire({
            title: "Successful Payment !",
            icon: "success",
            text: `${props.totalPrice} EGP`,
            confirmButtonColor: "#0E6B87",
            draggable: false
        });
            toast.success("Booking created successfully!");
            console.log(response.data);

        } catch (error) {
            toast.error("Error creating booking");
            console.log(error);
        }
    };

    return (
        <>
            <div className="payment-methods-box w-75">
                <div className="rounded border p-3">
                    <h4 className="text-color-dark fw-bold">Payment</h4>

                    <div className="d-flex justify-content-between px-2 py-4">
                        <div className="d-flex gap-2">
                            <div className="methodsLogo bg-white rounded pt-1">
                                <img src={props.paymentLogo} alt="" width="60" />
                            </div>
                            <div><p className="fw-bold">Credit Card or Diebt Card</p></div>
                        </div>
                        <div>
                        
                            <input className="form-check-input" type="radio" checked readOnly />
                        </div>
                    </div>

                    <form>
                        <div className="">
                            <label htmlFor="cardNumber" className="fw-bold">Card Number</label>
                            <input type="text" className="w-100 p-2 rounded"
                                id="cardNumber" value={props.cardNumber} disabled />
                        </div>

                        <div className="d-flex gap-3 my-4">
                            <div className="w-50">
                                <label htmlFor="expDate" className="fw-bold">Exp. Date</label>
                                <input type="text" className="w-100 p-2 rounded"
                                    id="expDate" value={props.expDate} disabled />
                            </div>
                            <div className="w-50">
                                <label htmlFor="cvc" className="fw-bold">CVC</label>
                                <input type="text" className="w-100 p-2 rounded"
                                    id="cvc" value={props.cvc} disabled />
                            </div>
                        </div>
                    </form>

                    <button
                        className="btn btn-main-color w-100"
                        onClick={handlePay}
                        disabled={pay}
                    >
                        {pay ? "Booked" : `Pay ${props.totalPrice} EGP`}
                    </button>

                </div>
            </div>
        </>
    );
}

export default MakePayment;
