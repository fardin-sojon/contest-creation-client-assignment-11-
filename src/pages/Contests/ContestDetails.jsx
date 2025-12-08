import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const ContestDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();
    const [timeLeft, setTimeLeft] = useState('');


    const userEmail = user?.email || user?.providerData?.[0]?.email;
    
    const { data: contest = {}, isLoading } = useQuery({
        queryKey: ['contest', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        }
    });


    const { data: dbUser, isLoading: isUserLoading } = useQuery({
        queryKey: ['user-db', userEmail],
        enabled: !!userEmail,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${userEmail}`);
            return res.data;
        }
    });


    const deadline = contest?.deadline;

    useEffect(() => {
        if (!deadline) return;
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(deadline).getTime() - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft("EXPIRED");
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [deadline]);

    if (isLoading || isUserLoading || authLoading) return <Loading />;


    if (!contest) {
        return <div className="text-center text-2xl text-red-500 mt-20">Contest not found!</div>;
    }

    const { name, image, description, price, prize, taskInstruction, participationCount, winner } = contest || {};

    const handleSubmitTask = async (e) => {
        e.preventDefault(); 
        
        const { value: url } = await Swal.fire({
            title: 'Submit Task',
            input: 'url',
            inputLabel: 'Task URL',
            inputPlaceholder: 'Enter your task URL'
        })

        if (url) {
            if(!dbUser?._id){
                return Swal.fire('Error', 'User data not loaded yet. Please wait a moment and try again.', 'error');
            }

            const submission = {
                contestId: id,
                userId: dbUser?._id, 
                participantEmail: user.email,
                participantName: user.displayName,
                taskUrl: url
            }
            axiosSecure.post('/submissions', submission)
                .then(res => {
                    if(res.data._id){
                         Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Task Submitted Successfully!',
                            showConfirmButton: false,
                            timer: 1500,
                            toast: true
                         });
                    }
                })
                .catch(error => {
                    console.error("Submission Error:", error);

                    Swal.fire('Error', 'Failed to submit task. Please try again.', 'error');
                })
        }
    }

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure className="w-full h-[500px] lg:w-1/2"><img src={image} alt={name} className="w-full h-full object-cover" /></figure>
                <div className="card-body lg:w-1/2">
                    <h2 className="card-title text-3xl">{name}</h2>
                    <p className="font-bold text-xl">Prize: {prize}$</p>
                    <p className="text-gray-600">{description}</p>
                    <p>Task: {taskInstruction}</p>
                    
                    <div className="flex gap-4 my-4">
                        <div className="badge badge-accent p-4">Participants: {participationCount}</div>
                        <div className="badge badge-primary p-4">Entry Fee: ${price}</div>
                    </div>
                    
                    <div className="stat-value text-secondary text-2xl my-4">
                        {timeLeft === "EXPIRED" ? "Contest Ended" : `Time Left: ${timeLeft}`}
                    </div>

                    {timeLeft !== "EXPIRED" ? (
                        <div className="card-actions justify-end flex-col items-end">
                             <Link to={`/payment/${id}`} className="btn btn-primary btn-lg w-full mb-2">Register Now</Link>
                            
                             <button onClick={handleSubmitTask} className="btn btn-secondary btn-outline w-full">Submit Task</button>
                        </div>
                    ) : (
                        <div className="alert alert-warning">Registration Closed</div>
                    )}
                    
                    {winner && (
                         <div className="alert alert-success mt-4">
                            <div className="flex items-center gap-4">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={winner.photo || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                                    </div>
                                </div>
                                <span>Winner: {winner.name}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;
