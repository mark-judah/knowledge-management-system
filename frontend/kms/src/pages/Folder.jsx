import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import slugify from 'react-slugify';
import { Link, useLocation } from "react-router-dom";
import folderIcon from "../assets/folder.svg"

const Folder = () => {
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
            "parent": "Departments/Sales",
        },
        {
            "title": "Invoices",
            "parent": "Departments/Sales",
        },
        {
            "title": "January",
            "parent": "Departments/Sales/Invoices",
        },
        {
            "title": "Week 1",
            "parent": "Departments/Sales/Invoices/January",
        },
        {
            "title": "January",
            "parent": "Departments/Sales",
        },
        {
            "title": "Receipts",
            "parent": "Departments/Sales",
        },
        {
            "title": "Templates",
            "parent": "Departments/Sales",
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
                                {currentFolder[currentFolder.length - 1]}
                            </span>
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                        </h2>

                    </div>
                </div>
            </div>
            <div className="ml-5 grid grid-cols-2 sm:grid-cols-8  lg:grid-cols-12 gap-2 p-5">
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
        </div>
    );
}

export default Folder;