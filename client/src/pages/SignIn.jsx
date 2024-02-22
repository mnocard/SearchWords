import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(false);
      setLoading(true);

      const response = await fetch('/api/auth/SignIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.status === 404) {
        throw new Error("Incorrect login or password");
      } else if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setError(false);
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input type='text' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChanges} />
        <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChanges} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-md uppercase  disabled:opacity-80'>{loading ? "Loading..." : "Sign In"}</button>
      </form>
      <div className="flex gap-2 mt-5 self-center justify-center">
        <p>Don&#39;t have an account?</p>
        <span className='text-blue-500'>
          <Link to='/SignUp'>Sign Up</Link>
        </span>
      </div>
      <p className='text-red-600 mt-5 mx-auto text-center'>{error}</p>
    </div>
  );
}
