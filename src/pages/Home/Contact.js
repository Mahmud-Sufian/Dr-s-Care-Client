import React from 'react';
import PrimaryButton from '../Shared/PrimaryButton';
import appointment from '../../assets/images/appointment.png';

const Contact = () => {
    return (
        <section style={{background:`url(${appointment})`}} className='bg-accent text-center py-8'>
            <div className="text-center mb-10">
                <h3 className='text-xl text-primary font-bold'>Contact Us</h3>
                <h2 className='text-3xl text-white'>Stay connected with us</h2>
            </div>

            <form className='w-1/2 mx-auto'>
                <input className='w-full p-2 rounded' type="text" placeholder='Email Address' />
                <br />
                <br />
                <input className='w-full p-2 rounded' type="text" placeholder='Subject' />
                <br />
                <br />
                <textarea className='w-full p-2 rounded' name="message" id="message" cols="30" rows="10" placeholder='Your Message'></textarea>
                <br />
                <br />
                <PrimaryButton>Submit</PrimaryButton>
            </form>
        </section>
    )
}

export default Contact