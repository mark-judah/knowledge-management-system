import React, { useCallback, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import slugify from 'react-slugify';
import { Link, useLocation } from "react-router-dom";
import folderIcon from "../assets/folder.svg"
import BreadCrumb from "../components/BreadCrumbs";
import newUploadIcon from "../assets/upload.svg"
import Modal from 'react-modal'
import close from "../assets/close.svg"
import uploadFileIcon from "../assets/upload_black.svg"
import deleteIcon from "../assets/delete_black.svg"
import { extensionsMapper, fileTypesIcons } from "../constants";
import Empty from "../components/Empty";

const Folder = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const location = useLocation();
    const { departmentName, folderName } = useParams();
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
            "type": "Induction"
        },
        {
            "title": "Company Policies and Handbook",
            "department": "Human Resources",
            "previewText": "Our company policies ensure a productive, safe working environment. This article provides an overview of key policies that all employees should familiarize themselves with, from attendance to workplace behavior.",
            "comments": ["Great!", "Thanks!"],
            "contributors": ["Oloo,Fatuma,Wanjiku,Kipruto"],
            "version": "v1",
            'type': "General"
        },
    ]);

    let folderExists = folders.some(folder => slugify(folder['parent']) === slugify(slugify(location.pathname)))
    let articleExists = articles.some(article => slugify(article['department']) === slugify(currentFolder[currentFolder.length - 2]))
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [mainText, setMainText] = useState('')

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }
    Modal.setAppElement('#root')

    const modalStyle = {
        content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'rgba(100, 100, 111, 0.3) 0px 7px 29px 0px',
            backgroundColor: 'white',
            border: '2px solid rgb(240, 240, 240)',
            borderRadius: '12px',
            position: 'absolute',
            height: 'fit-content',
            width: '90vh',
            left: 'calc(50% - 370px)',
        }
    }


    const convertBytes = (bytes) => {
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
        if (bytes == 0) {
            return "n/a"
        }

        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
        if (i == 0) {
            return bytes + " " + sizes[i]
        }
        return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
    }

    const FileIconMapper = (props) => {
        const fileExtension = props.file.name.split('.').pop()
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
            <div className="flex flex-col justify-center items-center">
                <div className="p-2">
                    <img src={icon} className="h-24" />
                </div>

                <div>
                    <p>{props.file.name}</p>
                </div>
            </div>
        )

    }
    const [dropZoneClasses, setDropZoneClasses] = useState(['border-dotted border-2 border-gray-300 flex flex-col p-5  w-full'])

    const onDragOverEvent=(event)=>{
        console.log('dragged over')
        event.preventDefault();
        setDropZoneClasses(dropZoneClasses=>[...dropZoneClasses,'bg-gray-200'])
        console.log(dropZoneClasses)

    }

    const [files, setFiles] = useState([])

    const handleDrop = (event) => {
        event.preventDefault();
        const newList = dropZoneClasses.filter((classes) => classes !== 'bg-gray-200');
        setDropZoneClasses(newList);
        console.log(newList)
        const droppedfiles = event.dataTransfer.files;
        if (droppedfiles.length > 0) {
            const newfiles = Array.from(droppedfiles);
            setFiles((prevFiles) => [...prevFiles, ...newfiles])
        }


    }

    const handleFileChange = (event) => {
        event.preventDefault();
        const selectedFiles = event.target.files;
        console.log(URL.createObjectURL(event.target.files[0]))
        if (selectedFiles && selectedFiles.length > 0) {
            const newfiles = Array.from(selectedFiles);
            setFiles((prevFiles) => [...prevFiles, ...newfiles])
        }

    }

    const removeFile = (fileName) => {
        const newList = files.filter((file) => file.name !== fileName);
        setFiles(newList);
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
            <div className="flex justify-end mx-10 mt-10">
                <button onClick={() => openModal()}
                    className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none"
                    type="button">
                    <img src={newUploadIcon} className="h-7 mx-1" alt="new upload" />
                    New File / Folder
                </button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyle}>
                <div className="flex justify-between w-full mb-5">
                    <div className="flex flex-col space-y-2">
                        <p className="text-black font-bold text-xl">Upload Files</p>
                        <p className="text-gray-500 text-sm">Easily upload your files in a few clicks</p>
                    </div>

                    <div>
                        <img src={close} onClick={closeModal} className="h-5 mx-1 hover:cursor-pointer" alt="close modal" />
                    </div>
                </div>

                <div className={dropZoneClasses.join(' ')} onDrop={handleDrop}
                    onDragOver={onDragOverEvent}>
                    <img src={uploadFileIcon} className="h-9 m-4" alt="new upload" />
                    <p className="text-center">Drag and drop a file or multiple files</p>
                    <div>
                        <input type="file" hidden id="files" onChange={handleFileChange} multiple />
                    </div>
                </div>

                <div className="flex flex-wrap justify-start mt-4 items-center w-full">
                    {
                        files.map((file) => (
                            <div className="border border-gray-300 flex justify-center items-center m-3 rounded-lg p-2">
                                <div className="flex justify-center items-center">
                                    <div>
                                        <img src={URL.createObjectURL(file)} className="w-16 rounded-lg" />
                                    </div>
                                    <div className="flex flex-col space-y-2 p-3">
                                        <p className="font-bold text-sm">{file.name}</p>
                                        <p>{convertBytes(file.size)} </p>
                                    </div>
                                </div>

                                <div className>
                                    <img src={deleteIcon} onClick={() => removeFile(file.name)} className="h-6 m-4" alt="delete" />
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="flex justify-end items-center space-x-2 w-full">
                    <button
                        className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-black hover:border-black focus:text-white"
                        type="button">
                        Cancel
                    </button>

                    <button
                        className="rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg"
                        type="button">
                        Submit
                    </button>
                </div>
            </Modal>



            {folderExists || files.length >0 ? (
                <div id="" className="ml-5 grid grid-cols-2 sm:grid-cols-8  lg:grid-cols-12 gap-2 p-5">
                    {folders.map((folder, index) => (
                        slugify(folder.parent) === slugify(location.pathname) ? (
                            <Link to={`${location.pathname}/${slugify(folder.title)}`}>
                                <div className="flex flex-col space-y-2">
                                    <div>
                                        <img src={folderIcon} className="h-24" alt="folder" />
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

                    {files.map((file) => (
                        <div>
                            <FileIconMapper file={file} />
                        </div>
                    ))}
                </div>
            ) : (
               <Empty/>
            )
            }


        </div>
    );
}

export default Folder;