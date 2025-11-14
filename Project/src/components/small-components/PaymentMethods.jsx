import visaPic from "../../assets/visa pic.png"
import masterCardPic from "../../assets/mastercard pic.png"
import paypalPic from "../../assets/paypal pic.png"

import {useRef} from "react"

function PaymentMethods(props) {
    const visa = useRef()
    const mastercard = useRef()
    const paypal = useRef()

    const visaRadio = useRef()
    const mastercardRadio = useRef()
    const paypalRadio = useRef()
    
    return ( 
        <>
            <div className="payment-methods-box w-75">
                <div className="rounded border p-3">
                    <h6 className="text-color-dark fw-bold">Payment Method</h6>
                
                    <div className="d-flex flex-column gap-4 my-3">
                        <div className=" d-flex justify-content-between align-items-center px-3 py-3 border rounded" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={visa} onClick={(e) => {e.target.classList.add("paymentMethodsClickStyle")
                            visaRadio.current.checked = true
                            mastercard.current.classList.remove("paymentMethodsClickStyle")
                            paypal.current.classList.remove("paymentMethodsClickStyle")
                            mastercardRadio.current.checked = false
                            paypalRadio.current.checked = false
                            props.setPaymentLogo(visaPic)
                        }}>
                            <div className="methodsLogo bg-white rounded py-1"><img src={visaPic} alt="Visa Logo" width="60"/></div>
                            <div>
                                <input className="form-check-input" type="radio" name="paymentMethod" ref={visaRadio}/>
                            </div>
                        </div>
                
                        <div className="d-flex justify-content-between align-items-center px-3 py-3 border rounded" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={mastercard} onClick={(e) => {e.target.classList.add("paymentMethodsClickStyle")
                            mastercardRadio.current.checked = true
                            visa.current.classList.remove("paymentMethodsClickStyle")
                            paypal.current.classList.remove("paymentMethodsClickStyle")
                            visaRadio.current.checked = false
                            paypalRadio.current.checked = false
                            props.setPaymentLogo(masterCardPic)
                        }}>
                            <div className="methodsLogo bg-white rounded py-"><img src={masterCardPic} alt="MasterCard Logo" width="60"/></div>
                            <div>
                                <input className="form-check-input" type="radio" name="paymentMethod" ref={mastercardRadio}/>
                            </div>
                        </div>
                
                        <div className="d-flex justify-content-between align-items-center px-3 py-3 border rounded" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={paypal} onClick={(e) => {e.target.classList.add("paymentMethodsClickStyle")
                            paypalRadio.current.checked = true
                            mastercard.current.classList.remove("paymentMethodsClickStyle")
                            visa.current.classList.remove("paymentMethodsClickStyle")
                            mastercardRadio.current.checked = false
                            visaRadio.current.checked = false
                            props.setPaymentLogo(paypalPic)
                        }}>
                            <div className="methodsLogo bg-white rounded py-2"><img src={paypalPic} alt="Paypal Logo" width="60"/></div>
                            <div>
                                <input className="form-check-input" type="radio" name="paymentMethod" ref={paypalRadio}/>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
        </>
     );
}

export default PaymentMethods;