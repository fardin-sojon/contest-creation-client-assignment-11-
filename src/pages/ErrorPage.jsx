import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
            <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-600 mb-8 w-2/3">
                <i>{error?.statusText || error?.message || "Unknown Error"}</i>
            </p>
            <img src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg" alt="Error" className="max-w-md rounded-xl shadow-lg mb-8" />
            <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
    );
};

export default ErrorPage;
