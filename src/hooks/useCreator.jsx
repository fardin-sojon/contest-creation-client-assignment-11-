import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCreator = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isCreator = false, isPending: isCreatorLoading } = useQuery({
        queryKey: [user?.email, 'isCreator'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data?.role === 'creator';
        }
    })
    return [isCreator, isCreatorLoading]
};

export default useCreator;
