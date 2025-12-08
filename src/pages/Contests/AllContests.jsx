import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ContestCard from "../../components/ContestCard";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";

const AllContests = () => {
    const axiosPublic = useAxiosPublic();
    const [searchParams] = useSearchParams();
    const initialSearch = searchParams.get('search') || '';
    const [tab, setTab] = useState(''); 
    const [page, setPage] = useState(1);
    const limit = 10;
    

    const { data = {}, isLoading } = useQuery({
        queryKey: ['all-contests', tab, initialSearch, page],
        queryFn: async () => {
            let url = `/contests?page=${page}&limit=${limit}&status=approved`;
            if (tab) url += `&type=${tab}`;
            if (initialSearch) url += `&search=${initialSearch}`;
            const response = await axiosPublic.get(url);
            return response.data; 
        }
    });

    const contests = data.result || [];
    const count = data.count || 0;
    const totalPages = Math.ceil(count / limit);

    const categories = ["Image Design", "Article Writing", "Marketing Strategy", "Digital Advertisement", "Gaming Review", "Book Review", "Business Idea", "Movie Review"];

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-8">All Contests</h2>
            

            <div className="tabs tabs-boxed justify-center mb-8 flex-wrap">
                <a className={`tab ${tab === '' ? 'tab-active' : ''}`} onClick={() => {setTab(''); setPage(1)}}>All</a>
                {categories.map(cat => (
                    <a key={cat} className={`tab ${tab === cat ? 'tab-active' : ''}`} onClick={() => {setTab(cat); setPage(1)}}>{cat}</a>
                ))}
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <Loading />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contests.map(contest => (
                        <ContestCard key={contest._id} contest={contest} />
                    ))}
                </div>
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
