import React, { useContext, useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumbs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newFolderIcon from "../assets/new_folder_white.svg"
import editIcon from "../assets/edit_white.svg"
import deleteIcon from "../assets/delete.svg"
import { MyContext } from "../MyContextProvider";
import LoadingAnimation from "../components/LoadingAnimation";
import Popup from 'reactjs-popup';
import { getBackendUrl, getFrontendUrl } from "../constants";
import Swal from "sweetalert2";
import axios from "axios";
import publishedIcon from "../assets/checkmark.svg"
import draftIcon from "../assets/cancel.svg"

const ManageArticles = () => {
    const location = useLocation();
    const path = location.pathname.split('/');
    const value = useContext(MyContext)
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const getEditStatus = (article) => {
        let editText = 'Edit'
        value.collaborations.map((collaboration) => {
            if (collaboration.sender === localStorage.getItem('username') && article.id == collaboration.article) {
                if (collaboration.approved) {
                    editText = 'Edit(Collaboration approved)'
                } else {
                    editText = 'Edit(Pending Approval)'
                }
            } else {
                editText = 'Edit'
            }
        })
        return editText
    }

    const editArticle = (article, editText) => {
        console.log(editText)
        if (article.owner === localStorage.getItem('username')) {
            navigate('/article-editor', { state: { articleData: article, collaboration: true, type: 'general' } })
        } else {
            if (editText === 'Edit(Collaboration approved)') {
                navigate('/article-editor', { state: { articleData: article, collaboration: true, type: 'general' } })
            }
            if (editText === 'Edit(Pending Approval)') {
                Swal.fire('Your request has already been sent. Please wait for the author to approve collaboration.', '', 'info')

            }
            if (editText === 'Edit') {
                Swal.fire({
                    title: 'Warning!',
                    text: 'This article was written by another author, you need collaboration rights to proceed.',
                    icon: 'warning',
                    iconColor: '#000000',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Request collaboration rights',
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
                        let data = {
                            "message": `You have a new collaboration request on your article titled "${article.title}".`,
                            "recipient": article.owner,
                            "sender": localStorage.getItem('username'),
                            "article": article.id
                        }
                        axios.post(`${getBackendUrl()}` + 'api/collaborations/', data, {
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": `Bearer ${localStorage.getItem('token')}`
                            }
                        }).then((response) => {
                            if (response.status == 201) {
                                value.setLoading(false)
                                value.setCollaborationsDataSeed(Math.random())
                                Swal.fire('Your request has been sent succesfully', '', 'success')
                            }
                        }).catch(function (error) {
                            value.setLoading(false)
                            if (error.response.status == 401 && location.pathname != '/login') {
                                console.log('logging out')
                                value.logout()
                            } else {
                                Swal.fire('An error occured, please try again later', '', 'error')
                            }
                        })
                    }
                })
            }

        }
    }

    const publishStatusToggle = (article) => {
        let data = {
            'id': article.id,
            'draft': article.draft
        }
        const message = () => {
            if (article.draft) {
                return 'The article has been published successfully'
            } else {
                return 'The article has been drafted successfully'
            }
        }
        axios.patch(`${getBackendUrl()}` + 'api/article-publish-toggle/', data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log(response);
            if (response.status == 200) {
                value.setLoading(false)
                Swal.fire(message(), '', 'success')
                value.setArticleDataSeed(Math.random())
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

    const deleteArticle = (article_id) => {
        Swal.fire({
            title: 'Warning!',
            text: 'The article will be permanently deleted.',
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
                axios.delete(`${getBackendUrl()}` + 'api/articles/', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    data: {
                        "id": article_id
                    }
                }).then((response) => {
                    console.log(response);
                    if (response.status == 204) {
                        value.setLoading(false)
                        Swal.fire('The article has been deleted successfully', '', 'success')
                        value.setArticleDataSeed(Math.random())
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
                                    Articles
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
                                        placeholder="Search for article..."
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

                        <div className="flex justify-end m-10">
                            <Link to="/article-editor">
                                <button className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                                    <img src={newFolderIcon} className="h-7 mx-1 fill-current text-white" alt="new article" />
                                    New Article
                                </button></Link>
                        </div>
                    </div>
                    <div
                        class="relative flex flex-col w-full h-full overflow-scroll md:overflow-hidden text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                        <table class="w-full text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Title
                                        </p>
                                    </th>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Department
                                        </p>
                                    </th>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Author
                                        </p>
                                    </th>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Article Type
                                        </p>
                                    </th>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Thumbnail
                                        </p>
                                    </th>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Tags
                                        </p>
                                    </th>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Published
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
                                {value.articles.map((article) => (
                                    article.article_type == 'General' ? (

                                        <tr class="even:bg-blue-gray-50/50">
                                            <td class="p-4">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {article.title}
                                                </p>
                                            </td>

                                            <td class="p-4">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {article.department}
                                                </p>
                                            </td>

                                            <td class="p-4">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {article.owner}
                                                </p>
                                            </td>

                                            <td class="p-4">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {article.article_type}
                                                </p>
                                            </td>

                                            <td class="p-4">
                                                <img
                                                    src={`${getBackendUrl()}` + article.thumbnail}
                                                    alt="thumbnail"
                                                    className="w-24 rounded-md md:rounded-lg object-contain"
                                                />
                                            </td>

                                            <td class="p-4">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {article.tags}
                                                </p>
                                            </td>

                                            <td class="p-4">
                                                {article.draft ? <img src={draftIcon} className="h-7 mx-1" /> : <img src={publishedIcon} className="h-7 mx-1" />}
                                            </td>

                                            <td class="p-4">
                                                <div className="flex items-center space-x-3">
                                                    <p onClick={() => editArticle(article, getEditStatus(article))} class="hover:cursor-pointer block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                        {getEditStatus(article)}
                                                    </p>

                                                    {article.owner === localStorage.getItem('username') ? (
                                                        <>
                                                            <p onClick={() => publishStatusToggle(article)} class="hover:cursor-pointer block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                                {article.draft ? 'Publish' : 'Draft'}
                                                            </p>
                                                            <p onClick={() => deleteArticle(article.id)} class="hover:cursor-pointer block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                                Delete
                                                            </p>
                                                        </>

                                                    ) : ('')}

                                                </div>
                                            </td>

                                        </tr>
                                    ) : ('')
                                ))
                                }
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

export default ManageArticles;