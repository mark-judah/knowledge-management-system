import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import slugify from 'react-slugify';
import { Link, useLocation } from "react-router-dom";
import folderIcon from "../assets/folder.svg"
import BreadCrumb from "../components/BreadCrumbs";
import newFileIcon from "../assets/draft.svg"
import { extensionsMapper, fileTypesIcons, getBackendUrl } from "../constants";
import Empty from "../components/Empty";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FileUpload from "../components/FileUpload";
import axios from "axios";
import closeIcon from "../assets/close.svg"
import newDepartentIcon from "../assets/new_folder_white.svg"
import { MyContext } from "../MyContextProvider";


const Folder = () => {
    const location = useLocation();
    const currentFolder = location.pathname.split('/');
    const [newFolder, setNewFolder] = useState('');
    const { id } = location.state
    const { department } = location.state
    const value = useContext(MyContext)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    let folderExists = value.folders.some(folder => slugify(folder['path']) === slugify(slugify(location.pathname)))

    const FileIconMapper = (props) => {
        const fileExtension = props.file.title.split('.').pop()
        console.log(fileExtension)
        const fileType = extensionsMapper[fileExtension]
        console.log(fileType)
        let icon = ''
        if (fileType == undefined) {
            icon = fileTypesIcons.unknown
        } else {
            icon = fileTypesIcons[fileType]
        }

        return (
            <div className="flex flex-col justify-center items-center w-fit">
                <div className="p-2">
                    <img src={icon} className="h-24" />
                </div>

                <div>
                    <p className="text-xs">{props.file.title}</p>
                </div>
            </div>
        )

    }

    const saveFolder = (id, department) => {
        let filteredPath = currentFolder.filter((item) => item != 'departments' && item != slugify(department) && item != '')
        let formattedPath = filteredPath.join('/')
        let data = {
            "title": slugify(newFolder),
            "department": id,
            "path": "Departments" + "/" + department + "/" + formattedPath,
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
        <div className="min-h-screen bg-[#F5F5F5]">
            <div className='flex flex-col items-center justify-center'>
                <div className='w-full max-w-lg px-10 py-5 mx-auto'>
                    <div className='max-w-md mx-auto space-y-3'>
                        <h2 className="flex flex-row flex-nowrap items-center my-2">
                            <span className="flex-grow block border-t border-black" aria-hidden="true"
                                role="presentation"></span>
                            <span
                                className="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                {currentFolder[currentFolder.length - 1]}
                            </span>
                            <span className="flex-grow block border-t border-black" aria-hidden="true"
                                role="presentation"></span>
                        </h2>

                    </div>
                </div>
                <BreadCrumb path={currentFolder} />
            </div>

            <div className="flex justify-end items-center space-x-3 mx-10 mt-10">
                <Popup trigger={
                    <button className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none"
                        type="button">
                        <img src={newFileIcon} className="h-7 mx-1" alt="new upload" />
                        New File
                    </button>
                } modal nested>
                    <FileUpload department={department} id={id} />
                </Popup>

                <Popup trigger={
                    <button className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none"
                        type="button">
                        <img src={newDepartentIcon} className="h-7 mx-1" alt="new upload" />
                        New Folder
                    </button>} modal nested>
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
                                <input value={newFolder} onChange={(e) => setNewFolder(e.target.value)} type="text" className="mt-2 p-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
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
                                    type="button" onClick={() => { close(); saveFolder(id, department) }}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>

            </div>

            {folderExists || value.files.length > 0 ? (
                <div id="" className="ml-5 grid grid-cols-2 sm:grid-cols-8  lg:grid-cols-12 gap-2 p-5">
                    {value.folders.map((folder, index) => (
                        slugify(folder.path) === slugify(location.pathname) ? (
                            <Link to={`${location.pathname}/${slugify(folder.title)}`} state={{ id: id, department: department }}>
                                <div className="flex flex-col space-y-2">
                                    <div>
                                        <img src={folderIcon} className="h-24" alt="folder" />
                                    </div>

                                    <div>
                                        <p className="text-xs">{folder.title}</p>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            ''
                        )
                    ))}

                    {value.files.map((file) => (
                        slugify(file.path) === slugify(location.pathname) ? (
                            <div>
                                <FileIconMapper file={file} />
                            </div>
                        ) : (
                            ''
                        )
                    ))}
                </div>
            ) : (
                <Empty />
            )
            }


        </div>
    );
}

export default Folder;