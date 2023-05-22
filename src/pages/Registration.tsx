import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { User } from '../types/User';
import useAppDispatch from '../hooks/useAppDispatch';
import Helmet from '../components/Helmet';
import { createNewUser } from '../redux/reducers/usersReducer';
import useAppSelector from '../hooks/useAppSelector';

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const { users } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  const onSubmit = (data: User) => {
    if (users.find((user) => user.email === data.email)) {
      alert('The registered email has been existed!');
      return;
    }
    const newUser = { ...data };
    dispatch(createNewUser(newUser));
  };

  return (
    <Helmet title='Registration'>
      <div className='registration__wrapper'>
        <h2 className='page__header'>Registration</h2>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <div className='form__group'>
            <input
              type='text'
              placeholder='Enter your name'
              {...register('name', { required: true })}
            />
            {errors.name && (
              <span className='form--error'>This field is required!</span>
            )}
          </div>
          <div className='form__group'>
            <input
              type='email'
              placeholder='Enter your email'
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <span className='form--error'>
                This field is required to put a valid email!
              </span>
            )}
          </div>
          <div className='form__group'>
            <input
              minLength={8}
              type='password'
              placeholder='Enter your password'
              {...register('password', { required: true, minLength: 8 })}
            />
            {errors.password && (
              <span className='form--error'>
                This field is required to put a password with more than 7
                characters
              </span>
            )}
          </div>
          <div className='form__group'>
            <input
              type='url'
              placeholder='Enter url of your photo'
              {...register('avatar', { required: true, minLength: 8 })}
            />
            {errors.avatar && (
              <span className='form--error'>
                This field is required to put an url of photo address
              </span>
            )}
          </div>
          <button type='submit' className='form__button'>
            Register
          </button>
        </form>
        <Link to='/login'>Already had an account? Login!</Link>
      </div>
    </Helmet>
  );
};

export default Registration;
