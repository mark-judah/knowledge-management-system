import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import slugify from 'react-slugify';
import { Link, useLocation } from "react-router-dom";
import folderIcon from "../assets/folder.svg"
import emptyIcon from "../assets/empty.svg"


const Folder = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    const location = useLocation();
    const { departmentName, folderName } = useParams();
    console.log(departmentName, folderName)
    const currentFolder = location.pathname.split('/');
    const [folders, setFolders] = useState([
        {
            "title": "Articles",
            "parent": "Departments/Human resources",
        },
        {
            "title": "Articles",
            "parent": "Departments/Finance",
        },
        {
            "title": "Invoices",
            "parent": "Departments/Finance",
        },
        {
            "title": "January",
            "parent": "Departments/Finance/Invoices",
        },
        {
            "title": "Week 1",
            "parent": "Departments/Finance/Invoices/January",
        },
        {
            "title": "January",
            "parent": "Departments/Finance",
        },
        {
            "title": "Receipts",
            "parent": "Departments/Finance",
        },
        {
            "title": "Templates",
            "parent": "Departments/Finance",
        },
    ]);
    const [articles, setArticles] = useState([
        {
            "title": "How to apply for leave",
            "department": "Human Resources",
            "previewText": "Applying for leave in Odoo is simple and efficient. Follow these steps to request time off, track your leave status, and ensure proper approval through the system",
            "comments": ["Great!", "Thanks!"],
            "contributors": ["Oloo,Fatuma,Wanjiku,Kipruto"],
            "version": "v1",
            "type":"Induction"
        },
        {
            "title": "Company Policies and Handbook",
            "department": "Human Resources",
            "previewText": "Our company policies ensure a productive, safe working environment. This article provides an overview of key policies that all employees should familiarize themselves with, from attendance to workplace behavior.",
            "comments": ["Great!", "Thanks!"],
            "contributors": ["Oloo,Fatuma,Wanjiku,Kipruto"],
            "version": "v1",
            'type':"General"
        },
    ]);
    let folderExists = folders.some(folder => slugify(folder['parent']) === slugify(slugify(location.pathname)))
    let articleExists = articles.some(article => slugify(article['department']) === slugify(currentFolder[currentFolder.length - 2]))

    console.log(slugify(currentFolder[currentFolder.length - 2]))

    return (
        <div className="h-screen">
            <div class='flex items-center justify-center'>
                <div class='w-full max-w-lg px-10 py-5 mx-auto'>
                    <div class='max-w-md mx-auto space-y-3'>
                        <h2 class="flex flex-row flex-nowrap items-center my-2">
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            <span class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                {currentFolder[currentFolder.length - 1]}
                            </span>
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                        </h2>

                    </div>
                </div>
            </div>
            {folderExists ? (
                <div id="" className="ml-5 grid grid-cols-2 sm:grid-cols-8  lg:grid-cols-12 gap-2 p-5">
                    {folders.map((folder, index) => (
                        slugify(folder.parent) === slugify(location.pathname) ? (
                            <Link to={`${location.pathname}/${slugify(folder.title)}`} >
                                <div className="flex flex-col space-y-2">
                                    <div>
                                        <img src={folderIcon} className="h-24" />
                                    </div>

                                    <div>
                                        <p>{folder.title}</p>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            ''
                        )
                    ))}
                </div>
            ) : (
                articleExists ? (
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
                ) : (
                    <div className="h-[80vh] flex justify-center items-center">
                        <div className="flex flex-col items-center space-y-5">
                            <div>
                                <img src={emptyIcon} className="w-[40vh]" />
                            </div>
                            <div>
                                <p className="text-3xl mt-5 font-bold">Nothing to see here</p>
                            </div>
                            <div>
                                <button class="min-w-32 rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                                    New File / Folder
                                </button>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default Folder;