import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumbs";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import newFolderIcon from "../assets/new_folder_white.svg"
import closeIcon from "../assets/close.svg"
import editIcon from "../assets/edit_white.svg"
import deleteIcon from "../assets/delete.svg"
import { getBackendUrl, getFrontendUrl } from "../constants";
import relatedArticleIcon from "../assets/related_article.svg"
import slugify from "react-slugify";
import Popup from 'reactjs-popup';

const ManageFaqs = () => {
    const location = useLocation();
    const path = location.pathname.split('/');
    const [fetchedFaqs, setFetchedFaqs] = useState([]);
    const [articles, setArticles] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [relatedArticle, setRelatedArticle] = useState('');
    const [seed, setSeed] = useState(1);


    useEffect(() => {
        window.scrollTo(0, 0)
        Promise.all([
            axios.get(`${getBackendUrl()}` + 'api/faqs/'),
            axios.get(`${getBackendUrl()}` + 'api/articles/')
        ]).then(([faqsResponse, articlesResponse]) => {
            console.log(faqsResponse.data);
            console.log(articlesResponse.data);
            setFetchedFaqs(faqsResponse.data)
            setArticles(articlesResponse.data)
        }).catch(function (error) {
            // handle error
            console.log(error);
        })


    }, [seed])

    const handleSubmit = () => {
        document.getElementById("popup-root").remove()
        let data = {
            "question": question,
            "answer": answer,
            "related_article": relatedArticle
        }
        axios.post(`${getBackendUrl()}` + 'api/faqs/', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response);
        }).catch(function (error) {
            console.log(error)
        })
        setSeed(Math.random())
    }

    const fetchArticle = () => {

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
                                <img src={closeIcon} onClick={()=>document.getElementById("popup-root").remove()} className="h-5 mx-1 hover:cursor-pointer" alt="close modal" />
                            </div>
                        </div>

                        <div>
                            <div className="mt-5 space-y-4">
                                <input onChange={(e) => setQuestion(e.target.value)} type="text" className="mt-2 p-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" placeholder="Question" />
                                <input onChange={(e) => setAnswer(e.target.value)} type="text" className="mt-2 p-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" placeholder="Answer" />
                                <select onChange={(e) => setRelatedArticle(e.target.value)} className="mt-2 p-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                                    <option selected>Add a related article (optional)</option>
                                    {articles.map((article) => (
                                        <option value={`${getFrontendUrl()}` + 'articles/' + slugify(article.title)}>{article.title}</option>
                                    ))}
                                </select>
                            </div>

                        </div>

                        <div className="flex justify-end items-center space-x-2 w-full mt-5">
                            <button onClick={()=>document.getElementById("popup-root").remove()}
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

            <div className="relative flex flex-col justify-center items-center w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border mt-10">
                <table className="w-fit text-left table-auto min-w-max mb-10">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Question
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Answer
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Related Article
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Date Created
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Date Modified
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
                        {fetchedFaqs.map((fetchedFaq) => (
                            <tr className="hover:bg-slate-50 border-b border-slate-200">
                                <td className="p-4 py-5">
                                    <p className="block font-semibold text-sm text-slate-800 w-[30vh]">{fetchedFaq.question}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="block font-semibold text-sm text-slate-800 w-[30vh]">{fetchedFaq.answer}</p>
                                </td>
                                <td className="p-4 py-5">
                                    {fetchedFaq.related_article != null ? (
                                        <Link to={fetchedFaq.related_article} className="block font-semibold text-sm text-slate-800">
                                            <div className="flex">
                                                <p className="text-sm underline mr-1">Open</p>
                                                <img src={relatedArticleIcon} className="w-4 hover:cursor-pointer" onClick={fetchArticle} />
                                            </div>
                                        </Link>
                                    ) : (
                                        <p className="text-sm text-slate-500">
                                            None
                                        </p>
                                    )}
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{fetchedFaq.created_at}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{fetchedFaq.updated_at}</p>
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
    );
}

export default ManageFaqs;