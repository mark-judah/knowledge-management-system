import React, { useEffect, useState } from "react";
import companyIcon from "../assets/company.svg"
import deleteIcon from "../assets/delete.svg"
import emailIcon from "../assets/email.svg"
import passwordIcon from "../assets/password.svg"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getBackendUrl } from "../constants";
import { Circles } from 'react-loader-spinner'

const Setup = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const navigate = useNavigate()
    const [component, setComponent] = useState(0);
    const [companyName, setCompanyName] = useState('');
    const [companyLogo, setCompanyLogo] = useState('');
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [companyTagline, setCompanyTagline] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading,setLoading]=useState('');


    const nextComponent = () => {
        console.log('next')
        setComponent(component + 1)
        if (component === 3) {
            setLoading(true)
            const companyData = new FormData();
            companyData.append('title', companyName);
            companyData.append('tagline', companyTagline);

            const userData = new FormData();
            userData.append('username', username);
            userData.append('email', email);
            userData.append('role', 'Admin');
            userData.append('password', password);
            userData.append('department', '');

           
            axios.all([
                axios.post(`${getBackendUrl()}` + 'api/company/', companyData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }),
                axios.post(`${getBackendUrl()}` + 'api/user/', userData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            ]).then(axios.spread((companyResponse,userResponse) => {
                console.log(companyResponse,userResponse);
            })).catch(function (error) {
                setLoading(false)
                console.log(error)
            }).finally(
                departments.map((dep) => {
                    let data = {
                        "title": dep
                    }
                    axios.post(`${getBackendUrl()}` + 'api/departments/', data, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        console.log(response);
                    }).catch(function (error) {
                        setLoading(false)
                        console.log(error)
                    }).finally(
                        setLoading(false),
                        navigate('/')
                    )
                }),
                
            )
        } else {
            activeForm(component)
        }
    }

    const previousComponent = () => {
        console.log('previous')
        setComponent(component - 1)
        activeForm(component)
    }

    const newDepartment = () => {
        console.log(department)
        if (department !== "") {
            setDepartments([...departments, department]);
        }
        setDepartment('')
    }

    const removeDepartment = (dep) => {
        console.log(dep)
        const newList = departments.filter((dept) => dept !== dep);
        setDepartments(newList);
    }



    const activeForm = (component) => {
        console.log(component)
        switch (component) {
            case 0:
                return <div>
                    <p className="font-semibold text-3xl">Welcome to KMS</p>
                    <p className="font-semibold text-xl mt-10">Create a new company</p>

                    <div className="flex justify-center items-center space-x-5 mt-5">
                        <div>
                            <img src={companyIcon} className="h-12" />
                        </div>

                        <div className="w-full max-w-sm min-w-[200px]">
                            <input value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Company name" />
                        </div>
                    </div>
                </div>

            case 1:
                return <div>
                    <p className="font-semibold text-xl mt-10">Enter your company's tagline</p>

                    <div className="flex justify-center items-center space-x-5 mt-5">
                        <div>
                            <img src={companyIcon} className="h-12" />
                        </div>

                        <div className="w-full max-w-sm min-w-[200px]">
                            <input value={companyTagline}
                                onChange={(e) => setCompanyTagline(e.target.value)}
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Company tagline" />
                        </div>
                    </div>
                </div>

            case 2:
                return <div className="flex flex-col items-center">
                    <div>
                        <p className="font-semibold text-xl mt-10">Enter your company's departments</p>
                        <div className="relative mt-5">
                            <input value={department} onChange={(e) => setDepartment(e.target.value)} type="text" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Enter a department" />
                            <button onClick={newDepartment} className="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                Add
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center items-center mt-3 flex-wrap p-4">
                        {console.log(departments.length > 0)}
                        {departments.length > 0 ? (
                            departments.map((dep) => (
                                <div className="p-2">
                                    <div className="flex justify-center items-center space-x-3 rounded-xl bg-black py-2 px-4 border border-transparent text-center text-sm text-white  ml-2">
                                        <div>
                                            <p>{dep}</p>
                                        </div>
                                        <div>
                                            <img onClick={() => removeDepartment(dep)} src={deleteIcon} className="h-5" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : ('')}
                    </div>
                </div>


            case 3:
                return <div>
                    <p className="font-semibold text-xl mt-10">Create an admin account</p>

                    <div className="w-full max-w-sm min-w-[200px] mt-5">
                        <div className="relative">
                            <input type="text" onChange={(e) => setUsername(e.target.value)} className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Username" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600">
                                <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"></path>
                            </svg>
                        </div>
                    </div>

                    <div className="w-full max-w-sm min-w-[200px] mt-5">
                        <div className="relative">
                            <input type="email" onChange={(e) => setEmail(e.target.value)} className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Email" />
                            <img src={emailIcon} className="absolute w-5 h-5 top-2.5 right-2.5" />

                        </div>
                    </div>

                    <div className="w-full max-w-sm min-w-[200px] mt-5">
                        <div className="relative">
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Password" />
                            <img src={passwordIcon} className="absolute w-5 h-5 top-2.5 right-2.5" />
                        </div>
                        <p className="flex items-start mt-2 text-xs text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1.5">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                            </svg>

                            Use at least 8 characters, one uppercase, one lowercase and one number.
                        </p>
                    </div>

                    <div className="w-full max-w-sm min-w-[200px] mt-3">
                        <div className="relative">
                            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Confirm Password" />
                            <img src={passwordIcon} className="absolute w-5 h-5 top-2.5 right-2.5" />
                        </div>

                    </div>
                </div>


            default:
                break
        }
    }


    return (
        <div className="min-h-screen bg-[#F5F5F5] flex justify-center items-center">
            {loading ? (
                <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
            ):(
                ''
            )}
            <div className="flex flex-col items-center">
                <div>
                    {activeForm(component)}
                </div>

                <div className="fixed bottom-0">
                    <hr className="h-0.5 w-screen bg-black" />
                    <div className="flex justify-between p-3">
                        <div>
                            {component === 0 ? (
                                ''
                            ) : (
                                <button onClick={previousComponent} className="rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white  ml-2" type="button">
                                    Previous
                                </button>
                            )}
                        </div>

                        <div>
                            <button onClick={nextComponent} className="rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white  ml-2" type="button">
                                {component == 3 ? 'Save' : 'Next'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setup;