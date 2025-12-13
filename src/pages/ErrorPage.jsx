import { Link, useRouteError } from "react-router-dom";
import { motion } from "framer-motion";
import errorImg from "../assets/404.png";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img src={errorImg} alt="404 Error" className="max-w-md w-full rounded-xl shadow-2xl mb-8" />
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <h1 className="text-6xl font-bold text-error mb-4">Oops!</h1>
                <p className="text-2xl font-semibold mb-2">Something went wrong.</p>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    <i>{error?.statusText || error?.message || "Unknown Error"}</i>
                </p>
                <Link to="/">
                    <button className="btn btn-primary btn-wide animate-bounce">Go Back Home</button>
                </Link>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
