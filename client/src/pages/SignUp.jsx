import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(false);
    setLoading(true);

    await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => {
      if (!response.ok) {
        throw new Error(`Not ok! Status: ${response.status}`);
      }

      const data = response.json();
      console.log(data);

      setError(false);

      return data;
    }).catch(error => {
      console.log(error);
      setError(true);
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input type='text' placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChanges} />
        <input type='text' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChanges} />
        <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChanges} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-md uppercase  disabled:opacity-80'>{loading ? "Loading..." : "Sign Up"}</button>
      </form>
      <div className="flex gap-2 mt-5 self-center justify-center">
        <p>Have an account?</p>
        <span className='text-blue-500'>
          <Link to='/signin'>Sign In</Link>
        </span>
      </div>
      <p className='text-red-600 mt-5 mx-auto text-center'>{error && "Something went wrong"}</p>
    </div>
  );
}
