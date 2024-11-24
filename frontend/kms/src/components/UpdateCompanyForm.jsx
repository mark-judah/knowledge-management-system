import React, { useContext } from "react";
import { MyContext } from "../MyContextProvider";
import { useForm } from "react-hook-form";
import LoadingAnimation from "./LoadingAnimation";
import axios from "axios";
import { getBackendUrl } from "../constants";
const UpdateCompanyForm = () => {
    const value = useContext(MyContext)
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = async (data) => {
        value.setLoading(true)
        let form_data = {
            "title": data['companyName'],
            "tagline": data['companyTagline']
        }
        axios.patch(`${getBackendUrl()}` + 'api/company/update/', form_data, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status == 200) {
                value.setLoading(false)
                value.setCompanyDataSeed(Math.random())
            }
        }).catch(function (error) {
            value.setLoading(false)
        })
    }

    return (
        <div className="static flex justify-center items-center mt-5">
            <LoadingAnimation />
            <form onSubmit={handleSubmit(onSubmit)} className="w-fit p-4 flex flex-col justify-center items-center m-5 bg-white rounded-lg shadow">
                <div className="w-full max-w-sm min-w-[200px]">
                    <label className="block mb-1 text-sm text-slate-600 mt-5">
                        Name
                    </label>
                    <input required placeholder={value.companyData.length >0 ? value.companyData[0].title:''}
                        {...register("companyName", {
                            required: true
                        })}
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                    {errors.companyName?.type === "required" && (
                        <small>The company name is required</small>
                    )}
                </div>

                <div className="w-full max-w-sm min-w-[200px] mt-4">
                    <label className="block mb-1 text-sm text-slate-600 mt-5">
                        Tagline
                    </label>
                    <input required placeholder={value.companyData.length >0 ? value.companyData[0].tagline:''}
                        {...register("companyTagline", {
                            required: true
                        })}
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                    {errors.companyTagline?.type === "required" && (
                        <small>The company tagline is required</small>
                    )}
                </div>

                <div className="w-full max-w-sm min-w-[200px] flex justify-start items-center my-5">
                    <button className="w-fit rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none"
                        type="submit">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateCompanyForm;