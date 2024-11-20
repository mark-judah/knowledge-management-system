import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumbs";
import companyIcon from "../assets/company.svg"
import newUserIcon from "../assets/user.svg"
import showUsersIcon from "../assets/users.svg"
import Modal from 'react-modal'

const ManageCompany = () => {
    const location = useLocation();
    const path = location.pathname.split('/');
    const [companyName, setCompanyName] = useState('');
    const [companyLogo, setCompanyLogo] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

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


    return (
        <div className="min-h-screen">
            <div className="flex flex-col">
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full max-w-lg px-10 py-5 mx-auto'>
                        <div className='max-w-md mx-auto space-y-3'>
                            <h2 className="flex flex-row flex-nowrap items-center my-2">
                                <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                                <span className="flex-none block mx-4 px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                    Company
                                </span>
                                <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            </h2>

                        </div>
                    </div>
                    <BreadCrumb path={path} />
                </div>

                <div className="flex justify-end mx-10 space-x-4">
                    <button onClick={() => openModal()} className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                        <img src={showUsersIcon} className="h-7 mx-1 fill-current text-white" alt="new article" />
                        Show users
                    </button>

                    <button onClick={() => openModal()} className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                        <img src={newUserIcon} className="h-7 mx-1 fill-current text-white" alt="new article" />
                        New User
                    </button>
                </div>
            </div>


            <div className="flex justify-center items-center">
                <div class="flex flex-col justify-center items-center m-5 bg-white rounded-lg shadow w-[70vh] sm:w-[80vh] lg:w-[90vh] xl:w-[100vh] 2xl:w-[110vh]">
                    <div class="w-full max-w-sm min-w-[200px]">
                        <label class="block mb-1 text-sm text-slate-600 mt-5">
                            Name
                        </label>
                        <input value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Company name" />
                    </div>

                    <div class="w-full max-w-sm min-w-[200px]">
                        <div class="w-full max-w-sm min-w-[200px]">
                            <label class="block mb-1 text-sm text-slate-600 mt-5">
                                Logo
                            </label>
                            <input type="file"
                                onChange={(e) => setCompanyLogo(e.target.files[0])}
                                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Company logo" />
                        </div>
                    </div>




                </div>
            </div>
        </div>
    );
}

export default ManageCompany;