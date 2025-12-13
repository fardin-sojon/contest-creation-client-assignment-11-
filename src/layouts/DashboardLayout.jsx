import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser, FaList, FaUsers, FaTrophy, FaPlusSquare, FaBars } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure"; 
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../hooks/useAdmin";
import useCreator from "../hooks/useCreator"; 
import logoImg from "../assets/logo.png"; 

const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [isAdmin] = useAdmin();
    const [isCreator] = useCreator();
    
    const isUser = !isAdmin && !isCreator;

    const handleLogOut = () => {
        logOut().then(() => navigate('/'));
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col p-8">
                {/* Page */}
                <label htmlFor="my-drawer-2" className="btn btn-circle btn-ghost shadow-md border border-base-300 text-primary drawer-button lg:hidden mb-4 self-end">
                    <FaBars size={24} />
                </label>
                <div className="w-full h-full">
                    {location.pathname === '/dashboard' ? (
                        <div className="text-center mt-20">
                            <h2 className="text-3xl font-bold">Welcome to Dashboard, {user?.displayName}</h2>
                            <p className="mt-4">Select an option from the sidebar to get started.</p>
                            <Link to="/dashboard/profile" className="btn btn-primary mt-6">Go to Profile</Link>
                        </div>
                    ) : (
                         <Outlet />
                    )}
                </div>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar Header */}
                    <Link to="/" className="mb-6 px-4 flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <img src={logoImg} alt="Logo" className="w-8 h-8 rounded-full" />
                        <span className="font-bold text-xl">ContestHub</span>
                    </Link>

                    {/* Sidebar Menus */}
                    {isAdmin && (
                        <>
                            <div className="text-xs uppercase font-bold text-gray-500 mb-2 px-4">Admin Dashboard</div>
                            <li><NavLink to="/dashboard/manageUsers" className={({ isActive }) => isActive ? "active font-bold text-primary" : "" }><FaUsers /> Manage Users</NavLink></li>
                            <li><NavLink to="/dashboard/manageContests" className={({ isActive }) => isActive ? "active font-bold text-primary" : "" }><FaList /> Manage Contests</NavLink></li>
                            <li><NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "active font-bold text-primary" : "" }><FaUser /> My Profile</NavLink></li>
                        </>
                    )}

                    {isCreator && (
                        <>
                            <div className="text-xs uppercase font-bold text-gray-500 mb-2 px-4">Creator Dashboard</div>
                            <li><NavLink to="/dashboard/addContest" className={({ isActive }) => isActive ? "active font-bold text-primary" : "" }><FaPlusSquare /> Add Contest</NavLink></li>
                            <li><NavLink to="/dashboard/myCreatedContests" className={({ isActive }) => isActive ? "active font-bold text-primary" : "" }><FaList /> My Created Contests</NavLink></li>
                            <li><NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "active font-bold text-primary" : "" }><FaUser /> My Profile</NavLink></li>
                        </>
                    )}

                    {(!isAdmin && !isCreator) && (
                        <>
                            <div className="text-xs uppercase font-bold text-gray-500 mb-2 px-4">User Dashboard</div>
                            <li><NavLink to="/dashboard/myParticipated" className={({ isActive }) => isActive ? "active font-bold text-primary" : "" }><FaList /> Participated Contests</NavLink></li>
                            <li><NavLink to="/dashboard/myWinning" className={({ isActive }) => isActive ? "active font-bold text-primary" : "" }><FaTrophy /> Winning Contests</NavLink></li>
                            <li><NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "active font-bold text-primary" : "" }><FaUser /> My Profile</NavLink></li>
                        </>
                    )}

                    <div className="divider"></div> 
                    <li><NavLink to="/"><FaHome /> Home</NavLink></li>
                    <li><button onClick={handleLogOut}>Logout</button></li>
                </ul>
            
            </div>
        </div>
    );
};

export default DashboardLayout;
