
import { motion } from "framer-motion";
import { FaPencilAlt, FaVoteYea, FaGift } from "react-icons/fa";
import { Link } from "react-router-dom";

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaPencilAlt className="text-4xl text-blue-500" />,
            title: "1. Join Contest",
            description: "Browse through hundreds of active contests and find the one that sparks your creativity."
        },
        {
            icon: <FaVoteYea className="text-4xl text-purple-500" />,
            title: "2. Submit Work",
            description: "Upload your masterpiece. Whether it's design, writing, or strategy, let your work speak for itself."
        },
        {
            icon: <FaGift className="text-4xl text-pink-500" />,
            title: "3. Win Prizes",
            description: "Top creators are selected by fair judging. Win cash prizes and earn recognition in the community."
        }
    ];

    return (
        <section className="py-10 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">How ContestHub Works</h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Your journey from participant to winner is simple and transparent. Here is how you can get started.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition duration-300"
                        >
                            <div className="card-body items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-base-100 flex items-center justify-center mb-4">
                                    {step.icon}
                                </div>
                                <h3 className="card-title text-2xl mb-2">{step.title}</h3>
                                <p className="text-base-content/70">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 bg-base-100 shadow-xl border border-base-200 rounded-2xl p-12 text-center">
                    <h3 className="text-3xl font-bold mb-4">Ready to showcase your talent?</h3>
                    <p className="mb-8 text-lg opacity-90">Don't wait! Join a contest today and start your winning streak.</p>
                    <Link to="/all-contests">
                        <button className="btn bg-blue-600 hover:bg-blue-700 text-white border-none btn-lg">Explore Contests</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
