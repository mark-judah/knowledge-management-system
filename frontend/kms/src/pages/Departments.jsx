import React, { useEffect, useState } from "react";
import departmentIcon from "../assets/folder.svg"
import folderClosedIcon from "../assets/closed_folder.svg"
import folderOpenIcon from "../assets/open_folder.svg"
import newArticleIcon from "../assets/new_article.svg"
import newFolderIcon from "../assets/new_folder.svg"
import deleteDepartmentIcon from "../assets/delete_black.svg"
import slugify from 'react-slugify';

import { Link } from "react-router-dom";

const Departments = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    const [departments, setDepartments] = useState([
        {
            "image": departmentIcon,
            "title": "Finance",
            "articles": "4",
            "folderOpen": false
        },
        {
            "image": departmentIcon,
            "title": "Marketing",
            "articles": "1",
            "folderOpen": false
        },
        {
            "image": departmentIcon,
            "title": "Human Resources",
            "articles": "1",
            "folderOpen": false
        },
        {
            "image": departmentIcon,
            "title": "Information Technology",
            "articles": "1",
            "folderOpen": false
        },
    ]);

    const [folders, setFolders] = useState([
        {
            "title": "Articles",
            "department": "Human Resources",
        },
        {
            "title": "Articles",
            "department": "Marketing",
        },
        {
            "title": "Articles",
            "department": "Finance",
        },
        {
            "title": "Articles",
            "department": "Information Technology",
        },
        {
            "title": "Invoices",
            "department": "Finance",
        },
        {
            "title": "Receipts",
            "department": "Finance",
        },
        {
            "title": "Templates",
            "department": "Finance",
        },
    ]);

    const toggleFolder = (title, folderStatus) => {
        console.log(title)
        const currentFoldersIndex = departments.findIndex((department) => department.title === title);
        if (folderStatus == true) {
            const updatedDepartment = { ...departments[currentFoldersIndex], folderOpen: false };
            const newDepartmentsArray = [...departments];
            newDepartmentsArray[currentFoldersIndex] = updatedDepartment;
            setDepartments(newDepartmentsArray);
        } else {
            const updatedDepartment = { ...departments[currentFoldersIndex], folderOpen: true };
            const newDepartmentsArray = [...departments];
            newDepartmentsArray[currentFoldersIndex] = updatedDepartment;
            setDepartments(newDepartmentsArray);
        }
    }

    return (
        <div className="p-5 mt-8">
            <div class='flex items-center justify-center'>
                <div class='w-full max-w-lg px-10 py-5 mx-auto'>
                    <div class='max-w-md mx-auto space-y-3'>
                        <h2 class="flex flex-row flex-nowrap items-center my-2">
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            <span class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                All Departments
                            </span>
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                        </h2>

                    </div>
                </div>
            </div>

            {departments.map((department) =>
                <div className="flex flex-col justify-center">

                    <div className="flex justify-start items-center space-x-3 my-5">
                        <div>
                            {department.folderOpen == true ? (
                                <img onClick={() => toggleFolder(department.title, department.folderOpen)} src={folderOpenIcon} className="h-6" />
                            ) : (
                                <img onClick={() => toggleFolder(department.title, department.folderOpen)} src={folderClosedIcon} className="h-6" />
                            )}
                        </div>
                        <Link to={slugify(department.title)}>
                            <div>
                                <img src={department.image} className="h-6" />
                            </div>
                        </Link>

                        <Link to={slugify(department.title)}>
                            <div>
                                <p>{department.title}</p>
                            </div>
                        </Link>

                        <Link to={slugify(department.title)}>
                            <div>
                                <p>({department.articles})</p>
                            </div>
                        </Link>

                        <div className="w-2/3">
                            <Link to={slugify(department.title)}>
                                <hr className="h-0.5 bg-gray-500" />
                            </Link>

                        </div>

                        {/* <img src={newArticleIcon} className="h-6" /> */}
                        <img src={newFolderIcon} className="h-6" />

                    </div>

                    <div>
                        {department.folderOpen == true ? (
                            <div className="ml-5 grid grid-cols-2 sm:grid-cols-8  lg:grid-cols-12 gap-2 p-5">
                                {folders.map((folder, index) => (
                                    (folder.department === department.title ? (
                                        <Link to={`/departments/${slugify(department.title)}/${slugify(folder.title)}`} >
                                            <div className="flex flex-col space-y-2">
                                                <div>
                                                    <img src={departmentIcon} className="h-24" />
                                                </div>

                                                <div>
                                                    <p>{folder.title}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ) : (
                                        ''
                                    ))
                                ))}
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}

export default Departments;