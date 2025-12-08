import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
                    <h1 className="mb-5 text-5xl font-bold">Showcase Your Talent</h1>
                    <p className="mb-5">Participate in global contests (Design, Writing, Gaming) & Win Big!</p>
                    <form onSubmit={handleSearch} className="join">
                        <input 
                            className="input input-bordered join-item text-black" 
                            placeholder="Search by tag..." 
                            name="search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-primary join-item">Search</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Banner;
