import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const response = await fetch('/api/auth/SignIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });


      const data = await response.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
      } else {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (err) {
      dispatch(signInFailure(err));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input type='text' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChanges} />
        <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChanges} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-md uppercase  disabled:opacity-80'>{loading ? "Loading..." : "Sign In"}</button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5 self-center justify-center">
        <p>Don&#39;t have an account?</p>
        <span className='text-blue-500'>
          <Link to='/SignUp'>Sign Up</Link>
        </span>
      </div>
      <p className='text-red-600 mt-5 mx-auto text-center'>{error ? error.error || "Something went wrong" : ""}</p>
    </div>
  );
}
