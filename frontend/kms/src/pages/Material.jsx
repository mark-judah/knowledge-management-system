import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import slugify from "react-slugify";
import durationIcon from "../assets/duration.svg"
import BreadCrumb from "../components/BreadCrumbs";
import { getUrl } from "../constants";
import Empty from "../components/Empty";
import newArticleIcon from "../assets/draft.svg"

const Material = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const location = useLocation();
    const { data } = location.state
    const path = location.pathname.split('/')
    const currentRoute = path[2]
    console.log(currentRoute)

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <div class='flex flex-col items-center justify-center'>
                <div class='w-full max-w-lg px-10 py-5 mx-auto'>
                    <div class='max-w-md mx-auto space-y-3'>
                        <h2 class="flex flex-row flex-nowrap items-center my-2">
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            <span class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                {currentRoute} Material
                            </span>
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                        </h2>

                    </div>
                </div>
                <BreadCrumb path={path} />
            </div>
            <Link to="/article-editor">
                <div className="flex justify-end mx-10 mt-10">
                    <button class="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                        <img src={newArticleIcon} className="h-7 mx-1" alt="new article" />
                        New Material
                    </button>
                </div>
            </Link>


            <div className="flex justify-center items-center p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {data.map((item, index) => (
                        item.article_type == 'Induction' && slugify(item.department) == currentRoute ? (
                            slugify(item.department) === currentRoute ? (
                                <div class="relative flex flex-col md:flex-row my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
                                    <div class="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
                                        <img
                                            src={`${getUrl()}` + item.thumbnail}
                                            alt="thumbnail"
                                            class="h-full w-full rounded-md md:rounded-lg object-contain"
                                        />
                                    </div>
                                    <div class="p-6">
                                        <div class="flex justify-center items-center space-x-2 mb-4 rounded-full bg-black py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-fit text-center">
                                            <img src={durationIcon} className="h-6" alt="duration" />
                                            <p>{item.duration}</p>
                                        </div>
                                        <h4 class="mb-2 text-slate-800 text-md font-semibold">
                                            {item.title}
                                        </h4>

                                        <div>
                                            <Link to={'/articles/' + slugify(item.title)} state={{ data: item.article_content }}
                                                class="text-slate-800 font-semibold text-xs hover:underline flex items-center">
                                                Chapter {item.chapter}
                                                <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ''
                            )
                        ) : (
                            ''
                        )

                    ))}
                </div>
            </div>
        </div>

    );
}

export default Material;