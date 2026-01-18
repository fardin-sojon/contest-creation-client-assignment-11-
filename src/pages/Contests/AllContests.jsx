import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ContestCard from "../../components/ContestCard";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { motion } from "framer-motion";

const AllContests = () => {
    const axiosPublic = useAxiosPublic();
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Read params from URL
    const category = searchParams.get('category') || '';
    const initialSearch = searchParams.get('search') || '';
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(initialSearch); // Local state for input
    const [sort, setSort] = useState(''); // Sort state
    const limit = 10;

    const { data = {}, isLoading } = useQuery({
        queryKey: ['all-contests', category, searchTerm, page, sort], // Add sort and searchTerm to key
        queryFn: async () => {
            let url = `/contests?page=${page}&limit=${limit}&status=approved`;
            if (category) url += `&type=${encodeURIComponent(category)}`;
            if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
            if (sort) url += `&sort=${encodeURIComponent(sort)}`; // Append sort param
            const response = await axiosPublic.get(url);
            return response.data; 
        }
    });

    const contests = data.result || [];
    const count = data.count || 0;
    const totalPages = Math.ceil(count / limit);

    const categories = ["Image Design", "Article Writing", "Marketing Strategy", "Digital Advertisement", "Gaming Review", "Book Review", "Business Idea", "Movie Review"];
    
    // Animation Variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    // Helper to update category
    const handleCategoryChange = (newCategory) => {
        setPage(1);
        const newParams = new URLSearchParams(searchParams);
        if (newCategory) {
            newParams.set('category', newCategory);
        } else {
            newParams.delete('category');
        }
        setSearchParams(newParams);
    };

    // Handle Search Submit
    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        // Trigger refetch by updating state which is in queryKey
    };

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-8">All Contests</h2>
            
            {/* Search and Filters Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="join w-full md:w-auto">
                    <input 
                        type="text" 
                        placeholder="Search contests..." 
                        className="input input-bordered join-item w-full md:w-64" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary join-item">Search</button>
                </form>

                {/* Sort Dropdown */}
                <select 
                    className="select select-bordered w-full md:w-auto"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="popular">Most Popular</option>
                </select>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                <button 
                    className={`btn btn-sm ${category === '' ? 'btn-primary' : 'btn-outline border-base-300'}`} 
                    onClick={() => handleCategoryChange('')}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-outline border-base-300'}`} 
                        onClick={() => handleCategoryChange(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <Loading />
                </div>
            ) : (
                <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {contests.length > 0 ? (
                        contests.map(contest => (
                            <motion.div key={contest._id} variants={item}>
                                <ContestCard contest={contest} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            <p className="text-xl">No contests found.</p>
                        </div>
                    )}
                </motion.div>
            )}


            <div className="flex justify-center mt-8">
                <div className="join">
                    <button className="join-item btn" onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}>«</button>
                    <button className="join-item btn">Page {page} of {totalPages || 1}</button>
                    <button className="join-item btn" onClick={() => setPage(old => Math.min(old + 1, totalPages))} disabled={page === totalPages}>»</button>
                </div>
            </div>
        </div>
    );
};

export default AllContests;
