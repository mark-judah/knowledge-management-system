import React, { useEffect, useState } from "react";
import openIcon from "../assets/plus.svg"
import closeIcon from "../assets/minus.svg"
import relatedArticleIcon from "../assets/related_article.svg"
import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumbs";
import axios from "axios";
import { getBackendUrl } from "../constants";

const Faqs = () => {
    const [faqs, setFaqs] = useState([])
    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get(`${getBackendUrl()}` + 'api/faqs/')
            .then(function (response) {
                setFaqs(response.data)
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    const location = useLocation();
    const path = location.pathname.split('/');



    const toggleAnswer = (id, toggleStatus) => {
        const currentFaqsIndex = faqs.findIndex((faq) => faq.id === id);
        if (toggleStatus == true) {
            const updatedFaq = { ...faqs[currentFaqsIndex], answerVisible: false };
            const newFaqsArray = [...faqs];
            newFaqsArray[currentFaqsIndex] = updatedFaq;
            setFaqs(newFaqsArray);
        } else {
            const updatedFaq = { ...faqs[currentFaqsIndex], answerVisible: true };
            const newFaqsArray = [...faqs];
            newFaqsArray[currentFaqsIndex] = updatedFaq;
            setFaqs(newFaqsArray);
        }
    }

    const fetchArticle = () =>{
        axios.get(`${getBackendUrl()}` + 'api/articles/1')
            .then(function (response) {
                setFaqs(response.data)
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <div className='flex flex-col items-center justify-center'>
                <div className='w-full max-w-lg px-10 py-5 mx-auto'>
                    <div className='max-w-md mx-auto space-y-3'>
                        <h2 className="flex flex-row flex-nowrap items-center my-2">
                            <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            <span className="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                FAQS
                            </span>
                            <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                        </h2>

                    </div>
                </div>
                <BreadCrumb path={path} />
            </div>
            {faqs.map((faq) => (
                <div className="flex justify-center">
                    <div className="relative flex flex-col  my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-[45vh] sm:w-[80vh] lg:w-[90vh] xl:w-[100vh] 2xl:w-[110vh]">
                        <div className="flex justify-between items-center mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1 space-x-5">
                            <div>
                                <p className="text-wrap font-bold text-xl sm:text-2xl">Q: {faq.question}</p>
                            </div>
                            <div>
                                {faq.answerVisible == true ? (
                                    <img onClick={() => toggleAnswer(faq.id, faq.answerVisible)} src={closeIcon} className="h-6" />
                                ) : (
                                    <img onClick={() => toggleAnswer(faq.id, faq.answerVisible)} src={openIcon} className="h-6" />
                                )}
                            </div>
                        </div>

                        {faq.answerVisible == true ? (
                            <div className="p-4">
                                <h5 className="mb-2 text-slate-800 text-xl">
                                    <p className="text-sm sm:text-lg">{faq.answer}</p>
                                </h5>

                                {faq.related_article ? (
                                        <div className="flex justify-end items-center space-x-1 p-2">
                                            <p className="text-sm underline">Related article</p>
                                            <img src={relatedArticleIcon} className="w-4 hover:cursor-pointer" onClick={fetchArticle}/>
                                        </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        ) : (
                            ''
                        )}


                    </div>
                </div>
            ))}
        </div>
    );
}

export default Faqs;