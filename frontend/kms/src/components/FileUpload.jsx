import React, { useState } from "react";
import uploadFileIcon from "../assets/upload_black.svg"
import deleteIcon from "../assets/delete_black.svg"
import closeIcon from "../assets/close.svg"


const FileUpload = (props) => {
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

    const [dropZoneClasses, setDropZoneClasses] = useState(['border-dotted border-2 border-gray-300 flex flex-col p-5  w-full'])

    const onDragOverEvent = (event) => {
        console.log('dragged over')
        event.preventDefault();
        setDropZoneClasses(dropZoneClasses => [...dropZoneClasses, 'bg-gray-200'])
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

    const handleUpload = () => {
        document.getElementById("popup-root").remove()
        console.log(files)
    }

    return (
        <div className="p-5">
            <div className="flex justify-between w-full mb-5">
                <div className="flex flex-col space-y-2">
                    <p className="text-black font-bold text-xl">Upload Files</p>
                </div>

                <div>
                    <img src={closeIcon} onClick={()=>document.getElementById("popup-root").remove()} className="h-5 mx-1 hover:cursor-pointer" alt="close modal" />
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
                    files.map((file, index) => (
                        index >= 6 ? (
                            index == 6 ? <div className="flex justify-start">
                                <p>{files.length - 6} file(s) hidden</p>
                            </div> : ''
                        ) : (
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
                                    <img src={deleteIcon} onClick={() => removeFile(file.name)} className="h-6 m-4 hover:cursor-pointer" alt="delete" />
                                </div>
                            </div>
                        )
                    ))
                }
            </div>

            <div className="flex justify-end items-center space-x-2 w-full">
                <button onClick={()=>document.getElementById("popup-root").remove()}
                    className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-black hover:border-black focus:text-white"
                    type="button">
                    Cancel
                </button>

                <button onClick={handleUpload}
                    className="rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg"
                    type="button">
                    Submit
                </button>
            </div>
        </div>
    );
}

export default FileUpload;