import React, { useContext } from "react";
import BreadCrumb from "../components/BreadCrumbs";
import { useLocation } from "react-router-dom";
import { MyContext } from "../MyContextProvider";
import LoadingAnimation from "../components/LoadingAnimation";
import axios from "axios";
import Swal from "sweetalert2";
import { getBackendUrl } from "../constants";
import readIcon from "../assets/checkmark.svg"
import notReadIcon from "../assets/cancel.svg"


const CollaborationRequests = () => {
    const location = useLocation();
    const path = location.pathname.split('/');
    const value = useContext(MyContext)

    const readStatusToggle = (collaboration) => {
        let data = {
            'id': collaboration.id,
            'seen': collaboration.seen
        }
        axios.patch(`${getBackendUrl()}` + 'api/collaborations/', data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log(response);
            if (response.status == 200) {
                value.setLoading(false)
                Swal.fire('Request updated successfully', '', 'success')
                value.setCollaborationsDataSeed(Math.random())
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
    }

    const collaborationStatusToggle = (collaboration) => {
        let data = {
            'id':collaboration.id,
            'name': collaboration.sender,
            'article': collaboration.article,
            'approved': collaboration.approved,
            'seen': collaboration.seen
        }
        const message=()=>{
            if (collaboration.approved) {
                return 'The collaboration request has been revoked successfully'
            }else{
                return 'The collaboration request has been approved successfully'
            }
        }
        axios.patch(`${getBackendUrl()}` + 'api/add-collaborator/', data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log(response);
            if (response.status == 200) {
                value.setLoading(false)
                Swal.fire(message(), '', 'success')
                value.setCollaborationsDataSeed(Math.random())
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
    }

    const deleteRequest = (request_id) => {
        Swal.fire({
            title: 'Warning!',
            text: 'The request will be permanently deleted.',
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
                axios.delete(`${getBackendUrl()}` + 'api/collaborations/', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    data:{
                        "id":request_id
                    }
                }).then((response) => {
                    console.log(response);
                    if (response.status == 204) {
                        value.setLoading(false)
                        Swal.fire('The collaboration request has been deleted successfully', '', 'success')
                        value.setCollaborationsDataSeed(Math.random())
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
                                    manage collaboration requests
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
                    <div
                        class="mt-5 relative flex flex-col w-full h-full overflow-scroll md:overflow-hidden text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                        <table class="w-full text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Message
                                        </p>
                                    </th>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Sender
                                        </p>
                                    </th>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Sender's Department
                                        </p>
                                    </th>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Read
                                        </p>
                                    </th>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Approved
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
                                {value.collaborations.map((collaboration) => (
                                    collaboration.recipient === localStorage.getItem('username') ? (
                                        <tr class="even:bg-blue-gray-50/50">
                                            <td class="p-4">
                                                <p class="w-[20vh] block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {collaboration.message}
                                                </p>
                                            </td>

                                            <td class="p-4">
                                                <p class="w-[20vh] block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {collaboration.sender}
                                                </p>
                                            </td>

                                            <td class="p-4">
                                                <p class="w-[20vh] block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {collaboration.department}
                                                </p>
                                            </td>

                                            <td class="p-4">
                                                <p class="w-[20vh] block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {collaboration.seen ? <img src={readIcon} className="h-7 mx-1" /> : <img src={notReadIcon} className="h-7 mx-1" />}
                                                </p>
                                            </td>

                                            <td class="p-4">
                                                    {collaboration.approved ? <img src={readIcon} className="h-7 mx-1" /> : <img src={notReadIcon} className="h-7 mx-1" />}
                                            </td>

                                            <td class="p-4">
                                                <div className="flex items-center space-x-3">
                                                    <p onClick={() => readStatusToggle(collaboration)} class="hover:cursor-pointer block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                        {collaboration.seen ? 'Mark as not read' : 'Mark as read'}
                                                    </p>

                                                    <p onClick={() => collaborationStatusToggle(collaboration)} class="hover:cursor-pointer block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                        {collaboration.approved ? 'Revoke' : 'Approve'}
                                                    </p>

                                                    <p onClick={() => deleteRequest(collaboration.id)} class="hover:cursor-pointer block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                        Delete
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : ('')

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

export default CollaborationRequests;