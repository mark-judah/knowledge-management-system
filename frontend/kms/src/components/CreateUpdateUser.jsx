import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { getBackendUrl } from "../constants";
import { MyContext } from "../MyContextProvider";
import closeIcon from "../assets/close.svg"
import LoadingAnimation from "./LoadingAnimation";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const CreateUpdateuser = (props) => {
    const { register, getValues, handleSubmit, formState: { errors }, } = useForm();
    const value = useContext(MyContext)
    const location=useLocation()

    const onSubmit = async (data) => {
        value.setLoading(true)
        const body = new FormData();
        body.append('username', data['username']);
        body.append('email', data['email']);
        body.append('password', data['password']);
        body.append('role', data['role']);
        body.append('department', data['department']);

        if (props.mode === 'create') {
            axios.post(`${getBackendUrl()}` + 'api/user/', body, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response);
                if (response.status == 201) {
                    value.setLoading(false)
                    Swal.fire('The user has been created successfully', '', 'success')
                    value.setUserDataSeed(Math.random())
                }
            }).catch(function (error) {
                console.log(error)
                value.setLoading(false)
                if (error.response.status == 401 && location.pathname != '/login') {
                    console.log('logging out')
                    value.logout()
                }else{
                    Swal.fire('An error occured, please try again later', '', 'error')
                }
                
            })
        } else {
            body.append('id', props.id);
            if (props.status==='Active') {
                body.append('status', 'True');
            }else{
                body.append('status', 'False');
            }
            axios.patch(`${getBackendUrl()}` + 'api/users/', body, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                console.log(response);
                if (response.status == 200) {
                    value.setLoading(false)
                    Swal.fire('The user has been updated successfully', '', 'success')
                    value.setUserDataSeed(Math.random())
                }
            }).catch(function (error) {
                console.log(error)
                value.setLoading(false)
                if (error.response.status == 401 && location.pathname != '/login') {
                    console.log('logging out')
                    value.logout()
                }else{
                    Swal.fire('An error occured, please try again later', '', 'error')
                }
            })
        }
    }

    return (
        <div className="static flex flex-col justify-center items-center mt-5">
            <LoadingAnimation />
            <div className="flex justify-between items-center w-full px-5">
                <div className="flex flex-col space-y-2">
                    <p className="text-black font-bold text-xl">{props.mode === 'create' ? 'New User' : 'Update User'}</p>
                    <p className="text-gray-500 text-sm"></p>
                </div>

                <div>
                    <img src={closeIcon} className="h-5 mx-1 hover:cursor-pointer" alt="close modal" />
                </div>
            </div>
            <div className="w-fit p-4 flex flex-col justify-center items-center m-5">
                <form onSubmit={handleSubmit(onSubmit)} className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <label className="block mb-1 text-sm text-slate-600 mt-5">
                        Username
                    </label>
                    <input {...register("username", {
                        required: true
                    })} type="text" placeholder={props.mode === 'create' ? 'Username' : props.username} className="mt-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
                    {errors.username?.type === "required" && (
                        <small>Username is required</small>
                    )}

                    <label className="block mb-1 text-sm text-slate-600 mt-5">
                        Email
                    </label>
                    <input {...register("email", {
                        required: true
                    })} type="email" placeholder={props.mode === 'create' ? 'Email' : props.email} className="mt-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
                    {errors.email?.type === "required" && (
                        <small>Email is required</small>
                    )}

                    <label className="block mb-1 text-sm text-slate-600 mt-5">
                        Password
                    </label>
                    <input {...register("password", {
                        required: true
                    })} type="password" placeholder="Password" className="mt-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
                    {errors.password?.type === "required" && (
                        <small>Password is required</small>
                    )}

                    <label className="block mb-1 text-sm text-slate-600 mt-5">
                        Confirm Password
                    </label>
                    <input {...register("confirm_password", {
                        required: true,
                        validate: (value) => {
                            const { password } = getValues();
                            return password === value || "Passwords should match!";

                        }
                    })} type="password" placeholder="Confirm Password" className="mt-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
                    {errors.confirm_password?.type === "required" && (
                        <small>Confirm password is required</small>
                    )}

                    <label className="block mb-1 text-sm text-slate-600 mt-5">
                        Role
                    </label>

                    <select {...register("role", {
                        required: true
                    })} id="role" className="mt-2 p-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                        <option value="" selected disabled>{props.mode === 'create' ? 'Role' : props.role}</option>
                        <option value="Staff">Staff</option>
                        <option value="Admin">Admin</option>
                    </select>
                    {errors.role?.type === "required" && (
                        <small>Role is required</small>
                    )}

                    <label className="block mb-1 text-sm text-slate-600 mt-5">
                        Department
                    </label>

                    <select {...register("department", {
                        required: true
                    })} id="departments" className="mt-2 p-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                        <option value="" selected disabled>{props.mode === 'create' ? 'Department' : props.department}</option>

                        {value.departments.map((department) => (
                            <option value={department.title}>{department.title}</option>
                        ))}
                    </select>
                    {errors.department?.type === "required" && (
                        <small>Department is required</small>
                    )}

                    <button type="submit" className="mt-4 w-full rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Save
                    </button>

                </form>
            </div>
        </div>
    );
}

export default CreateUpdateuser;




