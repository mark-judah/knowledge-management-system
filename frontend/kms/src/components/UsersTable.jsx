import React, { useContext } from "react";
import { MyContext } from "../MyContextProvider";
import newUserIcon from "../assets/user.svg"
import Popup from 'reactjs-popup';
import CreateUpdateuser from "./CreateUpdateUser";
import LoadingAnimation from "./LoadingAnimation";
import Swal from "sweetalert2";
import axios from "axios";
import { getBackendUrl } from "../constants";
import { useLocation } from "react-router-dom";

const UsersTable = () => {
    const value = useContext(MyContext)
    const location=useLocation()

    const deleteUser = (user_id) => {
        console.log(user_id)
        Swal.fire({
            title: 'Warning!',
            text: 'The user and all their associated articles,folders and files will be deleted. To prevent data loss, deactivate the user instead.',
            icon: 'warning',
            iconColor: '#000000',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'I understand, proceed',
            denyButtonText: 'Cancel',
            confirmButtonColor: '#000000',
            denyButtonColor: '#000000',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${getBackendUrl()}` + 'api/delete-user/', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    data:{
                        "id":user_id
                    }
                }).then((response) => {
                    console.log(response);
                    if (response.status == 204) {
                        value.setLoading(false)
                        Swal.fire('The user and all related data have been deleted', '', 'success')
                        value.setUserDataSeed(Math.random())
                    }
                }).catch(function (error) {
                    console.log(error)
                    value.setLoading(false)
                    if (error.response.status == 401 && location.pathname != '/login') {
                        console.log('logging out')
                        value.logout()
                    } else {
                        Swal.fire('An error occured, please try again later', '', 'error')
                    }
                })
            } else if (result.isDenied) {
            }
        })
    }

    const userStatusToggle = (user_id, is_active) => {
        Swal.fire({
            title: 'Warning!',
            text: 'The user will no longer have access to their account, all their associated articles, folders and files will still be available.',
            icon: 'warning',
            iconColor: '#000000',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'I understand, proceed',
            denyButtonText: 'Cancel',
            confirmButtonColor: '#000000',
            denyButtonColor: '#000000',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const body = new FormData();
                body.append('id', user_id);
                if (is_active) {
                    body.append('is_active', 'False');
                } else {
                    body.append('is_active', 'True');
                }
                axios.post(`${getBackendUrl()}` + 'api/user-status/', body, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }).then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        value.setLoading(false)
                        if (is_active) {
                            Swal.fire('The user has been deactivated', '', 'success')
                        } else {
                            Swal.fire('The user has been activated', '', 'success')
                        }
                        value.setUserDataSeed(Math.random())
                    }
                }).catch(function (error) {
                    console.log(error)
                    value.setLoading(false)
                    if (error.response.status == 401 && location.pathname != '/login') {
                        console.log('logging out')
                        value.logout()
                    } else {
                        Swal.fire('An error occured, please try again later', '', 'error')
                    }
                })
            } else if (result.isDenied) {
            }
        })
    }

    return (
        <div className="flex justify-center items-center">
            <div className="p-5 flex flex-col justify-center w-fit">
                <div class="w-full flex justify-between items-center mb-3 mt-1">
                    <div>
                        <div class="w-fit  relative">
                            <div class="relative">
                                <input
                                    class="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="Search for user..."
                                />
                                <button
                                    class="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                                    type="button"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-8 h-8 text-slate-600">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <Popup trigger={
                        <button className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                            <img src={newUserIcon} className="h-7 mx-1 fill-current text-white" alt="new article" />
                            New User
                        </button>
                    } modal nested>
                        <CreateUpdateuser mode='create' />
                    </Popup>
                </div>
                <div
                    class="relative flex flex-col w-full h-full overflow-scroll md:overflow-hidden text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                    <table class="w-full text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Username
                                    </p>
                                </th>
                                <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Email
                                    </p>
                                </th>
                                <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Status
                                    </p>
                                </th>
                                <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Role
                                    </p>
                                </th>
                                <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Department
                                    </p>
                                </th>
                                <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Actions</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {value.users.map((user) => (
                                <tr class="even:bg-blue-gray-50/50">
                                    <td class="p-4">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {user.username}
                                        </p>
                                    </td>

                                    <td class="p-4">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {user.email}
                                        </p>
                                    </td>

                                    <td class="p-4">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </p>
                                    </td>

                                    <td class="p-4">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {user.is_superuser ? 'Admin' : 'Staff'}
                                        </p>
                                    </td>

                                    <td class="p-4">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {user.groups.length > 0 ? user.groups[0] : 'None'}
                                        </p>
                                    </td>

                                    <td class="p-4">
                                        <div className="flex items-center space-x-3">
                                            <Popup trigger={
                                                <p class="hover:cursor-pointer block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    Edit
                                                </p>
                                            } modal nested>
                                                <CreateUpdateuser mode='update' id={user.id} username={user.username}
                                                    email={user.email} role={user.is_superuser ? 'Admin' : 'Staff'}
                                                    status={user.is_active ? 'Active' : 'Inactive'}
                                                    department={user.groups.length > 0 ? user.groups[0] : 'None'} />
                                            </Popup>
                                            <p onClick={() => userStatusToggle(user.id, user.is_active)} class="hover:cursor-pointer block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {user.is_active ? 'Deactivate' : 'Activate'}
                                            </p>
                                            <p onClick={() => deleteUser(user.id)} class="hover:cursor-pointer block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                Delete
                                            </p>
                                        </div>
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div class="flex justify-between items-center px-4 py-3">
                        <div class="text-sm text-slate-500">
                            Showing <b>1-5</b> of 45
                        </div>
                        <div class="flex space-x-1">
                            <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                Prev
                            </button>
                            <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                                1
                            </button>
                            <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                2
                            </button>
                            <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                3
                            </button>
                            <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UsersTable;