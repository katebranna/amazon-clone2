import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from "./firebase";

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    //variables for pieces of state
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    //whenever the basket changes, it will update the stripe secret, so we can charge the customer
    useEffect(() => {
        //generate the stripe secret to be able to charge the customer

        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //*100 bc Stripe expects the total in a currencies subunits (dollars to cents)
                url: `/payments/create?total=${getBasketTotal(basket) * 100 }`
            });
            setClientSecret(response.data.clientSecret)

        }
        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret)

    const handleSubmit = async (event) => {
        //do all the stripe stuff
        event.preventDefault();
        setProcessing(true);

        //uses clientSecret is how stripe knows to charge the customer
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                //where to send that charge
                card: elements.getElement(CardElement)
            }
        //when that is finished (use .then because its a promise) 
        }).then(({paymentIntent}) => {
            //paymentIntent = payment confirmation

            //order goes through, access the database
            //within the database, get the user, get their orders
            //create a document and add the set info to it
            db.collection('users')
            .doc(user?.uid)
            .collection('orders').doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            //if that was correct and everything is good:
            setSucceeded(true);
            setError(null)
            setProcessing(false)

            //empty the basket once the order processes
            dispatch({
                type: 'EMPTY_BASKET'
            })

            //after paying, redirect to orders page
            history.replace('/orders')
        })
    }

    const handleChange = event => {
        //listen for changes in the CardElement
        //display any errors as the customer types their card info in
        //if the event is empty, disable the button
        setDisabled(event.empty);
        //if theres an error, show the error, otherwise show nothing
        setError(event.error ? event.error.message: ""); 

    }

    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items
                    </Link>)
                </h1>
                {/* Payment section for delivery address */}
                <div className='payment_section'>
                    <div className='payment_title'>
                            <h3>Deliver Address</h3>
                    </div>
                    <div className='payment_address'>
                            <p>{user?.email}</p>
                            <p>123 React Lane</p>
                            <p>Los Angeles, CA</p>
                    </div>
                </div>

                {/* Payment section for reviewing items */}
                <div className='payment_section'>
                    <div className='payment_title'>
                            <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment_items'>
                        {/* products in basket - use data layer */}
                            {basket.map(item => (
                                <CheckoutProduct 
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            ))}
                    </div>

                </div>

                {/* Payment section for pay method */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment method</h3>
                    </div>
                    <div className='payment_details'>
                        {/* STRIPE */}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment_priceContainer'>
                                <CurrencyFormat 
                                renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                />
                                <button
                                disabled={processing || disabled || succeeded}>
                                    {/*if it is processing, say "Processing, otherwise say Buy Now" */}
                                    <span>{processing ? <p>Processing</p> :
                                    "Buy Now"} </span>
                                </button>
                            </div>

                            {/* If there is an error, show the error text*/}
                            {error && <div>{error}</div>}
                        </form>
                    </div>

                </div>

            </div>
            
        </div>
    )
}

export default Payment
