import React, { useState } from "react";

const Articles = () => {
    const [articles, setArticles] = useState([
        {
            "title": "How to apply for leave",
            "department": "Human resources",
            "previewText": "Applying for leave in Odoo is simple and efficient. Follow these steps to request time off, track your leave status, and ensure proper approval through the system",
            "comments": ["Great!", "Thanks!"],
            "contributors": ["Oloo,Fatuma,Wanjiku,Kipruto"],
            "version": "v1"
        },
        {
            "title": "Company Policies and Handbook",
            "department": "Human resources",
            "previewText": "Our company policies ensure a productive, safe working environment. This article provides an overview of key policies that all employees should familiarize themselves with, from attendance to workplace behavior.",
            "comments": ["Great!", "Thanks!"],
            "contributors": ["Oloo,Fatuma,Wanjiku,Kipruto"],
            "version": "v1"
        },
    ]);
    return (
        <div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-8 p-5">
                {articles.map((article, index) => (
                    <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                        <div class="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                            <span class="text-sm font-medium text-slate-600">
                                {article.title}
                            </span>
                        </div>
                        <div class="p-4">
                            <p class="text-slate-600 leading-normal font-light">
                                {article.previewText}
                            </p>
                        </div>
                        <div class="mx-3 border-t border-slate-200 pb-3 pt-2 px-1">
                            <span class="text-sm text-slate-600 font-medium">
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