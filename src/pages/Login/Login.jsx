import React, { useState } from 'react'
import { StyledLogin } from './Login.styled'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import CInput from '../../shared-components/CInput/CInput';
import CButton from '../../shared-components/CButton/CButton';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export default function Login() {
  const { register, handleSubmit, formState: { errors }, control } = useForm({ mode: 'all' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const authContext = useAuthContext();
  function onSubmit(data) {
    login(data).then(r => {
      authContext.setisAuthenticated(true);
      navigate("/");
    }).catch(err => {
      setError("Wrong email or password!");
    });
  }

  return (
    <StyledLogin>
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
            <span className='error'>{ error }</span>
            <div className='input-container'>
              <label>Email:</label>
              <CInput control={control} register={register('email', { required: true })} required={true} ></CInput>
            </div>
            <div className='input-container'>
              <label>Password:</label>
              <CInput control={control} register={register('password', { required: true })} type={"password"} required={true} ></CInput>
            </div>
            <div>
              <Link to={"/auth/forgotpassword"}>Forgot password?</Link>
            </div>
            <CButton text={"Login"}></CButton>
          </form>
        </div>
      </div>
    </StyledLogin>
  )
}
