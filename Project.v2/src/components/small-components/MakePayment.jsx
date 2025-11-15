import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function MakePayment(props) {
    const MySwal = withReactContent(Swal)

    return (
        <>
            <div className="payment-methods-box w-75">
                <div className="rounded border p-3">
                    <h4 className="text-color-dark fw-bold">Payment</h4>

                    <div className="d-flex justify-content-between px-2 py-4">
                        <div className="d-flex gap-2">
                            <div className="methodsLogo bg-white rounded pt-1"><img src={props.paymentLogo} alt="" width="60" /></div>
                            <div><p className="fw-bold">Credit Card or Diebt Card</p></div>
                        </div>
                        <div>
                            <input className="form-check-input" type="radio" checked />
                        </div>
                    </div>

                    <form>
                        <div className="">
                            <label htmlFor="cardNumber" className="fw-bold">Card Number</label>
                            <input type="text" className="w-100 p-2 rounded" name="" id="cardNumber" value={props.cardNumber} disabled />
                        </div>
                        <div className="d-flex gap-3 my-4">
                            <div className="w-50">
                                <label htmlFor="expDate" className="fw-bold">Exp. Date</label>
                                <input type="text" className="w-100 p-2 rounded" name="" id="expDate" value={props.expDate} disabled />
                            </div>
                            <div className="w-50" >
                                <label htmlFor="cvc" className="fw-bold">CVC</label>
                                <input type="text" className="w-100 p-2 rounded" name="" id="cvc" value={props.cvc} disabled />
                            </div>
                        </div>
                    </form>

                    <div className="form-check mb-4">
                        <input type="checkbox" className="form-check-input" id="saveInfo" />
                        <label className="form-check-label" htmlFor="saveInfo">Securely save my information for 1-click checkout</label>
                    </div>

                    <button className="btn bg-main-color w-100" onClick={() => {MySwal.fire({
                        title: "Successful Payment !",
                        icon: "success",
                        text: `${props.room.price} EGP`,
                        confirmButtonColor: "#0E6B87",
                        draggable: false
                    })}}>Pay {props.room.price} EGP</button>

                </div>
            </div >
        </>
    );
}

export default MakePayment;