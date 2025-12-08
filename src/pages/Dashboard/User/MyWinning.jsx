import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyWinning = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: wonContests = [] } = useQuery({
        queryKey: ['won-contests', user?.email],
        queryFn: async () => {

             const res = await axiosSecure.get(`/contests/won/${user.email}`);
             return res.data;
        }
    });

    return (
        <div>
           <h2 className="text-3xl font-bold mb-8 text-yellow-600">My Winning Contests</h2>
           {wonContests.length === 0 ? <p>You haven't won any contests yet. Keep participating!</p> : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {wonContests.map(contest => (
                       <div key={contest._id} className="card bg-base-100 shadow-xl border-l-4 border-yellow-500">
                           <div className="card-body">
                               <h2 className="card-title">{contest.name}</h2>
                               <p className="font-bold text-accent">Prize: {contest.prize}</p>
                               <p>Contest Type: {contest.type}</p>
                           </div>
                       </div>
                   ))}
               </div>
           )}
        </div>
    );
};

export default MyWinning;
