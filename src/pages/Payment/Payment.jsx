import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const Payment = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: contest = {}, isLoading } = useQuery({
        queryKey: ['contest-payment', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        }
    });

    const { price, name, _id } = contest;

    const handlePay = async () => {
        try {
            const res = await axiosSecure.post('/create-checkout-session', {
                contestId: _id,
                contestName: name,
                amount: price,
                userEmail: user?.email,
                userName: user?.displayName
            });
            
            if (res.data.url) {

                Swal.fire({
                    icon: 'success',
                    title: 'Redirecting to Stripe...',
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    window.location.href = res.data.url;
                }, 1000);
            }
        } catch (error) {
            console.error("Payment Error:", error);
            Swal.fire({
                icon: "error",
                title: "Payment Failed",
                text: error.response?.status === 404 
                    ? "Server Endpoint Not Found (Did you restart server?)" 
                    : error.message || "Something went wrong"
            });
        }
    }

    if(isLoading) return <Loading />

    return (
        <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-3xl font-bold text-center mb-8">Payment for: {name}</h2>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    <p className="text-lg">Registration Fee</p>
                    <h2 className="card-title text-4xl font-bold text-primary">${price}</h2>
                    <div className="card-actions justify-end mt-6">
                        <button onClick={handlePay} className="btn btn-primary btn-wide text-lg">
                            Pay with Stripe
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">You will be redirected to Stripe to complete payment.</p>
                </div>
            </div>
        </div>
    );
};

export default Payment;
