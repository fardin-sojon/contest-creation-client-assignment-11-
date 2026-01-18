import { motion } from "framer-motion";

const blogs = [
    {
        id: 1,
        title: "Top 10 Tips for Winning Design Contests",
        date: "Oct 15, 2023",
        image: "https://i.pravatar.cc/300?u=blog1",
        excerpt: "Winning a design contest requires more than just creativity. Learn the strategies that top designers use to stand out."
    },
    {
        id: 2,
        title: "How to Host a Successful Contest",
        date: "Nov 02, 2023",
        image: "https://i.pravatar.cc/300?u=blog2",
        excerpt: "Planning to host a contest? Follow this guide to ensure maximum participation and high-quality submissions."
    },
    {
        id: 3,
        title: "The Future of Digital Competitions",
        date: "Dec 10, 2023",
        image: "https://i.pravatar.cc/300?u=blog3",
        excerpt: "Explore how AI and blockchain are transforming the landscape of online competitions and rewards."
    }
];

const Blog = () => {
    return (
        <div className="py-16 bg-base-100">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">Latest News & Articles</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <motion.div 
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card bg-base-100 shadow-xl border border-base-200"
                        >
                            <figure>
                                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                            </figure>
                            <div className="card-body">
                                <span className="text-xs text-primary font-bold">{blog.date}</span>
                                <h3 className="card-title hover:text-primary cursor-pointer transition-colors">{blog.title}</h3>
                                <p className="text-gray-500 text-sm">{blog.excerpt}</p>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-outline btn-sm">Read More</button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
