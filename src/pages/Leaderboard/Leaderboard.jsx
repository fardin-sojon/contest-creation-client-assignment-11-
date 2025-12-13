import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaTrophy, FaCrown } from "react-icons/fa";
import { motion } from "framer-motion";

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
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-center mb-12"
            >
                Leaderboard
            </motion.h2>
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
                            <motion.tr 
                                key={leader._id} 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.05)" }}
                                className={`transition-colors ${index < 3 ? "bg-base-200 font-bold" : ""}`}
                            >
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
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;