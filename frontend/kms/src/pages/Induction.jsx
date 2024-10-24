import React, { useState } from "react";
import viewMaterialButton from "../assets/more.svg"
import { Link } from "react-router-dom";
import slugify from "react-slugify";

const Induction = () => {

    const [departments, setDepartments] = useState([
        {
            "title": "Finance",
            "chapters": "5",
            "folderOpen": false
        },
        {
            "title": "Marketing",
            "chapters": "0",
            "folderOpen": false
        },
        {
            "title": "Human Resources",
            "chapters": "1",
            "folderOpen": false
        },
        {
            "title": "Information Technology",
            "chapters": "0",
            "folderOpen": false
        },
    ]);

    return (
        <div>
            <div class='flex items-center justify-center'>
                <div class='w-full max-w-lg px-10 py-5 mx-auto'>
                    <div class='max-w-md mx-auto space-y-3'>
                        <h2 class="flex flex-row flex-nowrap items-center my-2">
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            <span class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                Induction
                            </span>
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                        </h2>

                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                {departments.map((department) =>
                    <div className="bg-white shadow-xl my-5  p-5 rounded-xl flex justify-between items-center w-full sm:w-1/2">
                        <div className="flex flex-col">
                            <div>
                                <p className="font-bold text-lg">{department.title}</p>
                            </div>
                            <div>
                                {Number(department.chapters) > 0 ? (
                                    <p>
                                        {department.chapters} {Number(department.chapters) === 1 ? 'Chapter' : 'Chapters'}
                                    </p>
                                ) : (
                                    <p>--</p>
                                )}
                            </div>



                        </div>

                        <div>
                            <Link to={slugify(department.title)}>
                                <button class="flex justify-center items-center bg-black text-white  rounded-2xl py-1 px-2.5 border border-transparent text-center text-sm  transition-all shadow-sm w-fit" type="button">
                                    <span className="text-xs sm:text-base">View Material</span>
                                    <img src={viewMaterialButton} className="h-4 sm:h-7 ml-3" alt="account settings" />
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Induction;