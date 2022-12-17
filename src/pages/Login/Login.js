import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';



const Login = () => { 

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  useEffect( () => {
    if (user || gUser) {
      navigate(from, { replace: true });
    }
  } ,[user, gUser]);

  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
    console.log(data)
  };

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  let signInError;

  if(loading || gLoading){
    return <Loading></Loading>
  }

  if(error || gError){
    signInError = <p className='text-red-500'><small>{error.message || gError.message}</small></p>
  }

  
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-4xl font-bold text-secondary">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)}>

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
            <input type="submit" value='Login' className='btn btn-secondary text-white w-full max-w-xs' />
          </form>

          <p><small>New to Dr's Care? <Link to='/signup' className='text-secondary'>Create Account</Link></small></p>

          <div className="divider">OR</div>
          <button onClick={() => signInWithGoogle()} className="btn btn-outline btn-success hover:text-white">Continew With Google</button>
        </div>
      </div>
    </div>
  )
}

export default Login