import { FaTrophy, FaUserShield, FaBolt, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
    {
        icon: <FaTrophy className="text-4xl text-yellow-500" />,
        title: "Exciting Rewards",
        description: "Win amazing cash prizes and recognition for your creative skills."
    },
    {
        icon: <FaUserShield className="text-4xl text-blue-500" />,
        title: "Secure Platform",
        description: "Your data and submissions are protected with top-tier security measures."
    },
    {
        icon: <FaBolt className="text-4xl text-orange-500" />,
        title: "Fast Results",
        description: "Get quick feedback and results from contest organizers."
    },
    {
        icon: <FaGlobe className="text-4xl text-green-500" />,
        title: "Global Reach",
        description: "Compete with talented individuals from all around the world."
    }
];

const FeatureSection = () => {
    return (
        <div className="py-16 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why Choose ContestHub?</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        We provide the best platform for creators and participants to connect, compete, and grow.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-base-200"
                        >
                            <div className="card-body items-center text-center">
                                <div className="mb-4 p-4 bg-base-200 rounded-full">
                                    {feature.icon}
                                </div>
                                <h3 className="card-title mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-500">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeatureSection;
