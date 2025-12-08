import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (sessionId) {
            axiosSecure.post('/confirm-payment', { session_id: sessionId })
                .then(res => {
                    if (res.data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Payment Successful!",
                            text: "You have successfully registered for the contest.",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Confirmation Error", err);
                    setLoading(false);
                });
        }
    }, [sessionId, axiosSecure]);

    if (loading) return <Loading />;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h2>
            <p className="text-lg text-gray-600 mb-8">Thank you for your participation.</p>
            <button 
                onClick={() => navigate('/dashboard/myParticipated')} 
                className="btn btn-primary"
            >
                Go to My Contests
            </button>
        </div>
    );
};

export default PaymentSuccess;
