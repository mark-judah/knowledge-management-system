import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumbs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import newFolderIcon from "../assets/new_folder_white.svg"
import Modal from 'react-modal'
import close from "../assets/close.svg"
import editIcon from "../assets/edit_white.svg"
import deleteIcon from "../assets/delete.svg"
import { getBackendUrl } from "../constants";

const ManageDepartments = () => {
    const location = useLocation();
    const path = location.pathname.split('/');
    const [fetchedDepartments, setFetchedDepartments] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [newDepartment, setNewDepartment] = useState('');
    const [seed, setSeed] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get('http://localhost:8000/api/departments/')
            .then(function (response) {
                setFetchedDepartments(response.data)
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }, [seed])

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

    const addDepartment = () => {
        console.log(newDepartment)
        if (newDepartment !== "") {
            setDepartments([...departments, newDepartment]);
        }
        setNewDepartment('')
    }

    const removeDepartment = (dep) => {
        console.log(dep)
        const newList = departments.filter((dept) => dept !== dep);
        setDepartments(newList);
    }

    const handleSubmit = () => {
        departments.map((dep) => {
            let data = {
                "title": dep
            }
            axios.post(`${getBackendUrl()}` + 'api/departments/', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                console.log(response);
            }).catch(function (error) {
                console.log(error)
            })
        })
        setDepartments('')
        closeModal()
        setSeed(Math.random())
    }

    return (
        <div className="min-h-screen">
            <div className="flex flex-col">
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full max-w-lg px-10 py-5 mx-auto'>
                        <div className='max-w-md mx-auto space-y-3'>
                            <h2 className="flex flex-row flex-nowrap items-center my-2">
                                <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                                <span className="flex-none block mx-4 px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                    Departments
                                </span>
                                <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            </h2>

                        </div>
                    </div>
                    <BreadCrumb path={path} />
                </div>

                <div className="flex justify-end mx-10">
                    <button onClick={() => openModal()} className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                        <img src={newFolderIcon} className="h-7 mx-1 fill-current text-white" alt="new article" />
                        New Department
                    </button>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={modalStyle}>
                    <div className="flex justify-between w-full mb-5">
                        <div className="flex flex-col space-y-2">
                            <p className="text-black font-bold text-xl">New Department(s)</p>
                            <p className="text-gray-500 text-sm"></p>
                        </div>

                        <div>
                            <img src={close} onClick={closeModal} className="h-5 mx-1 hover:cursor-pointer" alt="close modal" />
                        </div>
                    </div>

                    <div>
                        <div className="relative mt-5">
                            <input value={newDepartment} onChange={(e) => setNewDepartment(e.target.value)} type="text" className="mt-2 p-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" placeholder="Enter a department" />
                            <button onClick={addDepartment} className="absolute right-1 top-4 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                Add
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center items-center mt-3 flex-wrap p-4">
                        {departments.length > 0 ? (
                            departments.map((dep) => (
                                <div className="p-2">
                                    <div className="flex justify-center items-center space-x-3 rounded-xl bg-black py-2 px-4 border border-transparent text-center text-sm text-white  ml-2">
                                        <div>
                                            <p>{dep}</p>
                                        </div>
                                        <div>
                                            <img onClick={() => removeDepartment(dep)} src={deleteIcon} className="h-5" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : ('')}
                    </div>

                    <div className="flex justify-end items-center space-x-2 w-full mt-5">
                        <button
                            className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-black hover:border-black focus:text-white"
                            type="button">
                            Cancel
                        </button>

                        <button
                            className="rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg"
                            type="button" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </Modal>
            </div>

            <div className="relative flex flex-col justify-center items-center w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border mt-10">
                <table className="w-fit text-left table-auto min-w-max mb-10">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Name
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Date Created
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Date Modified
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    Actions
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchedDepartments.map((fetchedDepartment) => (
                            <tr className="hover:bg-slate-50 border-b border-slate-200">
                                <td className="p-4 py-5">
                                    <p className="block font-semibold text-sm text-slate-800">{fetchedDepartment.title}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{fetchedDepartment.created_at}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{fetchedDepartment.updated_at}</p>
                                </td>
                                <td className="p-4 py-5">
                                <div className="p-2 flex justify-center items-center space-x-3">
                                    <div className="flex justify-center items-center space-x-3 rounded-xl bg-black py-2 px-4 border border-transparent text-center text-sm text-white  ml-2">
                                        <div>
                                            <p>Edit</p>
                                        </div>
                                        <div>
                                            <img src={editIcon} className="h-5" />
                                        </div>
                                    </div>

                                    <div className="flex justify-center items-center space-x-3 rounded-xl bg-black py-2 px-4 border border-transparent text-center text-sm text-white  ml-2">
                                        <div>
                                            <p>Delete</p>
                                        </div>
                                        <div>
                                            <img src={deleteIcon} className="h-5" />
                                        </div>
                                    </div>
                                </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default ManageDepartments;