import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ContestSubmissions = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: contest = {} } = useQuery({
        queryKey: ['contest', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        }
    });

    const { data: submissions = [], refetch } = useQuery({
        queryKey: ['submissions', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/contest/${id}`);
            return res.data;
        }
    });

    const handleDeclareWinner = (submission) => {
        if (!submission.userId) {
             Swal.fire("Error", "Submission missing User ID. Cannot declare winner.", "error");
             return;
        }

        axiosSecure.patch(`/contests/winner/${id}`, { winnerId: submission.userId })
             .then(res => {
                if(res.data.modifiedCount > 0){
                    refetch();
                    
                    Swal.fire("Success", "Winner Declared!", "success")
                        .then(() => window.location.reload()); 
                }
             })
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Submissions for: {contest.name}</h2>
             {contest.winner && <div className="alert alert-success mb-6">Winner Declared! (ID: {contest.winner._id || contest.winner})</div>}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {submissions.map(sub => (
                     <div key={sub._id} className="card bg-base-100 shadow-xl">
                         <div className="card-body">
                             <h2 className="card-title">{sub.participantName}</h2>
                             <p>{sub.participantEmail}</p>
                             <a href={sub.taskUrl} target="_blank" className="link link-primary">View Submission</a>
                             <div className="card-actions justify-end">
                                 <button 
                                    onClick={() => handleDeclareWinner(sub)} 
                                    className="btn btn-primary btn-sm"
                                    disabled={!!contest.winner}
                                 >
                                    {contest.winner ? "Winner Declared" : "Declare Winner"}
                                 </button>
                             </div>
                         </div>
                     </div>
                 ))}
                 {submissions.length === 0 && <p>No submissions yet.</p>}
             </div>
        </div>
    );
};

export default ContestSubmissions;
