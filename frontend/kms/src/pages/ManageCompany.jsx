import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumbs";
import companyIcon from "../assets/company_white.svg"
import newUserIcon from "../assets/user.svg"
import showUsersIcon from "../assets/users.svg"
import axios from "axios";
import { getBackendUrl } from "../constants";
import { useForm } from "react-hook-form"
import editIcon from "../assets/edit_white.svg"
import deleteIcon from "../assets/delete.svg"

const ManageCompany = () => {
    const location = useLocation();
    const path = location.pathname.split('/');
    const [companyName, setCompanyName] = useState('');
    const [companyLogo, setCompanyLogo] = useState('');
    const [companyComponent, setCompanyComponent] = useState(true);
    const [usersComponent, setUsersComponent] = useState(false);
    const [newUserComponent, setNewUserComponent] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [departments, setDepartments] = useState([])
    const [company, setCompany] = useState([])
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [seed, setSeed] = useState(1);
    const [tagline, setCompanyTagline] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
        Promise.all([
            axios.get(`${getBackendUrl()}` + 'api/departments/'),
            axios.get(`${getBackendUrl()}` + 'api/company/'),
            axios.get(`${getBackendUrl()}` + 'api/user/')
        ]).then(([departmentsResponse, companyResponse, userResponse]) => {
            console.log(departmentsResponse.data);
            console.log(companyResponse.data);
            console.log(userResponse.data);
            setDepartments(departmentsResponse.data)
            setCompany(companyResponse.data)
            setUsers(userResponse.data)
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }, [seed])

    const toggleComponents = (component) => {
        if (component === 'company') {
            setSeed(Math.random())
            setCompanyComponent(true)
            setUsersComponent(false)
            setNewUserComponent(false)
        }

        if (component === 'users') {
            setSeed(Math.random())
            setCompanyComponent(false)
            setUsersComponent(true)
            setNewUserComponent(false)
        }

        if (component === 'new-user') {
            setSeed(Math.random())
            setCompanyComponent(false)
            setUsersComponent(false)
            setNewUserComponent(true)
        }
    }
    const onSubmit = async (data) => {
        if (data['password'] === data['confirm_password']) {
            const body = new FormData();
            body.append('username', data['username']);
            body.append('email', data['email']);
            body.append('password', data['password']);
            body.append('role', data['role']);
            body.append('department', data['department']);

            axios.post(`${getBackendUrl()}` + 'api/user/', body, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response);
            }).catch(function (error) {
                console.log(error)
            }).finally(
                toggleComponents('users')
            )
        } else {
            console.log("username & password do not match")
        }

    }

    const saveCompanyDetails = () => {
        const body = new FormData();
        if (companyName.length == 0) {
            setCompanyName(company[0].title)
        }
        if (tagline.length == 0) {
            setCompanyTagline(company[0].tagline)
        }
        body.append('title', companyName);
        body.append('tagline', tagline);

        axios.patch(`${getBackendUrl()}` + 'api/company/', body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response);
        }).catch(function (error) {
            console.log(error)
        }).finally(
            window.location.reload()
        )
    }

    return (
        <div className="min-h-screen">
            <div className="flex flex-col">
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full max-w-lg px-10 py-5 mx-auto'>
                        <div className='max-w-md mx-auto space-y-3'>
                            <h2 className="flex flex-row flex-nowrap items-center my-2">
                                <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                                <span className="flex-none block mx-4 px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                    Company
                                </span>
                                <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            </h2>

                        </div>
                    </div>
                    <BreadCrumb path={path} />
                </div>

                <div className="flex justify-end m-10 space-x-4">
                    <button onClick={() => toggleComponents('company')} className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                        <img src={companyIcon} className="h-7 mx-1 fill-current text-white" alt="new article" />
                        Company Details
                    </button>

                    <button onClick={() => toggleComponents('users')} className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                        <img src={showUsersIcon} className="h-7 mx-1 fill-current text-white" alt="new article" />
                        Users
                    </button>

                    <button onClick={() => toggleComponents('new-user')} className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                        <img src={newUserIcon} className="h-7 mx-1 fill-current text-white" alt="new article" />
                        New User
                    </button>
                </div>
            </div>

            {companyComponent ? (
                <div className="flex justify-center items-center mt-5">
                    <div className="w-fit p-4 flex flex-col justify-center items-center m-5 bg-white rounded-lg shadow">
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-1 text-sm text-slate-600 mt-5">
                                Name
                            </label>
                            <input placeholder={company.length > 0 ? company[0].title : companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                        </div>

                        <div className="w-full max-w-sm min-w-[200px] mt-4">
                            <label className="block mb-1 text-sm text-slate-600 mt-5">
                                Tagline
                            </label>
                            <input placeholder={company.length > 0 ? company[0].tagline : tagline}
                                onChange={(e) => setCompanyTagline(e.target.value)}
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                        </div>

                        <div className="w-full max-w-sm min-w-[200px] flex justify-start items-center my-5">
                            <button onClick={saveCompanyDetails} className="w-fit rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            ) : ('')}


            {usersComponent ? (
                <div className="flex justify-center items-center mt-5">
                    <div className="w-fit p-4 flex flex-col justify-center items-center m-5 bg-white rounded-lg shadow">
                        <table className="w-fit text-left table-auto min-w-max mb-10">
                            <thead>
                                <tr>
                                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                                        <p className="text-sm font-normal leading-none text-slate-500">
                                            Username
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                                        <p className="text-sm font-normal leading-none text-slate-500">
                                            Email
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                                        <p className="text-sm font-normal leading-none text-slate-500">
                                            Role
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                                        <p className="text-sm font-normal leading-none text-slate-500">
                                            Department
                                        </p>
                                    </th>

                                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                                        <p className="text-sm font-normal leading-none text-slate-500">
                                            Date Created
                                        </p>
                                    </th>

                                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                                        <p className="text-sm font-normal leading-none text-slate-500">
                                            Actions
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr className="hover:bg-slate-50 border-b border-slate-200">
                                        <td className="p-4 py-5">
                                            <p className="block font-semibold text-sm text-slate-800 w-[30vh]">{user.username}</p>
                                        </td>
                                        <td className="p-4 py-5">
                                            <p className="block font-semibold text-sm text-slate-800 w-[30vh]">{user.email}</p>
                                        </td>

                                        <td className="p-4 py-5">
                                            <p className="text-sm text-slate-500">{user.is_superuser ? 'Admin' : 'Staff'}</p>
                                        </td>

                                        <td className="p-4 py-5">
                                            <p className="text-sm text-slate-500">{user.groups.length > 0 ? user.groups[0] : 'None'}</p>
                                        </td>

                                        <td className="p-4 py-5">
                                            <p className="text-sm text-slate-500">{user.date_joined}</p>
                                        </td>

                                        <td className="p-4 py-5">
                                            <div className="p-2 flex justify-center items-center space-x-3">
                                                <div className="flex justify-center items-center space-x-3 rounded-xl bg-black py-2 px-4 border border-transparent text-center text-sm text-white  ml-2">
                                                    <div>
                                                        <p>Edit</p>
                                                    </div>
                                                    <div>
                                                        <img src={editIcon} className="h-5" />
                                                    </div>
                                                </div>

                                                <div className="flex justify-center items-center space-x-3 rounded-xl bg-black py-2 px-4 border border-transparent text-center text-sm text-white  ml-2">
                                                    <div>
                                                        <p>Delete</p>
                                                    </div>
                                                    <div>
                                                        <img src={deleteIcon} className="h-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : ('')}

            {newUserComponent ? (
                <div className="flex justify-center items-center mt-5">
                    <div className="w-fit p-4 flex flex-col justify-center items-center m-5 bg-white rounded-lg shadow">
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <label className="block mb-1 text-sm text-slate-600 mt-5">
                                Username
                            </label>
                            <input {...register("username")} type="text" placeholder="Username" className="mt-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />

                            <label className="block mb-1 text-sm text-slate-600 mt-5">
                                Email
                            </label>
                            <input {...register("email")} type="email" placeholder="Email" className="mt-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />

                            <label className="block mb-1 text-sm text-slate-600 mt-5">
                                Password
                            </label>
                            <input {...register("password")} type="password" placeholder="Password" className="mt-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />

                            <label className="block mb-1 text-sm text-slate-600 mt-5">
                                Confirm Password
                            </label>
                            <input {...register("confirm_password")} type="password" placeholder="Confirm Password" className="mt-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />

                            <label className="block mb-1 text-sm text-slate-600 mt-5">
                                Role
                            </label>

                            <select {...register("role")} id="role" className="mt-2 p-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                                <option selected>Role</option>
                                <option value="">Staff</option>
                                <option value="">Admin</option>
                            </select>

                            <label className="block mb-1 text-sm text-slate-600 mt-5">
                                Department
                            </label>

                            <select {...register("department")} id="departments" className="mt-2 p-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                                <option selected>Choose a department</option>
                                {departments.map((department) => (
                                    <option value={department.title}>{department.title}</option>
                                ))}
                            </select>

                            <button type="submit" className="mt-4 w-full rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                Save
                            </button>

                        </form>
                    </div>
                </div>
            ) : ('')}
        </div>
    );
}

export default ManageCompany;