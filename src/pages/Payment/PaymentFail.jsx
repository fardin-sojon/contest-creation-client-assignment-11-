import { Link } from "react-router-dom";

const PaymentFail = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center p-4">
            <div className="max-w-md bg-base-100 p-8 rounded-xl shadow-2xl">
                <h1 className="text-5xl font-bold text-error mb-4">Payment Failed!</h1>
                <p className="py-6 text-lg">Unfortunately, your payment could not be processed. Please try again or contact support if the issue persists.</p>
                <div className="flex justify-center gap-4">
                    <Link to="/" className="btn btn-primary">Go Home</Link>
                    <Link to="/all-contests" className="btn btn-outline">Try Again</Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentFail;
