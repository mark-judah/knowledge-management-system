import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumbs";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import newFolderIcon from "../assets/new_folder_white.svg"
import editIcon from "../assets/edit_white.svg"
import deleteIcon from "../assets/delete.svg"
import { getBackendUrl } from "../constants";

const ManageArticles = () => {
    const location = useLocation();
    const path = location.pathname.split('/');
    const [fetchedArticles, setFetchedArticles] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get('http://localhost:8000/api/articles/')
            .then(function (response) {
                setFetchedArticles(response.data)
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }, [])

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

                <div className="flex justify-end mx-10">
                    <Link to="/article-editor">
                        <button className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                            <img src={newFolderIcon} className="h-7 mx-1 fill-current text-white" alt="new article" />
                            New Article
                        </button></Link>
                </div>

            </div>

            <div className="relative flex flex-col justify-center items-center w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border mt-10">
                <table className="w-fit text-left table-auto min-w-max mb-10">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Name
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Department
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Article Type
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Thumbnail
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Tags
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
                        {fetchedArticles.filter((article)=>article.article_type=='General').map((fetchedArticle) => (
                            <tr className="hover:bg-slate-50 border-b border-slate-200">
                                <td className="p-4 py-5">
                                    <p className="block font-semibold text-sm text-slate-800">{fetchedArticle.title}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{fetchedArticle.department}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{fetchedArticle.article_type}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <img className="w-24" src={`${getBackendUrl()}` + fetchedArticle.thumbnail} alt="card-image" />
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{fetchedArticle.tags}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">TODO</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">TODO</p>
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

export default ManageArticles;