import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
    const { id } = useParams();

    const url = `https://dr-s-care-server.vercel.app/booking/${id}`;
    const { data: appointment, isLoading } = useQuery(['booking', id], () => fetch(url, { headers: { authorization: `bearer ${localStorage.getItem('accessToken')}` } }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    const stripePromise = loadStripe('pk_test_51Ie0yhLkUal5xLL58n0wLGcBd7uQN5IgMwN1Zdgv2d1gEbIKGA7qEvncIG7fYqon4rEzUXpMZkUdCNJYRmbxOaBC00IZx9UhAp');

    return (
        <div>
            <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
                <div className="card-body">
                    <h2 className="text-secondary font-bold text-xl">Hello {appointment.patientName}</h2>
                    <h2 className="card-title">Pay for {appointment.treatment}</h2>
                    <p>Your Appointment on <span className='text-orange-400'>{appointment.date}</span> at <span className='text-orange-400'>{appointment.slot}</span></p>
                    <p><small>Please Pay {appointment.price} </small></p>
                </div>
            </div>
            <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />
                    </Elements>
                </div>
            </div>
        </div>
    )
}

export default Payment