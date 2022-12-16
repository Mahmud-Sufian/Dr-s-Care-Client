import React from 'react'; 
import fluoride from '../../assets/images/fluoride.png'
import cavity from '../../assets/images/cavity.png'
import whitening from '../../assets/images/whitening.png'
import Service from './Service';

const Services = () => {
    const services = [
        {
            _id:1,
            name:'Fluride Treatment',
            description: '',
            img: fluoride,
        },
        {
            _id:2,
            name:'Cavity Filling',
            description: '',
            img: cavity,
        },
        {
            _id:3,
            name:'Teeth Whitening',
            description: '',
            img: whitening,
        }
    ]

  return (
    <div className='my-20'>
        <div className='text-center uppercase font-bold my-10'>
            <h3 className='text-xl text-primary'>Our Services</h3>
            <h1 className='text-4xl'>Services We Provide</h1>
        </div>

        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
               services.map(service => <Service key={service._id} service={service}></Service>) 
            }
        </div>
    </div>
  )
}

export default Services