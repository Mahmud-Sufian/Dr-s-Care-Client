import { format } from 'date-fns';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';

const BookingModal = ({ date, treatment, setTreatment, refetch }) => {
    const { _id, name, slots, price } = treatment;
    console.log(33, price)

    const [user] = useAuthState(auth);
    const bookingDate = format(date, 'PP');

    const handleBooking = (event) => {
        event.preventDefault();
        const slot = event.target.slot.value;
        const phone = event.target.phone.value;

        const booking = {
            treatmentId: _id,
            treatment: name,
            slot: slot,
            price: price,
            date: bookingDate,
            patientName: user.displayName,
            patientEmail: user.email,
            phone: phone
        }

        fetch('https://dr-s-care-server.vercel.app/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => { 
                if (data.success) {
                    toast(`Appointment is set, ${bookingDate} at ${slot}`);
                }
                else {
                    toast.error(`Already Have an Appointment on ${data.booking?.date} at ${data.booking?.slot}`);
                }
                refetch();
                setTreatment(null);

            })


    }

    return (
        <div>

            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-secondary text-center text-xl">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 justify-items-center mt-2'>
                        <input type="text" name='date' disabled value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" />
                        <select name='slot' className="select select-bordered w-full max-w-xs">
                            {slots.map((slot, i) => <option key={i} value={slot}>{slot}</option>)}
                        </select>
                        <input type="text" name='name' disabled value={user?.displayName || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="email" name='email' disabled value={user?.email || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
                        <input type='submit' className="btn btn-secondary w-full max-w-xs" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookingModal