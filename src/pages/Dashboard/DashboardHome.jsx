import useAdmin from "../../hooks/useAdmin";
import useCreator from "../../hooks/useCreator";
import useAuth from "../../hooks/useAuth";
import AdminStats from "./Admin/AdminStats";
import CreatorStats from "./Creator/CreatorStats";
import UserStats from "./User/UserStats";
import { div } from "framer-motion/client";

const DashboardHome = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isCreator] = useCreator();

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">Welcome Back, {user?.displayName}!</h2>
            
            {isAdmin && <AdminStats />}
            {isCreator && <CreatorStats />}
            {!isAdmin && !isCreator && <UserStats />}
        </div>
    );
};

export default DashboardHome;
