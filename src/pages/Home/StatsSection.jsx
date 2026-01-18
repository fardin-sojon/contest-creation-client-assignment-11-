import { motion } from "framer-motion";

const StatsSection = () => {
    return (
        <div className="py-16 bg-gradient-to-r from-primary to-secondary text-primary-content">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="p-6 bg-white/10 rounded-xl backdrop-blur-md"
                    >
                        <div className="text-4xl font-bold mb-2">500+</div>
                        <div className="text-lg opacity-90">Active Contests</div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="p-6 bg-white/10 rounded-xl backdrop-blur-md"
                    >
                        <div className="text-4xl font-bold mb-2">10k+</div>
                        <div className="text-lg opacity-90">Creative Participants</div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="p-6 bg-white/10 rounded-xl backdrop-blur-md"
                    >
                        <div className="text-4xl font-bold mb-2">$50k+</div>
                        <div className="text-lg opacity-90">Prize Money Distributed</div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default StatsSection;
