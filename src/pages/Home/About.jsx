import { FaRocket, FaUsers, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="bg-base-100 py-15">
            {/* Hero Section */}
            <div className="hero ">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <motion.h1 
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl font-bold"
                        >
                            About ContestHub
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="py-6 text-lg"
                        >
                            Empowering creative minds to showcase their talents, compete with global participants, and win exciting rewards.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-10 px-6 max-w-6xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, staggerChildren: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-10"
                >

                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="card bg-base-100 shadow-xl border border-base-200 transition-all"
                    >
                        <figure className="px-10 pt-10 text-primary">
                            <FaRocket className="text-6xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl">Participate</h2>
                            <p>Browse through diverse categories ranging from coding, design, to gaming. Find your niche and jump right in!</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="card bg-base-100 shadow-xl border border-base-200 transition-all"
                    >
                        <figure className="px-10 pt-10 text-secondary">
                            <FaUsers className="text-6xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl">Compete</h2>
                            <p>Challenge yourself against the best talent out there. Push your limits and prove your skills in fair competitions.</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="card bg-base-100 shadow-xl border border-base-200 transition-all"
                    >
                        <figure className="px-10 pt-10 text-accent">
                            <FaTrophy className="text-6xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl">Win & Earn</h2>
                            <p>Get recognized for your hard work. Win cash prizes, exclusive rewards, and a spot on our prestigious leaderboard.</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Stats / Trust Section */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-primary text-primary-content py-12"
            >
                <div className="flex flex-col md:flex-row justify-around items-center gap-8 max-w-6xl mx-auto text-center">
                    <div>
                        <div className="text-4xl font-bold">100+</div>
                        <div className="text-lg opacity-80">Active Contests</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold">500+</div>
                        <div className="text-lg opacity-80">Happy Winners</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold">Secure</div>
                        <div className="text-lg opacity-80">Stripe Payments</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default About;
