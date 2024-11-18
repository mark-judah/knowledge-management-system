import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";
import companyIcon from "../assets/company.svg"
import settingsIcon from "../assets/settings.svg"
import profileIcon from "../assets/profile.svg"
import logoutIcon from "../assets/logout.svg"
import departmentIcon from "../assets/department.svg"
import articlesIcon from "../assets/articles.svg"
import helpdeskIcon from "../assets/helpdesk.svg"
import faqIcon from "../assets/faq.svg"
import logoIcon from "../assets/logo.svg"
import inductionIcon from "../assets/induction.svg"


const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(token)
        if (token === null) {
            setLoggedIn(false)
        } else {
            setLoggedIn(true)
        }
    }, [navigate]);

    const fullNavbar = [
        '/'
    ]

    const toggleDropdown = () => {
        console.log("menuOpen")
        if (menuOpen) {
            setMenuOpen(false)
        } else {
            setMenuOpen(true)
        }
    }

    const logout = () => {
        setMenuOpen(false)
        localStorage.removeItem("token");
        navigate('/login')
    }

    const Greeting = () => {
        const today = new Date()
        const currentHour = today.getHours()

        if (currentHour < 12) {
            return 'Good Morning'
        } else if (currentHour < 18) {
            return 'Good Afternoon'
        } else {
            return 'Good Evening'
        }
    }

    const welcomeText = `${Greeting()}, how can we help?`
    return (
        <div className="flex flex-col justify-center bg-black p-3" onClick={toggleDropdown}>
            <div>
                <nav class="block  px-4 py-2 mx-auto  shadow-md lg:px-8 lg:py-3">
                    <div class="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
                        <div className="flex justify-center items-center space-x-5">
                            <Link to="/">
                                <img src={logoIcon} className="w-[20vh]" />
                            </Link>
                        </div>

                        {loggedIn ? (
                            <div className="flex justify-between items-center space-x-5">
                                {!fullNavbar.includes(location.pathname) ? (
                                    <div class="w-fit pl-6 hidden sm:flex">
                                        <div class="relative">
                                            <input
                                                class="w-full bg-transparent placeholder:text-white text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                placeholder="Search for answers"
                                            />
                                            <button
                                                class="absolute top-1 right-1 flex items-center rounded bg-white py-1 px-2.5 border border-transparent text-center text-sm text-black transition-all shadow-sm hover:shadow  focus:shadow-none  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2">
                                                    <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                                                </svg>

                                                Search
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                )}

                                <div>
                                    <button onClick={toggleDropdown} class="flex justify-center items-center rounded bg-white py-1 px-2.5 border border-transparent text-center text-sm  transition-all shadow-sm w-fit" type="button">
                                        <img src={settingsIcon} className="h-7 mx-1" alt="account settings" />
                                        Oloo
                                    </button>
                                    <ul className={menuOpen ? "sm:fixed absolute right-5 mt-10 z-10 space-y-2  sm:min-w-[180px]  rounded-lg border border-slate-200 bg-white p-3 mr-5" : "hidden"}>
                                        <li className="flex justify-start items-center space-x-2 hover:cursor-pointer hover:font-bold">
                                            <img src={companyIcon} className="h-6" alt="company settings" />
                                            <p>Company Settings</p>
                                        </li>
                                        <Link to="/manage-departments" className>
                                            <li className="flex justify-start items-center space-x-2 hover:cursor-pointer hover:font-bold">
                                                <img src={departmentIcon} className="h-6" alt="company settings" />
                                                <p>Manage Departments</p>
                                            </li>
                                        </Link>

                                        <li className="flex justify-start items-center space-x-2 hover:cursor-pointer hover:font-bold">
                                            <img src={articlesIcon} className="h-6" alt="company settings" />
                                            <p>Manage Articles</p>
                                        </li>
                                        <li className="flex justify-start items-center space-x-2 hover:cursor-pointer hover:font-bold">
                                            <img src={helpdeskIcon} className="h-6" alt="company settings" />
                                            <p>Manage Helpdesk</p>
                                        </li>
                                        <li className="flex justify-start items-center space-x-2 hover:cursor-pointer hover:font-bold">
                                            <img src={inductionIcon} className="h-6" alt="company settings" />
                                            <p>Manage Induction</p>
                                        </li>
                                        <li className="flex justify-start items-center space-x-2 hover:cursor-pointer hover:font-bold">
                                            <img src={faqIcon} className="h-6" alt="company settings" />
                                            <p>Manage FAQ's</p>
                                        </li>
                                        <li className="flex justify-start items-center space-x-2 hover:cursor-pointer hover:font-bold">
                                            <img src={profileIcon} className="h-6" alt="company settings" />
                                            <p>View Profile</p>
                                        </li>
                                        <li onClick={logout} className="flex justify-start items-center space-x-2 hover:cursor-pointer hover:font-bold">
                                            <img src={logoutIcon} className="h-6" alt="company settings" />
                                            <p>Logout</p>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </nav>
            </div>

            <div className={fullNavbar.includes(location.pathname) ? 'h-[30vh] sm:h-[35vh] flex flex-col justify-center items-center' : 'hidden'}>
                <div>
                    <ReactTyped className="text-white text-lg text-center sm:text-3xl mt-5" strings={[welcomeText]} typeSpeed={40} />

                    <div class="w-full px-5 mt-2 sm:mt-4">
                        <div class="relative">
                            <input
                                class="w-full bg-transparent placeholder:text-slate-400  text-slate-700 text:lg rounded-lg sm:text-xl border border-slate-200 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Search for answers"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" class="absolute top-4 right-1 w-5 mr-2">
                                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="mt-2">
                    <p className="text-xs sm:text-sm text-slate-400 text-center">Share knowledge and collaborate.</p>
                </div>
            </div>
        </div>
    );
}

export default Navbar;