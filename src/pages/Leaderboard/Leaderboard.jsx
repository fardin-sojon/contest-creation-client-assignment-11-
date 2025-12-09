import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaTrophy, FaCrown } from "react-icons/fa";

import placeholderImg from "../../assets/placeholder.png";

const Leaderboard = () => {
    const axiosPublic = useAxiosPublic();
    const { data: leaders = [], isLoading } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const res = await axiosPublic.get('/leaderboard');
            return res.data;
        }
    });

    return (
        <div className="p-8">
            <h2 className="text-4xl font-bold text-center mb-12">Leaderboard</h2>
            <div className="max-w-4xl mx-auto overflow-x-auto">
                <table className="table table-lg">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Participant</th>
                            <th>Wins</th>
                            <th>Medal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaders.map((leader, index) => (
                            <tr key={leader._id} className={index < 3 ? "bg-base-200 font-bold" : ""}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-6">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={leader.image || placeholderImg} alt={leader.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{leader.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{leader.winCount}</td>
                                <td>
                                    {index === 0 && <FaTrophy className="text-yellow-400 text-3xl drop-shadow-md" />}
                                    {index === 1 && <FaTrophy className="text-slate-400 text-3xl drop-shadow-md" />}
                                    {index === 2 && <FaTrophy className="text-amber-600 text-3xl drop-shadow-md" />}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;