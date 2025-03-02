import { Link } from "react-router-dom";
import { useAuth } from "../../(providers)/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth()
    return (
        <nav className="bg-orange-400 p-4  shadow-md fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-white text-xl font-bold">
                    <img src="/logo.png" width={40} height={40} />
                    <span>QUIZLY</span>
                </Link>
                <>
                    {user
                        ?
                        <>
                            <Link to="/" onClick={logout}>
                                <button className="bg-white text-orange-600 px-4 py-2 rounded-lg shadow">Logout</button>
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/login">
                                <button className="bg-white text-orange-600 px-4 py-2 rounded-lg shadow">Login</button>
                            </Link>
                        </>
                    }

                </>
            </div>
        </nav>
    );
};

export default Navbar;
