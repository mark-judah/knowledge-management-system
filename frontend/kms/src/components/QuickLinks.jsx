import React from "react";
import departmentIcon from "../assets/department.svg"
import articlesIcon from "../assets/articles.svg"
import helpdeskIcon from "../assets/helpdesk.svg"
import faqIcon from "../assets/faq.svg"

const QuickLinks = () => {
    const cards = [
        {
            "image": departmentIcon,
            "title": "Departments",
            "caption": "Department-Specific Resources",
        },
        {
            "image": articlesIcon,
            "title": "Articles",
            "caption": "Tutorials / Guides",
        },
        {
            "image": helpdeskIcon,
            "title": "Helpdesk",
            "caption": "Technical support",
        },
        {
            "image": faqIcon,
            "title": "FAQs",
            "caption": "Answers to common questions",
        },

    ]
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-8 p-5">
                {cards.map((card) =>
                    <div class="relative min-h-80 w-[30vh] flex flex-col justify-center items-center my-6 bg-white shadow-sm border border-slate-200 rounded-lg p-2">
                        <div class="p-3 text-center">
                            <div class="flex justify-center mb-4">
                                <img src={card.image} className="h-12" />
                            </div>
                            <div class="flex justify-center mb-2">
                                <h5 class="text-slate-800 text-2xl font-semibold">
                                    {card.title}
                                </h5>
                            </div>
                            <p class="block text-slate-600 leading-normal font-light mb-4 max-w-lg">
                                {card.caption}
                            </p>
                            <div class="text-center">
                                <button class="min-w-32 rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                                    View More
                                </button>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
}

export default QuickLinks;