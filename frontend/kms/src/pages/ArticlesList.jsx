import React, { useEffect, useState } from "react";
import newArticleIcon from "../assets/draft.svg"
import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumbs";
import axios from "axios";
import slugify from "react-slugify";
import { getBackendUrl } from "../constants";
import Empty from "../components/Empty";

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get('http://localhost:8000/api/articles/')
            .then(function (response) {
                setArticles(response.data)
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }, [])

    
    const location = useLocation();
    const path = location.pathname.split('/');



    return (
        <div className="min-h-screen">
            <div className="flex flex-col">
                <div class='flex flex-col items-center justify-center'>
                    <div class='w-full max-w-lg px-10 py-5 mx-auto'>
                        <div class='max-w-md mx-auto space-y-3'>
                            <h2 class="flex flex-row flex-nowrap items-center my-2">
                                <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                                <span class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                    All Articles
                                </span>
                                <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            </h2>

                        </div>
                    </div>
                    <BreadCrumb path={path} />

                </div>

                <Link to="/article-editor">
                    <div className="flex justify-end mx-10">
                        <button class="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                            <img src={newArticleIcon} className="h-7 mx-1" alt="new article" />
                            New Article
                        </button>
                    </div>
                </Link>
            </div>

            {articles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8 px-5">
                    {articles.map((article, index) => (
                        article.article_type === 'General' ? (
                            <Link to={'/articles/' + slugify(article.title)} state={{ data: article.article_content }}>
                                <a href="javascript:void(0)">
                                    <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-[40vh]  md:w-[45vh] xl:w-[55vh] ">
                                        <div class="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                                            <img src={`${getBackendUrl()}`+article.thumbnail} alt="card-image" />
                                        </div>
                                        <div class="px-4">
                                            <div class="flex justify-start space-x-1 items-center">
                                                {/* {JSON.parse(article.tags).map((tag) => (
                                                    <div className="mb-4 rounded-full bg-black py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-fit text-center">
                                                        {tag}
                                                    </div>
                                                ))} */}
                                            </div>
                                            <h6 class="mb-2 text-slate-800 text-xl font-semibold">
                                               {article.title}
                                            </h6>

                                        </div>

                                        <div class="flex flex-col p-4 text-sm">
                                            <span class="text-slate-800 font-semibold">{article.department} Department</span>
                                            <span class="text-slate-600">
                                                January 10, 2024
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </Link>

                        ) : ('')
                    ))}
                </div>
            ) : (
               <Empty/>
            )

            }

        </div >
    );
}

export default Articles;