import React, { useContext, useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumbs";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import newFolderIcon from "../assets/new_folder_white.svg"
import closeIcon from "../assets/close.svg"
import editIcon from "../assets/edit_white.svg"
import deleteIcon from "../assets/delete.svg"
import { getBackendUrl, getFrontendUrl } from "../constants";
import slugify from "react-slugify";
import Popup from 'reactjs-popup';
import { MyContext } from "../MyContextProvider";
import LoadingAnimation from "../components/LoadingAnimation";
import Swal from "sweetalert2";


const ManageFaqs = () => {
    const location = useLocation();
    const path = location.pathname.split('/');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [relatedArticle, setRelatedArticle] = useState('');
    const value = useContext(MyContext)


    useEffect(() => {
        window.scrollTo(0, 0)

    }, [])

    const handleSubmit = () => {
        document.getElementById("popup-root").remove()
        let data = {
            "question": question,
            "answer": answer,
            "related_article": relatedArticle
        }
        axios.post(`${getBackendUrl()}` + 'api/faqs/', data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log(response);
            if (response.status == 201) {
                value.setLoading(false)
                Swal.fire('Faq created successfully', '', 'success')
                value.setFaqsDataSeed(Math.random())
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
        // setSeed(Math.random())
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
                                    faqs
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
                                        placeholder="Search for faq..."
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
                            <div className="flex justify-end mx-10">
                                <button className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                                    <img src={newFolderIcon} className="h-7 mx-1 fill-current text-white" alt="new article" />
                                    New Faq
                                </button>
                            </div>
                        } modal nested>
                            <div className="p-5">
                                <div className="flex justify-between w-full mb-5">
                                    <div className="flex flex-col space-y-2">
                                        <p className="text-black font-bold text-xl">New Faq</p>
                                        <p className="text-gray-500 text-sm"></p>
                                    </div>

                                    <div>
                                        <img src={closeIcon} onClick={() => document.getElementById("popup-root").remove()} className="h-5 mx-1 hover:cursor-pointer" alt="close modal" />
                                    </div>
                                </div>

                                <div>
                                    <div className="mt-5 space-y-4">
                                        <input onChange={(e) => setQuestion(e.target.value)} type="text" className="mt-2 p-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" placeholder="Question" />
                                        <input onChange={(e) => setAnswer(e.target.value)} type="text" className="mt-2 p-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" placeholder="Answer" />
                                        <select onChange={(e) => setRelatedArticle(e.target.value)} className="mt-2 p-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                                            <option selected>Add a related article (optional)</option>
                                            {value.articles.map((article) => (
                                                <option value={`${getFrontendUrl()}` + 'articles/' + slugify(article.title)}>{article.title}</option>
                                            ))}
                                        </select>
                                    </div>

                                </div>

                                <div className="flex justify-end items-center space-x-2 w-full mt-5">
                                    <button onClick={() => document.getElementById("popup-root").remove()}
                                        className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-black hover:border-black focus:text-white"
                                        type="button">
                                        Cancel
                                    </button>

                                    <button
                                        className="rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg"
                                        type="button" onClick={handleSubmit}>
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
                                            Question
                                        </p>
                                    </th>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Answer
                                        </p>
                                    </th>
                                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Realated Article
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
                                {value.faqs.map((faq) => (
                                    <tr class="even:bg-blue-gray-50/50">
                                        <td class="p-4">
                                            <p class="w-[20vh] block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {faq.question}
                                            </p>
                                        </td>

                                        <td class="p-4">
                                            <p class="w-[40vh] block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {faq.answer}
                                            </p>
                                        </td>

                                        <td class="p-4">
                                            <p class="w-[30vh] block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {faq.related_article}
                                            </p>
                                        </td>

                                        <td class="p-4">
                                            <div className="flex items-center space-x-3">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    Edit
                                                </p>

                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
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

export default ManageFaqs;