import React, { useState } from 'react';

import useAppSelector from '../hooks/useAppSelector';
import Helmet from '../components/Helmet';
import useAppDispatch from '../hooks/useAppDispatch';
import { logout, updateOneUser } from '../redux/reducers/usersReducer';
import { UserUpdate } from '../types/UserUpdate';

const UserProfile = () => {
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const [editPageVisible, setEditPageVisible] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState(currentUser?.password || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const dispatch = useAppDispatch();

  const editFormHandler = () => {
    if (currentUser) {
      const updatedUser: UserUpdate = {
        id: currentUser.id,
        update: { name, email, password, avatar, role: currentUser.role },
      };
      dispatch(updateOneUser(updatedUser));
    }
  };

  return (
    <Helmet title='User Profile'>
      <div>
        <h2 className='page__header'>{currentUser?.role.toUpperCase()}</h2>
        {editPageVisible ? (
          <div className='user-profile--edit'>
            <form className='form' onSubmit={editFormHandler}>
              <div className='form__group'>
                <h3 className='user-profile--edit__section__header'>Name</h3>
                <input
                  placeholder='Change Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form__group'>
                <h3 className='user-profile--edit__section__header'>Email</h3>
                <input
                  placeholder='Change Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='form__group'>
                <h3 className='user-profile--edit__section__header'>
                  Password
                </h3>
                <input
                  placeholder='Change Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='form__group'>
                <h3 className='user-profile--edit__section__header'>Avatar</h3>
                <input
                  placeholder='Change Avatar'
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </div>
              <button className='full-width-button__primary ' type='submit'>
                Save
              </button>
            </form>
          </div>
        ) : (
          <div className='user-profile'>
            <div className='user-profile__section'>
              <img src={currentUser?.avatar} alt='avatar' />
            </div>
            <div className='user-profile__section'>
              <h3>Name: </h3>
              <p>{currentUser?.name}</p>
            </div>
            <div className='user-profile__section'>
              <h3>Email: </h3>
              <p>{currentUser?.email}</p>
            </div>
            <div className='user-profile__section'>
              <button
                className='fit-button__secondary'
                onClick={() => setEditPageVisible(true)}
              >
                Edit
              </button>
              <button
                className='fit-button__primary'
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </Helmet>
  );
};

export default UserProfile;
