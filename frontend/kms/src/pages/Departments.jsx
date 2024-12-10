import React, { useContext, useEffect, useState } from "react";
import departmentIcon from "../assets/folder.svg"
import folderClosedIcon from "../assets/closed_folder.svg"
import folderOpenIcon from "../assets/open_folder.svg"
import newFileIcon from "../assets/new_article.svg"
import newDepartentIcon from "../assets/new_folder.svg"
import slugify from 'react-slugify';
import { getBackendUrl } from "../constants";
import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumbs";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FileUpload from "../components/FileUpload";
import closeIcon from "../assets/close.svg"
import { MyContext } from "../MyContextProvider";


const Departments = () => {
    const [newFolder, setNewFolder] = useState('');
    const value = useContext(MyContext)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const location = useLocation();
    const path = location.pathname.split('/');

    const toggleFolder = (title, folderStatus) => {
        console.log(title)
        const currentFoldersIndex = value.departments.findIndex((department) => department.title === title);
        if (folderStatus == true) {
            const updatedDepartment = { ...value.departments[currentFoldersIndex], folderOpen: false };
            const newDepartmentsArray = [...value.departments];
            newDepartmentsArray[currentFoldersIndex] = updatedDepartment;
            value.setDepartments(newDepartmentsArray);
        } else {
            const updatedDepartment = { ...value.departments[currentFoldersIndex], folderOpen: true };
            const newDepartmentsArray = [...value.departments];
            newDepartmentsArray[currentFoldersIndex] = updatedDepartment;
            value.setDepartments(newDepartmentsArray);
        }
    }

    const saveFolder = (id, department) => {
        let data = {
            "title": slugify(newFolder),
            "department": id,
            "path": "Departments" + "/" + department,
            "owner": localStorage.getItem('username')
        }
        axios.post(`${getBackendUrl()}` + 'api/folders/', data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log(response);
        }).catch(function (error) {
            console.log(error)
        }).finally(
            value.setFoldersDataSeed(Math.random())
        )
    }

    return (
        <div className="p-5 pt-8 bg-[#F5F5F5] min-h-screen">
            <div className='flex flex-col items-center justify-center'>
                <div className='w-full max-w-lg px-10 py-5 mx-auto'>
                    <div className='max-w-md mx-auto space-y-3'>
                        <h2 className="flex flex-row flex-nowrap items-center my-2">
                            <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            <span className="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                All Departments
                            </span>
                            <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                        </h2>

                    </div>
                </div>
                <BreadCrumb path={path} />
            </div>

            {value.departments.map((department) =>
                <div className="flex flex-col justify-center">

                    <div className="flex justify-start items-center space-x-3 my-5">
                        <div>
                            {department.folderOpen == true ? (
                                <img onClick={() => toggleFolder(department.title, department.folderOpen)} src={folderOpenIcon} className="h-6" />
                            ) : (
                                <img onClick={() => toggleFolder(department.title, department.folderOpen)} src={folderClosedIcon} className="h-6" />
                            )}
                        </div>
                        <Link to={slugify(department.title)} state={{ id: department.id, department: department.title }}>
                            <div>
                                <img className="w-6" src={departmentIcon} />
                            </div>
                        </Link>

                        <Link to={slugify(department.title)} state={{ id: department.id, department: department.title }}>
                            <div>
                                <p>{department.title}</p>
                            </div>
                        </Link>

                        <Link to={slugify(department.title)} state={{ id: department.id, department: department.title }}>
                            <div>
                                <p>({value.folders.filter((folder) => folder.department === department.title).length})</p>
                            </div>
                        </Link>

                        <div className="w-2/3">
                            <Link to={slugify(department.title)} state={{ id: department.id, department: department.title }}>
                                <hr className="h-0.5 bg-gray-500" />
                            </Link>

                        </div>
                        <Popup trigger={
                            <img src={newDepartentIcon} className="h-6 hover:cursor-pointer" />
                        } modal nested>
                            {close => (
                                <div className="p-5">
                                    <div className="flex justify-between w-full mb-5">
                                        <div className="flex flex-col space-y-2">
                                            <p className="text-black font-bold text-xl">New Folder</p>
                                            <p className="text-gray-500 text-sm"></p>
                                        </div>

                                        <div>
                                            <img src={closeIcon} onClick={close} className="h-5 mx-1 hover:cursor-pointer" alt="close modal" />
                                        </div>
                                    </div>

                                    <div className="relative mt-5">
                                        <input value={newFolder} onChange={(e) => setNewFolder(e.target.value)} type="text" className="mt-2 p-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                            placeholder="Name" />

                                    </div>

                                    <div className="flex justify-end items-center space-x-2 w-full mt-5">
                                        <button onClick={close}
                                            className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-black hover:border-black focus:text-white"
                                            type="button">
                                            Cancel
                                        </button>

                                        <button
                                            className="rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg"
                                            type="button" onClick={() => { close(); saveFolder(department.id, department.title) }}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Popup>

                        <Popup trigger={
                            <img src={newFileIcon} className="h-6 hover:cursor-pointer" />
                        } modal nested>
                            <FileUpload department={department.title} id={department.id} />
                        </Popup>
                    </div>

                    <div>
                        {department.folderOpen == true ? (
                            <div>
                                <p className="text-xs sm:text-sm text-slate-400 ml-10">{value.folders.filter((folder) => folder.department === department.title).length > 0 ? 'Latest Folders' : 'No Files/Folders'}</p>

                                <div className="ml-5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-2 p-5">
                                    {value.folders.filter((folder) => folder.department === department.title).length > 0 ? (
                                        value.folders.map((folder, index) => (
                                            (folder.department === department.title ? (
                                                <Link to={"/" + folder.path.toLowerCase() + "/" + folder.title} state={{ id: department.id, department: department.title }}>
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
                                        ))
                                    ) : (
                                        ''
                                    )}
                                </div>
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