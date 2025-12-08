import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { motion } from "framer-motion";
import { FaTrophy, FaCrown } from "react-icons/fa";

const WinnerAdvert = () => {
    const axiosPublic = useAxiosPublic();
    const { data: leaders = [] } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const res = await axiosPublic.get('/leaderboard');
            return res.data;
        }
    });

    const topWinners = leaders.slice(0, 3);

    return (
        <section className="p-10 md:py-10 text-base-content relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-10">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold mb-6"
                    >
                        Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Fame</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-base-content/70 max-w-2xl mx-auto"
                    >
                        Join the ranks of our top creators. Your talent deserves to be rewarded with exciting prizes and recognition.
                    </motion.p>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-end gap-8">
                    {/* 2nd Place */}
                    {topWinners[1] && (
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-base-200 backdrop-blur-lg rounded-2xl p-6 text-center border border-base-300 transform hover:-translate-y-2 transition duration-300 w-full md:w-80"
                        >
                            <div className="relative inline-block">
                                <img src={topWinners[1].image} alt={topWinners[1].name} className="w-24 h-24 rounded-full border-4 border-gray-300 mx-auto mb-4 object-cover" />
                                <div className="absolute -bottom-2 -right-2 bg-gray-300 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                            </div>
                            <h3 className="text-xl font-bold mb-1">{topWinners[1].name}</h3>
                            <p className="text-yellow-600 font-semibold mb-2"><FaTrophy className="inline mr-1" /> {topWinners[1].winCount} Wins</p>
                        </motion.div>
                    )}

                    {/* 1st Place */}
                    {topWinners[0] && (
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-b from-yellow-500/20 to-yellow-600/10 backdrop-blur-lg rounded-2xl p-8 text-center border-2 border-yellow-400 transform scale-110 z-10 shadow-2xl shadow-yellow-500/20 w-full md:w-96 order-first md:order-none"
                        >
                            <div className="relative inline-block">
                                <FaCrown className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-5xl text-yellow-400 drop-shadow-lg" />
                                <img src={topWinners[0].image} alt={topWinners[0].name} className="w-32 h-32 rounded-full border-4 border-yellow-400 mx-auto mb-4 object-cover" />
                                <div className="absolute -bottom-3 -right-0 bg-yellow-400 text-yellow-900 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">1</div>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">{topWinners[0].name}</h3>
                            <p className="text-yellow-600 font-bold text-lg mb-2"><FaTrophy className="inline mr-1" /> {topWinners[0].winCount} Wins</p>
                            <div className="badge badge-warning gap-2 p-3 mt-2">
                                Top Creator
                            </div>
                        </motion.div>
                    )}

                    {/* 3rd Place */}
                    {topWinners[2] && (
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-base-200 backdrop-blur-lg rounded-2xl p-6 text-center border border-base-300 transform hover:-translate-y-2 transition duration-300 w-full md:w-80"
                        >
                            <div className="relative inline-block">
                                <img src={topWinners[2].image} alt={topWinners[2].name} className="w-24 h-24 rounded-full border-4 border-orange-700 mx-auto mb-4 object-cover" />
                                <div className="absolute -bottom-2 -right-2 bg-orange-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                            </div>
                            <h3 className="text-xl font-bold mb-1">{topWinners[2].name}</h3>
                            <p className="text-yellow-600 font-semibold mb-2"><FaTrophy className="inline mr-1" /> {topWinners[2].winCount} Wins</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default WinnerAdvert;
