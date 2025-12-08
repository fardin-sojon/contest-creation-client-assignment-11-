import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser, FaList, FaUsers, FaTrophy, FaPlusSquare, FaBars } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure"; 
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../hooks/useAdmin";
import useCreator from "../hooks/useCreator"; 

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
                    {/* Sidebar  */}
                    
                    {isAdmin && <>
                        <li><NavLink to="/dashboard/manageUsers"><FaUsers /> Manage Users</NavLink></li>
                        <li><NavLink to="/dashboard/manageContests"><FaList /> Manage Contests</NavLink></li>
                    </>}

                    {isCreator && <>
                        <li><NavLink to="/dashboard/addContest"><FaPlusSquare /> Add Contest</NavLink></li>
                        <li><NavLink to="/dashboard/myCreatedContests"><FaList /> My Created Contests</NavLink></li>
                    </>}

                    <li><NavLink to="/dashboard/profile"><FaUser /> My Profile</NavLink></li>

                    {(!isAdmin && !isCreator) && <>
                        <li><NavLink to="/dashboard/myParticipated"><FaList /> My Participated Contest</NavLink></li>
                        <li><NavLink to="/dashboard/myWinning"><FaTrophy /> My Winning Contest</NavLink></li>
                    </>}

                    <div className="divider"></div> 
                    <li><NavLink to="/"><FaHome /> Home</NavLink></li>
                    <li><button onClick={handleLogOut}>Logout</button></li>
                </ul>
            
            </div>
        </div>
    );
};

export default DashboardLayout;
