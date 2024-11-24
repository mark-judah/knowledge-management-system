import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBackendUrl } from "../constants";
import axios from "axios";
import Swal from 'sweetalert2'
import LoadingAnimation from "../components/LoadingAnimation";
import { MyContext } from "../MyContextProvider";
import { useForm } from 'react-hook-form';

const Login = () => {
    const navigate = useNavigate()
    const value = useContext(MyContext)
    const {register,handleSubmit,formState: { errors },} = useForm();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const onSubmit = async (data) => {
        value.setLoading(true)
        let form_data = {
            "username": data['username'],
            "password": data['password']
        }

        axios.post(`${getBackendUrl()}` + 'api/token/', form_data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status == 200) {
                value.setLoading(false)
                localStorage.setItem("token", response.data.access);
                navigate('/')
            }
        }).catch(function (error) {
            value.setLoading(false)
            if (error.status == 401) {
                Swal.fire({
                    title: 'Error!',
                    text: 'The credentials provided are incorrect',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#000000',
                    iconColor: '#000000'
                })
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occured, please try again',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#000000',
                    iconColor: '#000000'
                })
            }
        })
    }

    return (
        <div className="static min-h-screen bg-[#F5F5F5] flex flex-col justify-center items-center">
            <LoadingAnimation />
            <div className="relative flex flex-col rounded-xl bg-transparent">
                <h4 className="block text-xl font-medium text-slate-800">
                    Welcome
                </h4>
                <p className="text-slate-500 font-light">
                    Enter your details to login.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-2 text-sm text-slate-600">
                                Username
                            </label>
                            <input type="text" {...register("username", {
                                required: true
                            })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Username" />
                            {errors.username?.type === "required" && (
                                <small>Username is required</small>
                            )}
                        </div>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <label className="block mb-2 text-sm text-slate-600">
                                Password
                            </label>
                            <input type="password" {...register("password", {
                                required: true
                            })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Password" />
                            {errors.password?.type === "required" && (
                                <small>Password is required</small>
                            )}
                        </div>
                    </div>
                    <div className="inline-flex items-center mt-2">
                        <label className="flex items-center cursor-pointer relative" for="check-2">
                            <input type="checkbox" className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800" id="check-2" />
                            <span className="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </span>
                        </label>
                        <label className="cursor-pointer ml-2 text-slate-600 text-sm" for="check-2">
                            Remember Me
                        </label>
                    </div>
                    <button className="mt-4 w-full rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit">
                        Login
                    </button>
                    {value.companyData.length > 0 ? (
                        ''
                    ) : (
                        <p className="flex justify-center mt-6 text-sm text-slate-600">
                            First time here?
                            <Link to="/first-time-setup" className="ml-1 text-sm font-semibold text-slate-700 underline">
                                Quick Setup
                            </Link>
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Login;