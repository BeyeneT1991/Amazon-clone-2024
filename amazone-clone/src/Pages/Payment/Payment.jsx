// import React, { useContext, useState } from 'react'
// import classes from './Payment.module.css'
// import LayOut from '../../Components/LayOut/LayOut'
// import { DataContext } from '../../Components/DataProvider/DataProvider'
// import ProductCard from '../../Components/Product/ProductCard'
// import {
//     useStripe,
//     useElements,
//     CardElement
// } from "@stripe/react-stripe-js"
// import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
// import { axiosInstance } from "../../API/axios"
// import { ClipLoader } from 'react-spinners'
// import { db } from '../../Utility/firebase'
// import { useNavigate } from "react-router-dom"
// import { Type } from '../../Utility/actiontype'

// function Payment() {
//     const [{ user, basket }, dispatch] = useContext(DataContext);
//     const totalItem = basket?.reduce((amount, item) => {
//         return item.amount + amount
//     }, 0)

//     const total = basket.reduce((amount, item) => {
//         return item.price * item.amount + amount
//     }, 0)
  
//     const [cardError, setCardError] = useState(null)
//     const [processing, setProcessing] = useState(false);

//     const stripe = useStripe();
//     const elements = useElements();
//     const navigate = useNavigate()

//     const handleChange = (e) => {
//         // console.log(e);
//         e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
//     };


//     const handlePayment = async (e) => {
//         e.paymentDefault();

//         try {
//             setProcessing(true)
//             //1.  backend || function ---> contact to the client secret
//             const response = await axiosInstance({
//                 method: "POST",
//                 url: `/payment/create?total=${total * 100}`,
//             });

//             console.log(response.data);
//             const clientSecret = response.data?.clientSecret;

//             // 2. client side (react side confirmation)
//             const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: elements.getElement(CardElement),
//                 },
//             });

//             // console.log(paymentIntent);

//             // 3. after the confirmation --> order firestore database save. clear basket

//             await db
//                 .collection("user")
//                 .doc(user.uid)
//                 .collection("order")
//                 .doc(paymentIntent.id)
//                 .set({
//                     basket: basket,
//                     amount: paymentIntent.amount,
//                     created: paymentIntent.created,
//                 });
//             // empty the basket;
//             dispatch({ type: Type.EMPTY_BASKET });

//             setProcessing(false);
//             navigate("/orders", { state: { msg: "you have placed new order" } })
//         } catch (error) {
//             console.log(error);
//             setProcessing(false);
//         }
//     };

//     return (
//         <LayOut>
//             {/* header */}
//             <div className={classes.payment_header}>
//                 Checkout ({totalItem}) items
//             </div>
//             {/* payment method */}
//             <section className={classes.payment}>
//                 <div className={classes.flex}>
//                     {/* address */}
//                     <h3>Delivery Address</h3>
//                     <div>
//                         <div>{user?.email}</div>
//                         <div>123 React Lane</div>
//                         <div>Chicago, IL</div>
//                     </div>
//                 </div>
//                 <hr />
//                 {/* product */}
//                 <div className={classes.flex}>
//                     <h3>Review item and delivery</h3>
//                     <div>
//                         {basket?.map((item) => (<ProductCard product={item} flex={true} />
//                         ))}
//                     </div>
//                 </div>
//                 <hr />
//                 {/* card form */}
//                 <div className={classes.flex}>
//                     <h3>Payment methods</h3>
//                     <div className={classes.payment_card_container}>
//                         <div className={classes.payment_details}>
//                             <form onSubmit={handlePayment}>
//                                 {/* error */}
//                                 {cardError && (<small style={{ color: "red" }}>{cardError}</small>
//                                 )}
//                                 {/* card element */}
//                                 <CardElement onChange={handleChange} />

//                                 {/* price */}
//                                 <div className={classes.payment_price}>
//                                     <div>
//                                         <span style={{ display: "flex", gap: "10px" }}>
//                                             <p>Total Order |</p> <CurrencyFormat amount={total} />
//                                         </span>
//                                     </div>
//                                     <button type="submit">
//                                         {
//                                             processing ? (
//                                                 <div className={classes.loading}>
//                                                     <ClipLoader color="gray" size={12} />
//                                                     <p>Please wait ...</p>
//                                                 </div>
//                                             ) : "Pay Now"
//                                         }
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </LayOut>
//     )
// }

// export default Payment







import React, { useContext, useState } from 'react';
import classes from './Payment.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import {
    useStripe,
    useElements,
    CardElement,
} from "@stripe/react-stripe-js";
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from "../../API/axios";
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/firebase';
import { useNavigate } from "react-router-dom";
import { Type } from '../../Utility/actiontype';

function Payment() {
    const [{ user, basket }, dispatch] = useContext(DataContext);
    
    // Calculate total items and total price
    const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
    const total = basket?.reduce((amount, item) => item.price * item.amount + amount, 0);

    const [cardError, setCardError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCardError(e?.error?.message || ""); // Update error state based on event
    };

    const handlePayment = async (e) => {
        e.preventDefault(); // Fix: Use `preventDefault` instead of `paymentDefault`

        try {
            setProcessing(true);

            // 1. Request a client secret from the backend
            const response = await axiosInstance({
                method: "POST",
                url: `/payment/create?total=${total * 100}`, // Convert to cents for Stripe
            });

            const clientSecret = response.data?.clientSecret;

            // 2. Confirm payment with Stripe
            const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            // 3. Save the order details to Firestore
            await db
                .collection("user")
                .doc(user.uid)
                .collection("order")
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                });

            // 4. Clear the basket and navigate to orders page
            dispatch({ type: Type.EMPTY_BASKET });
            setProcessing(false);
            navigate("/orders", { state: { msg: "You have placed a new order!" } });
        } catch (error) {
            console.error(error);
            setProcessing(false);
        }
    };

    return (
        <LayOut>
            {/* Header */}
            <div className={classes.payment_header}>
                Checkout ({totalItem}) items
            </div>

            {/* Payment Details */}
            <section className={classes.payment}>
                {/* Delivery Address */}
                <div className={classes.flex}>
                    <h3>Delivery Address</h3>
                    <div>
                        <div>{user?.email}</div>
                        <div>123 React Lane</div>
                        <div>Chicago, IL</div>
                    </div>
                </div>
                <hr />

                {/* Review Items */}
                <div className={classes.flex}>
                    <h3>Review Items and Delivery</h3>
                    <div>
                        {basket?.map((item) => (
                            <ProductCard key={item.id} product={item} flex={true} />
                        ))}
                    </div>
                </div>
                <hr />

                {/* Payment Form */}
                <div className={classes.flex}>
                    <h3>Payment Methods</h3>
                    <div className={classes.payment_card_container}>
                        <div className={classes.payment_details}>
                            <form onSubmit={handlePayment}>
                                {/* Card Error */}
                                {cardError && (
                                    <small style={{ color: "red" }}>{cardError}</small>
                                )}

                                {/* Card Element */}
                                <CardElement onChange={handleChange} />

                                {/* Total Price and Submit */}
                                <div className={classes.payment_price}>
                                    <div>
                                        <span style={{ display: "flex", gap: "10px" }}>
                                            <p>Total Order |</p>
                                            <CurrencyFormat amount={total} />
                                        </span>
                                    </div>
                                    <button type="submit" disabled={processing || !stripe || !elements}>
                                        {processing ? (
                                            <div className={classes.loading}>
                                                <ClipLoader color="gray" size={12} />
                                                <p>Please wait ...</p>
                                            </div>
                                        ) : (
                                            "Pay Now"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </LayOut>
    );
}

export default Payment;
