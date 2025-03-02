import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-orange-400">404</h1>
            <p className="text-xl text-gray-600 mt-2">Oops! Page not found.</p>
            <Link
                to="/"
                className="mt-6 px-6 py-2 text-white bg-orange-400 rounded-lg shadow hover:bg-orange-500 transition-all"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
