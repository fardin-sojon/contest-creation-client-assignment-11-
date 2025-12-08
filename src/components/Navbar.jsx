import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import placeholderImg from "../assets/placeholder.png";
import logoImg from "../assets/logo.png";

const Navbar = () => {
    const { user, logOut } = useAuth();
    console.log(user);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "winter");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("winter");
        }
    };

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const links = [
        { path: '/', title: 'Home' },
        { path: '/all-contests', title: 'All Contests' },
        { path: '/leaderboard', title: 'Leaderboard' },
        { path: '/about', title: 'About Us' },
    ];

    const navOptions = links.map((link) => (
        <li key={link.path}>
            <NavLink
                to={link.path}
                className={({ isActive }) =>
                    isActive
                        ? "text-primary border-b-2 border-primary font-bold rounded-none bg-transparent"
                        : "hover:text-primary hover:border-b-2 hover:border-primary transition-all rounded-none bg-transparent"
                }
            >
                {link.title}
            </NavLink>
        </li>
    ));

    return (
        <div className=" bg-base-100 shadow-sm sticky top-0 z-50">
            <div className="navbar container mx-auto">
                            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="font-bold  text-xl flex items-center gap-2">
                    <img src={logoImg} alt="Logo" className="w-8 h-8 rounded-full" />
                    ContestHub
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <label className="toggle text-base-content">
                    <input type="checkbox" onChange={handleToggle} checked={theme === "dark"} className="theme-controller" />
                    <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
                    <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
                </label>
                {
                    user ? <>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="User" src={user?.photoURL || placeholderImg} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <span className="font-bold">{user?.displayName}</span>
                                </li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><button onClick={handleLogOut}>Logout</button></li>
                            </ul>
                        </div>
                    </> : <>
                        <Link to="/login" className="btn bg-blue-600 hover:bg-blue-700 text-white border-none btn-sm">Login</Link>
                    </>
                }
            </div>
            </div>
        </div>
    );
};

export default Navbar;
