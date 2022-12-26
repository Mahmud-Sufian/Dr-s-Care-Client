import React from 'react'
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const AddDoctor = () => {

    const { data: services, isLoading } = useQuery('services', () => fetch(`https://dr-s-care-server.vercel.app/service`).then(res => res.json()));

    const imageStorageKey = '20ee534ec022d950affa1ad4da921bd9'; 

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const image = data.image[0];
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`
        const formData = new FormData();
        formData.append('image', image);

        fetch(url, {
            method:'POST',
            body: formData
        })
        .then(res => res.json())
        .then(result => {
            if(result.success){
                const img = result.data.url;

                const doctor = {
                    name: data.name,
                    email: data.email,
                    Specialization: data.Specialization,
                    img: img
                }

                fetch(`https://dr-s-care-server.vercel.app/doctor`, {
                    method: 'POST',
                    headers: {
                        'content-type' : 'application/json',
                        authorization : `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.insertedId){
                        toast.success('Doctor Added Successfully');
                        reset();
                    }
                    else{
                        toast.error('feiled to Add the Doctor')
                    }
                })
            }
        })
        console.log(data, 'updated');

    };

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            
            <h2 className='text-2xl'>Add Doctor</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                {/* name feild */}
                <div className="form-control w-full max-w-xs ">
                    <label className="label">
                        <span className="label-text text-xl text-secondary  ">Name</span>
                    </label>
                    <input type="text" placeholder="Your Name" {...register("name", {
                        required: { value: true, message: 'Name is Required' },
                    })} className="input input-bordered w-full max-w-xs" />

                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>


                {/* email feild */}
                <div className="form-control w-full max-w-xs ">
                    <label className="label">
                        <span className="label-text text-xl text-secondary  ">Email</span>
                    </label>
                    <input type="email" placeholder="Email Address" {...register("email", {
                        required: { value: true, message: 'Email is Required' },
                        pattern: { value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, message: 'Provide a Valid Email' }
                    })} className="input input-bordered w-full max-w-xs" />

                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    </label>
                </div>

                {/* Specialization feild */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text text-xl text-secondary  ">Specialization</span>
                    </label>

                    <select {...register("Specialization")} className="select select-bordered w-full max-w-xs"> 
                    {
                        services.map(service => <option key={service._id} value={service.name}>{service.name}</option>)
                    } 
                    </select>  
                </div>


                    {/* photo feild */}
                <div className="form-control w-full max-w-xs ">
                    <label className="label">
                        <span className="label-text text-xl text-secondary  ">Photo</span>
                    </label>
                    <input type="file" placeholder="Your Name" {...register("image", {
                        required: { value: true, message: 'image is Required' },
                    })} className="input input-bordered w-full max-w-xs" />

                    <label className="label">
                        {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                    </label>
                </div>


                <input type="submit" value='ADD' className='btn btn-secondary text-white w-full max-w-xs' />
            </form>
        </div>
    )
}

export default AddDoctor