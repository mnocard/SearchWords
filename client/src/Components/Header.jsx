import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className='bg-cyan-600'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold'>Auth app</h1>
                </Link>
                <ul className='flex gap-4'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/About'>About</Link></li>
                    <li><Link to='/SignIn'>Sign In</Link></li>
                </ul>
            </div>
        </div>
    );
}
