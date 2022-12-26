import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import BookingModal from './BookingModal';
import Service from './Service';

const AvailableAppointment = ({ date }) => {
    const [treatment, setTreatment] = useState(null);
    // const [services, setServices] = useState([]);

    const formatedDate = format(date, 'PP');

    const {data: services, isLoading, refetch } = useQuery(['available', formatedDate], () => fetch(`https://dr-s-care-server.vercel.app/available?date=${formatedDate}`).then(res => res.json()))

    if(isLoading){
        return <Loading></Loading>
    } 

    return (
        <div>
            <h2 className='text-xl text-secondary font-bold text-center mb-5'>Available Services on {format(date, 'PP')}</h2>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services?.map(service => <Service key={service._id} service={service} setTreatment={setTreatment}></Service>)
                }
            </div>
            {
                treatment && <BookingModal refetch={refetch} date={date} treatment={treatment} setTreatment={setTreatment}></BookingModal>
            }
        </div>
    )
}

export default AvailableAppointment