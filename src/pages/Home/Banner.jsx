import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

import bannerImg from "../../assets/banner.png";

const Banner = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/all-contests?search=${search}`);
    }

    return (
        <div className="hero min-h-[500px]" style={{ backgroundImage: `url(${bannerImg})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <motion.h1 
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-5 text-5xl font-bold"
                    >
                        Showcase Your Talent
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="mb-5"
                    >
                        Participate in global contests (Design, Writing, Gaming) & Win Big!
                    </motion.p>
                    <motion.form 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        onSubmit={handleSearch} 
                        className="join"
                    >
                        <input 
                            className="input input-bordered join-item text-black" 
                            placeholder="Search by tag..." 
                            name="search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-primary join-item">Search</button>
                    </motion.form>
                </div>
            </div>
        </div>
    );
};

export default Banner;
