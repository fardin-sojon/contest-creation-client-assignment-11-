import { motion } from "framer-motion";

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Graphic Designer",
        image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        text: "ContestHub turned my hobby into a career. The contests are well-managed and the prizes are real!"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Content Writer",
        image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        text: "I love the variety of challenges available. It keeps my skills sharp and the community is very supportive."
    },
    {
        id: 3,
        name: "Emily Davis",
        role: "Marketing Specialist",
        image: "https://i.pravatar.cc/150?u=a042581f4e29026703d",
        text: "As a contest creator, this platform makes it incredibly easy to find talent. Highly recommended!"
    }
];

const Testimonials = () => {
    return (
        <div className="py-16 bg-base-200">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={testimonial.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="card bg-base-100 shadow-lg"
                        >
                            <div className="card-body">
                                <div className="flex items-center gap-4 mb-4">
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name} 
                                        className="w-12 h-12 rounded-full ring-2 ring-primary ring-offset-2"
                                    />
                                    <div>
                                        <h4 className="font-bold">{testimonial.name}</h4>
                                        <span className="text-xs text-secondary">{testimonial.role}</span>
                                    </div>
                                </div>
                                <p className="italic text-gray-600">"{testimonial.text}"</p>
                                <div className="card-actions justify-end mt-4">
                                    <div className="rating rating-sm">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <input key={star} type="radio" name={`rating-${testimonial.id}`} className="mask mask-star-2 bg-orange-400" checked readOnly />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
