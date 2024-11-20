import React, { useEffect, useState } from "react";
import viewMaterialButton from "../assets/more.svg"
import { Link, useLocation } from "react-router-dom";
import slugify from "react-slugify";
import BreadCrumb from "../components/BreadCrumbs";
import axios from "axios";
import Empty from "../components/Empty";

const Induction = () => {
    const [articles, setArticles] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0)
        Promise.all([
            axios.get('http://localhost:8000/api/departments/'),
            axios.get('http://localhost:8000/api/articles/')
        ]).then(([departmentsResponse, articlesResponse]) => {
            console.log(departmentsResponse.data);
            console.log(articlesResponse.data);
            setDepartments(departmentsResponse.data)
            setArticles(articlesResponse.data)
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }, [])

    const location = useLocation();
    const path = location.pathname.split('/');
    const countArticles = (department) => {
        const newList = articles.filter((article) => article.department == department && article.article_type === 'Induction');
        return newList.length
    }

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <div class='flex flex-col items-center justify-center'>
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
                <BreadCrumb path={path} />
            </div>


            {departments.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                    {departments.map((department) =>
                        <div className="bg-white shadow-xl my-5  p-5 rounded-xl flex justify-between items-center w-[45vh] sm:w-[80vh] lg:w-[90vh] xl:w-[100vh] 2xl:w-[110vh]">
                            <div className="flex flex-col">
                                <div>
                                    <p className="font-bold text-lg">{department.title}</p>
                                </div>
                                <div>
                                    {countArticles(department.title) > 0 ? (
                                        <p>
                                            {countArticles(department.title)} {countArticles(department.title) === 1 ? 'Chapter' : 'Chapters'}
                                        </p>
                                    ) : (
                                        <p>--</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Link to={slugify(department.title)} state={{ data: articles }}>
                                    <button class="flex justify-center items-center bg-black text-white  rounded-2xl py-1 px-2.5 border border-transparent text-center text-sm  transition-all shadow-sm w-fit" type="button">
                                        <span className="text-xs sm:text-base">View Material</span>
                                        <img src={viewMaterialButton} className="h-4 sm:h-7 ml-3" alt="account settings" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <Empty />
            )}

        </div>
    );
}

export default Induction;