import React, { useState } from "react";
import departmentIcon from "../assets/folder.svg"
import folderClosedIcon from "../assets/closed_folder.svg"
import folderOpenIcon from "../assets/open_folder.svg"
import newArticleIcon from "../assets/new_article.svg"
import { Link } from "react-router-dom";

const Departments = () => {

    const [departments, setDepartments] = useState([
        {
            "image": departmentIcon,
            "title": "Finance",
            "articles": "20",
            "folderOpen": false
        },
        {
            "image": departmentIcon,
            "title": "Marketing",
            "articles": "10",
            "folderOpen": false
        },
        {
            "image": departmentIcon,
            "title": "Sales",
            "articles": "2",
            "folderOpen": false
        },
        {
            "image": departmentIcon,
            "title": "Human resources",
            "articles": "30",
            "folderOpen": false
        },
        {
            "image": departmentIcon,
            "title": "Information Technology",
            "articles": "17",
            "folderOpen": false
        },
    ]);

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
        <div className="p-5">
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
                        <div>
                            <img src={department.image} className="h-6" />
                        </div>
                        <div>
                            <p>{department.title}</p>
                        </div>
                        <div>
                            <p>({department.articles})</p>
                        </div>
                        <div className="w-2/3">
                            <hr className="h-0.5 bg-gray-500" />
                        </div>
                    </div>

                    <div>
                        {department.folderOpen == true ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-8 p-5">
                                {articles.map((article, index) => (
                                    (article.department === department.title ? (
                                        <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                                            <div class="p-4">
                                                <h5 class="mb-2 text-slate-800 text-xl font-semibold">
                                                    {article.title}
                                                </h5>
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
                                    ) : (
                                        index === 1 ? (
                                            <Link to="/article-editor">
                                                <div class="relative min-h-80 w-[30vh] flex flex-col justify-center items-center my-6 bg-white shadow-sm border border-slate-200 rounded-lg p-2">
                                                    <div class="p-3 text-center">
                                                        <div class="flex justify-center mb-4">
                                                            <img src={newArticleIcon} className="h-12" />
                                                        </div>
                                                        <div class="flex justify-center mb-2">
                                                            <h5 class="text-slate-800 text-2xl font-semibold">
                                                                Add a new article
                                                            </h5>
                                                        </div>
                                                        <p class="block text-slate-600 leading-normal font-light mb-4 max-w-lg">
                                                            Share knowledge, and collaborate.
                                                        </p>

                                                    </div>
                                                </div>
                                            </Link>) : (
                                            ''
                                        )
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