import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
    const { currentUser } = useSelector(state => state.user);
    return (
        <div className='bg-cyan-600'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold'>Auth app</h1>
                </Link>
                <ul className='flex gap-4'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/About'>About</Link></li>
                    {currentUser
                        ? (<li>
                            <Link to='/Profile'><img
                                src={currentUser.profilePicture}
                                alt="Profile"
                                className="h-7 w-7 rounded-full object-cover" />
                            </Link>
                        </li>)
                        : (<li><Link to='/SignIn'>Sign In</Link></li>)
                    }
                </ul>
            </div>
        </div>
    );
}
