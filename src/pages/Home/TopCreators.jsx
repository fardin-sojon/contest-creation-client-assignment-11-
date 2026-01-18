import { motion } from "framer-motion";

const creators = [
    {
        name: "Alex Design",
        contestCount: 45,
        image: "https://i.pravatar.cc/150?u=admin1"
    },
    {
        name: "Pixel Studio",
        contestCount: 38,
        image: "https://i.pravatar.cc/150?u=admin2"
    },
    {
        name: "Creative Minds",
        contestCount: 32,
        image: "https://i.pravatar.cc/150?u=admin3"
    },
    {
        name: "WritePro",
        contestCount: 29,
        image: "https://i.pravatar.cc/150?u=admin4"
    }
];

const TopCreators = () => {
    return (
        <div className="py-16 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold">Top Contest Creators</h2>
                    <button className="btn btn-outline btn-primary mt-4 md:mt-0">View All Creators</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {creators.map((creator, index) => (
                        <motion.div 
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="card bg-base-100 border border-base-200 hover:shadow-xl transition-all"
                        >
                            <figure className="px-10 pt-10">
                                <img src={creator.image} alt={creator.name} className="rounded-full w-24 h-24 object-cover ring ring-primary ring-offset-base-100 ring-offset-2" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{creator.name}</h2>
                                <p className="text-secondary">{creator.contestCount} Contests Hosted</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopCreators;
