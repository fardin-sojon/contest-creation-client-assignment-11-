import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

const WinnerSection = () => {
    const axiosPublic = useAxiosPublic();

    const { data: winners = [] } = useQuery({
        queryKey: ['home-winners'],
        queryFn: async () => {
            const res = await axiosPublic.get('/leaderboard');
            return res.data.slice(0, 3);
        }
    });

    if (winners.length === 0) return null;

    return (
        <div className="py-8 md:py-16 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-3xl my-12 px-4">
            <div className="text-center mb-10">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600"
                >
                    Hall of Fame
                </motion.h2>
                <p className="text-gray-500 mt-2">Meet our top champions who dominated the contests!</p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
                {winners.map((winner, index) => (
                    <motion.div 
                        key={winner._id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ y: -10 }}
                        className="card w-full max-w-xs md:w-80 bg-base-100 shadow-2xl border border-blue-100"
                    >
                        <div className="card-body items-center text-center">
                            <div className="relative">
                                <div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={winner.image} alt={winner.name} />
                                    </div>
                                </div>
                                <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-2 rounded-full shadow-lg">
                                    <FaTrophy />
                                </div>
                            </div>
                            <h3 className="card-title text-2xl mt-4">{winner.name}</h3>
                            <div className="badge badge-primary badge-outline mt-2">{winner.winCount} Wins</div>
                            <p className="mt-2 text-sm text-gray-500">
                                Total Prize Won: <span className="text-success font-bold">${winner.winCount * 100}+</span>
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default WinnerSection;
