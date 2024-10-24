import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import companyIcon from "../assets/company.svg"
import settingsIcon from "../assets/settings.svg"
import profileIcon from "../assets/profile.svg"
import logoutIcon from "../assets/logout.svg"
import departmentIcon from "../assets/department.svg"
import articlesIcon from "../assets/articles.svg"
import helpdeskIcon from "../assets/helpdesk.svg"
import faqIcon from "../assets/faq.svg"
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

    return (
        <div className="flex flex-col justify-center bg-black p-3">
            <div>
                <nav class="block  px-4 py-2 mx-auto  shadow-md lg:px-8 lg:py-3">
                    <div class="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
                        <div className="flex justify-center items-center space-x-5">
                            <Link to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="220" height="40" fill="none" viewBox="0 0 220 40"><path fill="#ffffff" d="M20 40c11.046 0 20-8.954 20-20V6a6 6 0 0 0-6-6H21v8.774c0 2.002.122 4.076 1.172 5.78a9.999 9.999 0 0 0 6.904 4.627l.383.062a.8.8 0 0 1 0 1.514l-.383.062a10 10 0 0 0-8.257 8.257l-.062.383a.8.8 0 0 1-1.514 0l-.062-.383a10 10 0 0 0-4.627-6.904C12.85 21.122 10.776 21 8.774 21H.024C.547 31.581 9.29 40 20 40Z"></path><path fill="#ffffff" d="M0 19h8.774c2.002 0 4.076-.122 5.78-1.172a10.018 10.018 0 0 0 3.274-3.274C18.878 12.85 19 10.776 19 8.774V0H6a6 6 0 0 0-6 6v13ZM46.455 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM211.711 12.104c5.591 0 8.289 3.905 8.289 8.428v8.495h-5.851V21.54c0-2.05-.748-3.742-2.893-3.742-2.145 0-2.86 1.692-2.86 3.742v7.486h-5.851V21.54c0-2.05-.715-3.742-2.861-3.742-2.145 0-2.893 1.692-2.893 3.742v7.486h-5.85v-8.495c0-4.523 2.697-8.428 8.288-8.428 3.056 0 5.266 1.204 6.274 3.189 1.072-1.985 3.413-3.19 6.208-3.19ZM180.427 23.82c1.885 0 2.698-1.725 2.698-3.776v-7.29h5.85v8.006c0 4.784-2.795 8.755-8.548 8.755-5.754 0-8.549-3.97-8.549-8.755v-8.006h5.851v7.29c0 2.05.812 3.776 2.698 3.776ZM163.275 29.547c-3.673 0-6.046-1.269-7.444-3.742l4.226-2.376c.585 1.041 1.462 1.562 2.925 1.562 1.203 0 1.755-.423 1.755-.944 0-1.985-8.581.033-8.581-6.28 0-3.06 2.6-5.533 7.021-5.533 3.868 0 5.981 1.887 6.924 3.71l-4.226 2.408c-.357-.976-1.463-1.562-2.568-1.562-.845 0-1.3.358-1.3.846 0 2.018 8.581.163 8.581 6.281 0 3.417-3.348 5.63-7.313 5.63ZM142.833 36.512h-5.851V20.858c0-4.98 3.738-8.592 8.939-8.592 5.071 0 8.939 3.873 8.939 8.592 0 5.207-3.446 8.657-8.614 8.657-1.203 0-2.405-.358-3.413-.912v7.909Zm3.088-12.497c1.853 0 3.088-1.432 3.088-3.125 0-1.724-1.235-3.124-3.088-3.124s-3.088 1.4-3.088 3.125c0 1.692 1.235 3.124 3.088 3.124ZM131.121 11.03c-1.918 0-3.51-1.595-3.51-3.515 0-1.92 1.592-3.515 3.51-3.515 1.918 0 3.511 1.595 3.511 3.515 0 1.92-1.593 3.515-3.511 3.515Zm-2.925 1.724h5.851v16.273h-5.851V12.754ZM116.97 29.515c-5.071 0-8.939-3.905-8.939-8.657 0-4.719 3.868-8.624 8.939-8.624s8.939 3.905 8.939 8.624c0 4.752-3.868 8.657-8.939 8.657Zm0-5.5c1.853 0 3.088-1.432 3.088-3.125 0-1.724-1.235-3.156-3.088-3.156s-3.088 1.432-3.088 3.156c0 1.693 1.235 3.125 3.088 3.125ZM96.983 37c-4.03 0-6.956-1.79-8.451-4.98l4.843-2.603c.52 1.107 1.495 2.246 3.51 2.246 2.114 0 3.511-1.335 3.674-3.678-.78.684-2.016 1.204-3.868 1.204-4.519 0-8.16-3.482-8.16-8.364 0-4.718 3.869-8.559 8.94-8.559 5.201 0 8.939 3.613 8.939 8.592v6.444c0 5.858-4.064 9.698-9.427 9.698Zm.39-13.31c1.755 0 3.088-1.205 3.088-2.995 0-1.757-1.332-2.929-3.088-2.929-1.723 0-3.088 1.172-3.088 2.93 0 1.79 1.365 2.993 3.088 2.993ZM78.607 29.515c-5.071 0-8.94-3.905-8.94-8.657 0-4.719 3.869-8.624 8.94-8.624 5.07 0 8.939 3.905 8.939 8.624 0 4.752-3.869 8.657-8.94 8.657Zm0-5.5c1.853 0 3.088-1.432 3.088-3.125 0-1.724-1.235-3.156-3.088-3.156s-3.088 1.432-3.088 3.156c0 1.693 1.235 3.125 3.088 3.125ZM59.013 7.06v16.434H68.7v5.533H58.2c-3.705 0-5.2-1.953-5.2-5.045V7.06h6.013Z"></path></svg>
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
                                                class="absolute top-1 right-1 flex items-center rounded bg-white py-1 px-2.5 border border-transparent text-center text-sm text-black transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
                                        <li className="flex justify-start items-center space-x-2 hover:cursor-pointer hover:font-bold">
                                            <img src={departmentIcon} className="h-6" alt="company settings" />
                                            <p>Manage Departments</p>
                                        </li>
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

            <div className={fullNavbar.includes(location.pathname) ? 'h-[25vh] flex flex-col justify-center items-center' : 'hidden'}>
                <div>
                    <p className="text-white text-xl text-center sm:text-3xl">Welcome to Ipsums' Knowledge Base</p>
                    <p className="mt-2 text-sm sm:text-xl text-slate-400 text-center">Find answers, share knowledge and collaborate.</p>
                </div>

                <div class="w-full max-w-sm min-w-[200px] mt-3 lg:mt-10 p-5">
                    <div class="relative">
                        <input
                            class="w-full bg-transparent placeholder:text-white text-slate-700 text:lg sm:text-xl border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Search for answers"
                        />
                        <button
                            class="absolute top-1 right-1 flex items-center rounded bg-white py-1 px-2.5 border border-transparent text-center text-sm text-black transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2">
                                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>

                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;