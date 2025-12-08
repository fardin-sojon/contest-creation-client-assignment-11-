import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ContestCard from "../../components/ContestCard";

const PopularContests = () => {
    const axiosPublic = useAxiosPublic();
    
    const { data: contests = [] } = useQuery({
        queryKey: ['popular-contests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/contests/popular');
            return res.data;
        }
    });

    return (
        <div className="py-12 px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Contests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contests.slice(0, 6).map(contest => (
                    <ContestCard key={contest._id} contest={contest} />
                ))}
            </div>
        </div>
    );
};

export default PopularContests;
