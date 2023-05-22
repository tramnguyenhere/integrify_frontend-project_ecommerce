import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { login } from '../redux/reducers/usersReducer';
import useAppDispatch from '../hooks/useAppDispatch';

const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <div className='form__wrapper'>
      <h2 className='page__header'>Login</h2>
      <form className='form'>
        <div className='form__section'>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form__section'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className='full-width-button__primary'
          type='button'
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
      <Link to='/register'>Not have an account yet? Create one!</Link>
    </div>
  );
};

export default Login;
