import React from 'react'
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../Hooks/useToken';

const SignUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        console.log(data, 'updated');
        
    };

    const [token] = useToken(user || gUser) 
    
    let signInError;
    if (loading || gLoading || updating) {
        return <Loading></Loading>
    }

    if (error || gError || updateError) {
        signInError = <p className='text-red-500'><small>{error.message || gError.message || updateError.message}</small></p>
    }

    if (token) { 
        navigate('/appointment');
    }
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-4xl font-bold text-secondary">Sign Up</h2>

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

                        {/* password feild */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-xl text-secondary  ">Password</span>
                            </label>
                            <input type="password" placeholder="Password" {...register("password", {
                                required: { value: true, message: 'Password is Required' },
                                minLength: { value: 6, message: 'Must be 6 Characters or Longer' }
                            })} className="input input-bordered w-full max-w-xs" />

                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        {signInError}
                        <input type="submit" value='Sign Up' className='btn btn-secondary text-white w-full max-w-xs' />
                    </form>

                    <p><small>Already Have an Account? <Link to='/login' className='text-secondary'>Please Login</Link></small></p>

                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} className="btn btn-outline btn-success hover:text-white">Continew With Google</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp