import { FaReact } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-orange-300 p-4  shadow-md fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2 text-white text-xl font-bold">
                    <FaReact className="text-3xl" />
                    <span>MyApp</span>
                </div>
                <Link to="/login">
                    <button className="bg-white text-orange-600 px-4 py-2 rounded-lg shadow">Login</button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
