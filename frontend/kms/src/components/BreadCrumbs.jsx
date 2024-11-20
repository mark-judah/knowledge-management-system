import React from "react";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
const BreadCrumb = (props) => {
    console.log(props)
    return (
        <div>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center space-x-1 px-3 md:space-x-2 rtl:space-x-reverse">
                    {props.path.map((item,index) => (
                        <li className="inline-flex items-center">
                            {item === "" ? (
                                <div className="flex justify-center items-center space-x-2">
                                    <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                    </svg>
                                    <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-black">
                                        <p>Home</p>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex justify-center items-center space-x-2">
                                    <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    {/* <Link to={props.path.slice(0,-1)} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-black"> */}
                                        <p>{String(item).charAt(0).toUpperCase() + String(item).slice(1).replace(/-/g, " ")}</p>
                                    {/* </Link> */}
                                </div>
                            )}
                        </li>
                    ))}

                </ol>
            </nav>

        </div>
    );
}

export default BreadCrumb;