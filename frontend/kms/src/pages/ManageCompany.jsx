import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumbs";
import companyIcon from "../assets/company_white.svg"
import showUsersIcon from "../assets/users.svg"
import axios from "axios";
import { getBackendUrl } from "../constants";
import { useForm } from "react-hook-form"
import { MyContext } from "../MyContextProvider";
import UpdateCompanyForm from "../components/UpdateCompanyForm";
import UsersTable from "../components/UsersTable";
import NewUser from "../components/NewUser";

const ManageCompany = () => {
    const location = useLocation();
    const path = location.pathname.split('/');
    const [companyComponent, setCompanyComponent] = useState(true);
    const [usersComponent, setUsersComponent] = useState(false);
    const value = useContext(MyContext)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const toggleComponents = (component) => {
        if (component === 'company') {
            value.setCompanyDataSeed(Math.random())
            setCompanyComponent(true)
            setUsersComponent(false)
        }

        if (component === 'users') {
            value.setUserDataSeed(Math.random())
            setCompanyComponent(false)
            setUsersComponent(true)
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

                <div className="flex justify-end m-10 space-x-4">
                    <button onClick={() => toggleComponents('company')} className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                        <img src={companyIcon} className="h-7 mx-1 fill-current text-white" alt="new article" />
                        Company Details
                    </button>

                    <button onClick={() => toggleComponents('users')} className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                        <img src={showUsersIcon} className="h-7 mx-1 fill-current text-white" alt="new article" />
                        Users
                    </button>

                    
                </div>
            </div>

            {companyComponent ? (
                <UpdateCompanyForm/>
            ) : ('')}


            {usersComponent ? (
              <UsersTable/>
            ) : ('')}
        </div>
    );
}

export default ManageCompany;