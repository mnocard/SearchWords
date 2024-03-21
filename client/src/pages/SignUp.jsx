import { Link } from 'react-router-dom';
import GoogleOAuth from '../components/OAuth';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className='flex flex-col gap-4 '>
        <GoogleOAuth />
      </form>
      <div className="flex gap-2 mt-5 self-center justify-center">
        <p>Have an account?</p>
        <span className='text-blue-500'>
          <Link to='/SignIn'>Sign In</Link>
        </span>
      </div>
    </div>
  );
}
