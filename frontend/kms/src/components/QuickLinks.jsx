import React from "react";
import departmentIcon from "../assets/department.svg"
import articlesIcon from "../assets/articles.svg"
import helpdeskIcon from "../assets/helpdesk.svg"
import faqIcon from "../assets/faq.svg"
import inductionIcon from "../assets/induction.svg"
import { Link } from "react-router-dom";

const QuickLinks = () => {
    const cards = [
        {
            "image": departmentIcon,
            "title": "Departments",
            "caption": "Department-Specific Resources",
            "link": "/departments"
        },
        {
            "image": articlesIcon,
            "title": "Articles",
            "caption": "Tutorials / Guides",
            "link": "/articles"
        },
        {
            "image": helpdeskIcon,
            "title": "Helpdesk",
            "caption": "Technical support",
            "link": "/helpdesk"
        },
        {
            "image": inductionIcon,
            "title": "Induction",
            "caption": "Orientation material per department",
            "link": "/induction"
        },
        {
            "image": faqIcon,
            "title": "FAQs",
            "caption": "Answers to common questions",
            "link": "/frequently-asked-questions"
        },

    ]
    return (
        <div>
            <div class='flex items-center justify-center'>
                <div class='w-full max-w-lg px-10 py-3 mx-auto'>
                    <div class='max-w-md mx-auto space-y-3'>
                        <h2 class="flex flex-row flex-nowrap items-center my-2">
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            <span class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                Quick Links
                            </span>
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                        </h2>

                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-5">
                    {cards.map((card, i) =>
                        <div key={i} class="relative min-h-80 w-[40vh] flex flex-col justify-center items-center my-6 bg-white shadow-sm border border-slate-200 rounded-lg p-2">
                            <div class="p-3 text-center">
                                <div class="flex justify-center mb-4">
                                    <img src={card.image} className="h-12" />
                                </div>
                                <div class="flex justify-center mb-2">
                                    <h5 class="text-slate-800 text-xl font-semibold">
                                        {card.title}
                                    </h5>
                                </div>
                                <p class="block text-slate-600 leading-normal font-light mb-4 max-w-lg text-sm">
                                    {card.caption}
                                </p>
                                <div class="text-center">
                                    <Link to={card.link}>
                                        <button class="w-fit rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                                            View More
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </div>

    );
}

export default QuickLinks;