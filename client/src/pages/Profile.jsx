import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutSuccess,
  signOutFailure
} from '../redux/user/userSlice.js';

export default function Profile() {
  const dispatch = useDispatch();
  const [formData] = useState({});
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();

  /*
    firebase storage rules:  
    allow read;
    allow write: if
    request.resource.size < 2 * 1024 * 1024 &&
    request.resource.contentType.matches('image/.*')
  */

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
      } else {
        dispatch(deleteUserSuccess(data));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('api/auth/signOut', {
        method: 'GET'
      });
      dispatch(signOutSuccess());
      navigate('/');
    } catch (error) {
      dispatch(signOutFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7" >Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="Profile picture"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2" />
        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          className="bg-slate-100 rounded-lg p-3"
          disabled />
        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="bg-slate-100 rounded-lg p-3"
          disabled />
        <div className="flex justify-between mt-5">
          <span onClick={handleDelete} className="text-red-700 cursor-pointer">Delete account</span>
          <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
        </div>
      </form>
    </div>
  );
}
