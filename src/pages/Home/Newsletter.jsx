import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Newsletter = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        if (email) {
            Swal.fire({
                title: 'Subscribed!',
                text: 'Thank you for subscribing to our newsletter.',
                icon: 'success',
                confirmButtonText: 'Great!'
            });
            e.target.reset();
        }
    };

    return (
        <div className="pb-10 px-4">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-2xl"
            >
                {/* Decorative Circles */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-800/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Stay in the Loop!
                    </h2>
                    <p className="text-blue-50 text-lg mb-8 max-w-2xl mx-auto">
                        Subscribe to our newsletter to get latest updates on new contests, winner announcements, and exclusive tips to win big.
                    </p>

                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter your email address" 
                            className="input input-bordered w-full sm:w-auto flex-grow px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white text-gray-900 placeholder-gray-500"
                            required
                        />
                        <button 
                            type="submit" 
                            className="btn bg-white text-blue-600 hover:bg-gray-100 border-none rounded-full px-8 text-lg font-bold shadow-lg transform hover:-translate-y-1 transition duration-300"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Newsletter;
