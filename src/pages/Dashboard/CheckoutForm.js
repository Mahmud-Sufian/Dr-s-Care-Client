import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'

const CheckoutForm = ({ appointment }) => {
    const {_id, price, patientName, patientEmail } = appointment;

    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }

            });
    }, [price]);

    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setCardError(error.message);

        }
        else {
            setCardError('');
        }

        setProcessing(true);
        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: patientEmail
                    },
                },
            },
        );

        if (intentError) {
            setCardError(intentError?.message);
            setSuccess('');
            setProcessing(false);
        }
        else {
            setCardError('');
            setTransactionId(paymentIntent.id);
            setSuccess('Congratulations, Your Payment is completed');

            const payment = {
                appointment: _id,
                transactionId: paymentIntent.id
            }

            fetch(`http://localhost:5000/booking/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type' : 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body:JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data => {
                setProcessing(false);
                console.log(data);
            })
        }
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret || success}>
                    Pay
                </button>
            </form>

            {
                <>
                    <p className='text-red-500'>{cardError}</p>


                    {
                        success && <div>
                            <p className='text-green-500'>{success}</p>
                            <p><small>Your transactionId: <span className='font-bold text-orange-400'>{transactionId}</span></small></p>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default CheckoutForm