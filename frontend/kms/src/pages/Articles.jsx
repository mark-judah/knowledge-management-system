import React, { useEffect, useState } from "react";
import newArticleIcon from "../assets/draft.svg"
import { Link } from "react-router-dom";

const Articles = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    const [articles, setArticles] = useState([
        {
            "title": "How to apply for leave",
            "department": "Human Resources",
            "previewText": "Applying for leave in Odoo is simple and efficient. Follow these steps to request time off, track your leave status, and ensure proper approval through the system",
            "comments": ["Great!", "Thanks!"],
            "contributors": ["Oloo,Fatuma,Wanjiku,Kipruto"],
            "version": "v1",
            "type": "Induction",
            "tags":["leave,odoo"]
        },
        {
            "title": "Company Policies and Handbook",
            "department": "Human Resources",
            "previewText": "Our company policies ensure a productive, safe working environment. This article provides an overview of key policies that all employees should familiarize themselves with, from attendance to workplace behavior.",
            "comments": ["Great!", "Thanks!"],
            "contributors": ["Oloo,Fatuma,Wanjiku,Kipruto"],
            "version": "v1",
            'type': "General",
            "tags":["policy"]
        },
    ]);
    return (
        <div>
            <div className="flex flex-col">
                <div class='flex items-center justify-center'>
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

            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-8 p-5">
                {articles.map((article, index) => (
                    <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
                        <div class="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                            <span class="text-sm font-bold text-black">
                                {article.title}
                            </span>
                        </div>
                        <div class="p-4">
                            <p class="text-slate-600 leading-normal font-light">
                                {article.previewText}
                            </p>
                        </div>
                        <div class="mx-3 border-t border-slate-200 pb-3 pt-2 px-1">
                            <span class="text-sm text-black font-medium">
                                Last updated: 4 hours ago
                            </span>
                        </div>
                    </div>

                ))
                }

            </div>
        </div>
    );
}

export default Articles;