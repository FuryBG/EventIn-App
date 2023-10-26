import React, { useState } from 'react'
import { StyledRegister } from './Register.styled'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import CInput from '../../shared-components/CInput/CInput';
import CButton from '../../shared-components/CButton/CButton';
import { useMutation } from 'react-query';

export default function Register() {
  const { mutate, isLoading } = useMutation({
    mutationFn: (userDetails) => register(userDetails),
    onSuccess: () => {
      toast.setToaster({ severity: 'success', detail: "Successfully register. Please check your email!" });
    },
    onerror: () => {
      setError(error.response.data.message);
    }
  });
  const { register, handleSubmit, formState: { errors }, control } = useForm({ mode: 'all' });
  const [error, setError] = useState(null);
  function onSubmit(userData) {
    mutate(userData);
  }
  return (
    <StyledRegister>
      <div className='aside'>
        <div className='aside-information'>
          <Link to={"/"}>
            <img src='/src/assets/logo.png'></img>
          </Link>
          <p>The best way to interact with all the participants on your event!</p>
          <div className='aside-footer'>
            <span>FB</span>
            <span>INST</span>
          </div>
        </div>
      </div>
      <div className='login-container'>
        <div className='form-container'>
          <span>Log in to your account</span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className='error'>{error}</span>
            <div className='input-container'>
              <label>Email:</label>
              <CInput control={control} register={register('email', { required: true })} required={true} ></CInput>
            </div>
            <div className='input-container'>
              <label>First Name:</label>
              <CInput control={control} register={register('firstName', { required: true })} required={true} ></CInput>
            </div>
            <div className='input-container'>
              <label>Last Name:</label>
              <CInput control={control} register={register('lastName', { required: true })} required={true} ></CInput>
            </div>
            <div className='input-container'>
              <label>Password:</label>
              <CInput control={control} register={register('password', { required: true })} type={"password"} required={true} ></CInput>
            </div>
            <div className='input-container'>
              <label>Re-Password:</label>
              <CInput control={control} register={register('repeatPassword', { required: true })} type={"password"} required={true} ></CInput>
            </div>
            <div>
              <Link to={"/auth/login"}>Already have account?</Link>
            </div>
            <CButton disabled={isLoading ? true : false} isLoading={isLoading} text={"Register"}></CButton>
          </form>
        </div>
      </div>
    </StyledRegister>
  )
}
