import React, { useState } from "react";
import ReactBlockText, { headerPlugin, imagePlugin, listPlugin, quotePlugin, todoPlugin } from 'react-block-text'
import draftIcon from "../assets/draft.svg"
import deleteIcon from "../assets/delete.svg"

const ArticleEditor = () => {
    const [value, setValue] = useState('')
    const fileHandler = () => { }
    const urlHandler = () => { }
    const downloadHandler = () => { }
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);

    const newTag = () => {
        console.log(tag)
        if (tag !== "") {
            setTags([...tags, tag]);
        }
    }

    const removeTag = (dep) => {
        console.log(dep)
        const newList = tags.filter((dept) => dept !== dep);
        setTags(newList);
    }

    const plugins = [
        ...headerPlugin(),
        ...todoPlugin(),
        ...listPlugin(),
        ...quotePlugin(),
        ...imagePlugin({
            onSubmitFile: fileHandler,
            onSubmitUrl: urlHandler,
            getUrl: downloadHandler,
            maxFileSize: '5 MB', /* Optional, displayed in the file upload dialog */
        }),
    ]

    return (
        <div>
            <div class='flex items-center justify-center'>
                <div class='w-full max-w-lg px-10 py-5 mx-auto'>
                    <div class='max-w-md mx-auto space-y-3'>
                        <h2 class="flex flex-row flex-nowrap items-center my-2">
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            <span class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                New Article
                            </span>
                            <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                        </h2>

                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center w-full">
                <div class="mt-5 bg-white rounded-lg shadow w-[90vh]">
                    <div class="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                        <span class="text-2xl text-black font-bold">
                            Contribute to the Knowledge Hub
                        </span>
                    </div>
                    <div class="px-5 pb-5">
                        <label class="block mb-1 text-sm text-slate-600 mt-5">
                            Title
                        </label>
                        <input placeholder="Article title" class="mt-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />

                        <label class="block mb-1 text-sm text-slate-600 mt-5">
                            Department
                        </label>
                        <select id="departments" class="mt-2 p-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                            <option selected>Choose a department</option>
                            <option value="US">Finance</option>
                            <option value="CA">Human Resources</option>
                            <option value="FR">Sales</option>
                            <option value="DE">Marketing</option>
                        </select>

                        <label class="block mb-1 text-sm text-slate-600 mt-5">
                            Tags
                        </label>
                        <div class="relative mt-2">
                            <input onChange={(e) => setTag(e.target.value)} type="text" class="text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" placeholder="Enter a tag" />
                            <button onClick={newTag} class="absolute right-1 top-2 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                Add
                            </button>
                        </div>

                        {tags.length > 0 ? (
                            <div className="flex justify-center items-center mt-3 flex-wrap p-4">
                                {tags.map((dep) => (
                                    <div className="p-2">
                                        <div className="flex justify-center items-center space-x-3 rounded-xl bg-black py-2 px-4 border border-transparent text-center text-sm text-white  ml-2">
                                            <div>
                                                <p>{dep}</p>
                                            </div>
                                            <div>
                                                <img onClick={() => removeTag(dep)} src={deleteIcon} className="h-5" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        ) : ('')}


                        <label class="block mb-1 text-sm text-slate-600 mt-5">
                            Article content
                        </label>
                        <div className="mt-2 min-h-[600px] w-[80vh] text-wrap text-black placeholder-black  px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
                            <ReactBlockText id="content"
                                value={value}
                                onChange={setValue}
                                plugins={plugins}
                            />
                        </div>
                    </div>

                    <div class="px-5 ">
                    </div>
                    <hr class="mt-4" />
                    <div class="flex flex-row-reverse p-3">
                        <div class="flex-initial pl-3">
                            <button type="button" class="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                                    <path d="M0 0h24v24H0V0z" fill="none"></path>
                                    <path d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z" opacity=".3"></path>
                                    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
                                </svg>
                                <span class="pl-2 mx-1">Save</span>
                            </button>
                        </div>
                        <div class="flex-initial">
                            <button type="button" class="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
                                <img src={draftIcon} className="h-6" />
                                <span class="pl-2 mx-1">Save as draft</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleEditor;