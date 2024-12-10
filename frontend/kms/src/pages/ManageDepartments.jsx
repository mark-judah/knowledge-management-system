import React, { useContext, useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumbs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import newFolderIcon from "../assets/new_folder_white.svg"
import closeIcon from "../assets/close.svg"
import editIcon from "../assets/edit_white.svg"
import deleteIcon from "../assets/delete.svg"
import { getBackendUrl } from "../constants";
import Popup from 'reactjs-popup';
import newFileIcon from "../assets/new_article.svg"
import { MyContext } from "../MyContextProvider";
import LoadingAnimation from "../components/LoadingAnimation";
import Swal from "sweetalert2";

const ManageDepartments = () => {
    const location = useLocation();
    const path = location.pathname.split('/');
    const [departments, setDepartments] = useState([]);
    const [newDepartment, setNewDepartment] = useState('');
    const [updatedDepartment, setUpdatedDepartment] = useState('');
    const value = useContext(MyContext)
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    const addDepartment = () => {
        console.log(newDepartment)
        if (newDepartment !== "") {
            setDepartments([...departments, newDepartment]);
        }
        setNewDepartment('')
    }

    const removeDepartment = (dep) => {
        console.log(dep)
        const newList = departments.filter((dept) => dept !== dep);
        setDepartments(newList);
    }

    const closePopup = () => {
        // document.getElementById("popup-root").remove()
    }

    const handleSubmit = (mode,id) => {
        closePopup()
        value.setLoading(true)
        if (mode === 'create') {
            let data = {
                "departments": departments
            }
            axios.post(`${getBackendUrl()}` + 'api/departments/', data, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                console.log(response);
                if (response.status == 201) {
                    value.setLoading(false)
                    Swal.fire('Department(s) created successfully', '', 'success')
                    value.setDepartmentDataSeed(Math.random())
                }
            }).catch(function (error) {
                console.log(error)
                value.setLoading(false)
                if (error.response.status == 401 && location.pathname != '/login') {
                    console.log('logging out')
                    value.logout()
                }else{
                    Swal.fire('An error occured, please try again later', '', 'error')
                }
            })

        } else {
            let data={
                'title':updatedDepartment,
                'id':id
            }
            axios.patch(`${getBackendUrl()}` + 'api/departments/', data, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                console.log(response);
                if (response.status == 200) {
                    value.setLoading(false)
                    Swal.fire('Department updated successfully', '', 'success')
                    value.setDepartmentDataSeed(Math.random())
                }
            }).catch(function (error) {
                console.log(error)
                value.setLoading(false)
                if (error.response.status == 401 && location.pathname != '/login') {
                    console.log('logging out')
                    value.logout()
                }else{
                    Swal.fire('An error occured, please try again later', '', 'error')
                }
            })
        }
        setDepartments('')
    }

    const deleteDepartment = (department_id) => {
        Swal.fire({
            title: 'Warning!',
            text: 'The department and all its associated articles,folders and files will be deleted.',
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
                axios.delete(`${getBackendUrl()}` + 'api/departments/', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    data:{
                        "id":department_id
                    }
                }).then((response) => {
                    console.log(response);
                    if (response.status == 204) {
                        value.setLoading(false)
                        Swal.fire('The department and all related data have been deleted', '', 'success')
                        value.setDepartmentDataSeed(Math.random())
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
        <div className="min-h-screen">
            <div className="flex flex-col">
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full max-w-lg px-10 py-5 mx-auto'>
                        <div className='max-w-md mx-auto space-y-3'>
                            <h2 className="flex flex-row flex-nowrap items-center my-2">
                                <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                                <span className="flex-none block mx-4 px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                    Departments
                                </span>
                                <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            </h2>

                        </div>
                    </div>
                    <BreadCrumb path={path} />
                </div>
            </div>

            <div className="static flex justify-center items-center">
                <LoadingAnimation />

                <div className="p-5 flex flex-col justify-center w-fit">
                    <div class="w-full flex justify-between items-center mb-3 mt-1">
                        <div>
                            <div class="w-fit  relative">
                                <div class="relative">
                                    <input
                                        class="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                        placeholder="Search for department..."
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
                            <div className="flex justify-end m-10">
                                <button className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                                    <img src={newFolderIcon} className="h-7 mx-1 fill-current text-white" alt="new article" />
                                    New Department
                                </button>
                            </div>
                        } modal>
                            <div className="p-5">
                                <div className="flex justify-between w-full mb-5">
                                    <div className="flex flex-col space-y-2">
                                        <p className="text-black font-bold text-xl">New Department(s)</p>
                                        <p className="text-gray-500 text-sm"></p>
                                    </div>

                                    <div>
                                        <img src={closeIcon} onClick={() => document.getElementById("popup-root").remove()} className="h-5 mx-1 hover:cursor-pointer" alt="close modal" />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative mt-5">
                                        <input value={newDepartment} onChange={(e) => setNewDepartment(e.target.value)} type="text" className="mt-2 p-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" placeholder="Enter a department" />
                                        <button onClick={addDepartment} className="absolute right-1 top-4 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                            Add
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center mt-3 flex-wrap p-4">
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

                                <div className="flex justify-end items-center space-x-2 w-full mt-5">
                                    <button
                                        className="rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg"
                                        type="button" onClick={() => { closePopup(); handleSubmit('create') }}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </Popup>
                    </div>
                    <div
                        class="relative flex flex-col w-full h-full overflow-scroll md:overflow-hidden text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                        <table class="w-full text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Department
                                        </p>
                                    </th>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Actions
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {value.departments.map((department) => (
                                    <tr class="even:bg-blue-gray-50/50">
                                        <td class="p-4">
                                            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {department.title}
                                            </p>
                                        </td>

                                        <td class="p-4">
                                            <div className="flex items-center space-x-3">
                                                <Popup trigger={
                                                    <p class="hover:cursor-pointer block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                        Edit
                                                    </p>
                                                } modal>
                                                    <div className="p-5">
                                                        <div className="flex justify-between w-full mb-5">
                                                            <div className="flex flex-col space-y-2">
                                                                <p className="text-black font-bold text-xl">Edit Department</p>
                                                                <p className="text-gray-500 text-sm"></p>
                                                            </div>

                                                            <div>
                                                                <img src={closeIcon} onClick={() => document.getElementById("popup-root").remove()} className="h-5 mx-1 hover:cursor-pointer" alt="close modal" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <input onChange={(e) => setUpdatedDepartment(e.target.value)} type="text" className="mt-2 p-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" placeholder={department.title} />
                                                        </div>

                                                        <div className="flex justify-end items-center space-x-2 w-full mt-5">
                                                            <button
                                                                className="rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg"
                                                                type="button" onClick={() => { closePopup(); handleSubmit('update',department.id) }}>
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Popup>
                                                <p onClick={() => deleteDepartment(department.id)} class="hover:cursor-pointer block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
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

        </div>
    );
}

export default ManageDepartments;