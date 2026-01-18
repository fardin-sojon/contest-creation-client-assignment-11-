import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
    return (
        <div className="py-16 bg-base-100">
            <div className="container mx-auto px-4">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-center mb-12"
                >
                    Get in Touch
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                     >
                        <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                        <p className="mb-8 text-gray-600">
                            Have questions or need assistance? We're here to help! Reach out to us through any of the channels below.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-4 rounded-full text-primary">
                                    <FaMapMarkerAlt size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Address</h4>
                                    <p className="text-gray-500">123 Creative Avenue, Design City, NY 10012</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-4 rounded-full text-primary">
                                    <FaPhone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Phone</h4>
                                    <p className="text-gray-500">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-4 rounded-full text-primary">
                                    <FaEnvelope size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Email</h4>
                                    <p className="text-gray-500">support@contesthub.com</p>
                                </div>
                            </div>
                        </div>
                     </motion.div>

                     <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-base-200 p-8 rounded-2xl shadow-lg"
                     >
                        <form className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Your Name" className="input input-bordered w-full" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="Your Email" className="input input-bordered w-full" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea className="textarea textarea-bordered h-32" placeholder="Your Message" required></textarea>
                            </div>
                            <button className="btn btn-primary w-full mt-4">Send Message</button>
                        </form>
                     </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
