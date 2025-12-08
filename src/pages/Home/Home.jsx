import Banner from "./Banner";
import PopularContests from "./PopularContests";
import { motion } from "framer-motion";
import WinnerAdvert from "./WinnerAdvert";
import HowItWorks from "./HowItWorks";
import Newsletter from "./Newsletter";

const Home = () => {
    return (
        <div className="space-y-12 overflow-x-hidden">
            <Banner />
            
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
            >
                <PopularContests />
            </motion.div>

            {/* Winner Section */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <WinnerAdvert />
            </motion.div>

             {/* How It Works Section */}
             <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
             >
                <HowItWorks />
             </motion.div>

             {/* Newsletter Section */}
             <motion.div>
                <Newsletter />
             </motion.div>
        </div>
    );
};

export default Home;
