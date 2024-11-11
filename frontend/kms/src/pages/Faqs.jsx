import React, { useEffect, useState } from "react";
import openIcon from "../assets/plus.svg"
import closeIcon from "../assets/minus.svg"
import { useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumbs";

const Faqs = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const location = useLocation();
    const path = location.pathname.split('/');

    const [faqs, setFaqs] = useState([
        {
            "id": 1,
            "question": "How do I admit a patient on Bahmni?",
            "answer": "There are two options, click on the bed icon which leads to the inpatient area or use the disposition tab in clinical.",
            "answerVisible": false
        },
        {
            "id": 2,
            "question": "How do I discharge a patient in Bahmni?",
            "answer": "Go to the patient's clinical record, click on the Disposition tab, select the Discharge option, and confirm with the necessary details like discharge date and follow-up instructions.",
            "answerVisible": false
        },
        {
            "id": 3,
            "question": "How do I record a patient's vitals in Bahmni?",
            "answer": "Navigate to the patient's profile, click on the Vitals tab, and enter the measurements such as temperature, pulse, blood pressure, and weight.",
            "answerVisible": false
        },
        {
            "id": 4,
            "question": "How do I prescribe medication using Bahmni?",
            "answer": "In the patient's clinical profile, go to the Prescriptions section, search for the medication, set dosage, frequency, and duration, then save the prescription.",
            "answerVisible": false
        },
        {
            "id": 5,
            "question": "How do I schedule a follow-up appointment for a patient in Bahmni?",
            "answer": "Go to the patient's record, click on the Appointments tab, select a date and time, assign a healthcare provider, and save the appointment.",
            "answerVisible": false
        },
        {
            "id": 6,
            "question": "How do I transfer a patient to another ward in Bahmni?",
            "answer": "Click on the Inpatient area or go to the Disposition tab, select the Transfer option, choose the new ward or bed, and confirm the transfer.",
            "answerVisible": false
        },
        {
            "id": 7,
            "question": "How do I document a patient's allergies in Bahmni?",
            "answer": "Open the patient's profile, go to the Allergies section, click Add Allergy, select the allergen, specify the reaction, and save the details.",
            "answerVisible": false
        },
        {
            "id": 8,
            "question": "How do I enter lab results for a patient in Bahmni?",
            "answer": "Go to the patient's profile, click on the Laboratory tab, enter or review lab results, and confirm to update the patient's record.",
            "answerVisible": false
        },
        {
            "id": 9,
            "question": "How can I track patient billing in Bahmni?",
            "answer": "Go to the Billing module from the patient's record, view pending invoices and payments, or generate a new invoice for recent treatments.",
            "answerVisible": false
        },
        {
            "id": 10,
            "question": "How do I generate a patient's medical summary in Bahmni?",
            "answer": "Go to the patient's profile, click on the Summary tab, and select Generate Summary to create a medical report including diagnoses and treatments.",
            "answerVisible": false
        }
    ]);

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

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <div class='flex flex-col items-center justify-center'>
                <div class='w-full max-w-lg px-10 py-5 mx-auto'>
                    <div class='max-w-md mx-auto space-y-3'>
                        <h2 class="flex flex-row flex-nowrap items-center my-2">
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            <span class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                FAQS
                            </span>
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                        </h2>

                    </div>
                </div>
                <BreadCrumb path={path}/>
            </div>
            {faqs.map((faq) => (
                <div className="flex justify-center">
                    <div class="relative flex flex-col  my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-[45vh] sm:w-[80vh] lg:w-[90vh] xl:w-[100vh] 2xl:w-[110vh]">
                        <div class="flex justify-between items-center mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1 space-x-5">
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
                            <div class="p-4">
                                <h5 class="mb-2 text-slate-800 text-xl">
                                    <p className="text-sm sm:text-lg">{faq.answer}</p>
                                </h5>
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