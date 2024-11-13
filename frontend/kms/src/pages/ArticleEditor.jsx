import React, { useEffect, useMemo, useState } from "react";
import draftIcon from "../assets/draft.svg"
import deleteIcon from "../assets/delete.svg"
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumbs";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor } from "@blocknote/core";
import { useForm } from "react-hook-form"
import axios from "axios";
import { useCreateBlockNote } from "@blocknote/react";
import { getUrl } from "../constants";

const ArticleEditor = () => {
    const [articleData, setArticleData] = useState('')
    const { register, handleSubmit, formState: { errors }, } = useForm();
    useEffect(() => {
        window.scrollTo(0, 0)
<<<<<<< HEAD
        axios.get('https://my-json-server.typicode.com/mark-judah/knowledge-management-system/departments')
        .then(function (response) {
            // handle success
            setDepartments(response.data)
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
=======
        axios.get('http://localhost:8000/api/departments/')
            .then(function (response) {
                // handle success
                setDepartments(response.data)
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
>>>>>>> 65f3b87 (removed json-server files, moved to typicode)
    }, [])

    const location = useLocation();
    const path = location.pathname.split('/');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [articleType, setArticleType] = useState('');
    const [articleThumbnail, setArticleThumbnail] = useState('')
    const [departments, setDepartments] = useState([])
    const navigate = useNavigate()



    console.log(articleType)
    const newTag = () => {
        console.log(tag)
        if (tag !== "") {
            setTags([...tags, tag])
        }
    }

    const removeTag = (dep) => {
        console.log(dep)
        const newList = tags.filter((dept) => dept !== dep);
        setTags(newList);
    }


    async function uploadFile(file) {
        const body = new FormData();
        body.append("file", file);

        const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
            method: "POST",
            body: body,
        });
        return (await ret.json()).data.url.replace(
            "tmpfiles.org/",
            "tmpfiles.org/dl/"
        );
    }

    const editor = useCreateBlockNote({
        initialContent: [
            {
                type: "paragraph",
                content: "Welcome to this demo!",
            },
            {
                type: "heading",
                content: "This is a heading block",
            },
            {
                type: "paragraph",
                content: "This is a paragraph block",
            },
            {
                type: "paragraph",
                content: "Clear the text area to begin"
            },
        ],
        uploadFile
    })

    async function saveToStorage(jsonBlocks) {
<<<<<<< HEAD
        setArticleData(jsonBlocks)
    }

    const onSubmit = async (data) => {
        console.log(data, articleData, tags)
        const body = new FormData();
        let payload = {}
        if (data['article_type'] === 'Induction') {
            payload = {
                title: data['title'],
                department: data['department'],
                article_type: data['article_type'],
                chapter: data['chapter'],
                duration: data['duration'],
                thumbnail: URL.createObjectURL(articleThumbnail),
                tags: tags,
                article_content: articleData
            }
        } else {
            payload = {
                title: data['title'],
                department: data['department'],
                article_type: data['article_type'],
                tags: tags,
                article_content: articleData,
                thumbnail: URL.createObjectURL(articleThumbnail),
            }
        }

        body.append("article", payload);


        console.log(payload)
        axios.post('https://my-json-server.typicode.com/mark-judah/knowledge-management-system/articles', payload).then((response) => {
            console.log(response);
        }).catch(function (error) {
            console.log(error)
        }).finally(
            navigate('/articles')
        )
=======
        setArticleData(JSON.stringify(jsonBlocks))
>>>>>>> 65f3b87 (removed json-server files, moved to typicode)
    }

    const handleFileChange = (event) => {
        event.preventDefault()
        setArticleThumbnail(event.target.files[0])
    }

    const onSubmit = async (data) => {
        console.log(data, articleData, tags)
        const body = new FormData();

        if (data['article_type'] === 'Induction') {
            body.append('title', data['title']);
            body.append('department', data['department']);
            body.append('article_type', data['article_type']);
            body.append('chapter', data['chapter']);
            body.append('duration', data['duration']);
            body.append('thumbnail', articleThumbnail);
            body.append('tags', tags);
            body.append('article_content', articleData);
        } else {
            body.append('title', data['title']);
            body.append('department', data['department']);
            body.append('article_type', data['article_type']);
            body.append('chapter', data['chapter']);
            body.append('duration', data['duration']);
            body.append('thumbnail', articleThumbnail);
            body.append('tags', tags);
            body.append('article_content', articleData);
        }

        console.log(body)
        axios.post(`${getUrl()}` + '/api/articles/', body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response);
        }).catch(function (error) {
            console.log(error)
        }).finally(
            data['article_type'] === 'General' ? (
                navigate('/articles')
            ) : (
                navigate('/induction')
            )
        )
    }

    return (
        <div>
            <div class='flex flex-col items-center justify-center'>
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

                <BreadCrumb path={path} />

            </div>
            <div class="flex justify-center items-center w-full">
                <div class="m-5 bg-white rounded-lg shadow w-[70vh] sm:w-[80vh] lg:w-[90vh] xl:w-[100vh] 2xl:w-[110vh]">
                    <div class="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                        <span class="text-2xl text-black font-bold">
                            Contribute to the Knowledge Hub
                        </span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="px-5 pb-5">
                            <label class="block mb-1 text-sm text-slate-600 mt-5">
                                Title
                            </label>
                            <input {...register("title")} placeholder="Article title" class="mt-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />

                            <label class="block mb-1 text-sm text-slate-600 mt-5">
                                Department
                            </label>
                            <select {...register("department")} id="departments" class="mt-2 p-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                                <option selected>Choose a department</option>
                                {departments.map((department) => (
                                    <option value={department.id}>{department.title}</option>
                                ))}
                            </select>

                            <label class="block mb-1 text-sm text-slate-600 mt-5">
                                Article Type
                            </label>
                            <select {...register("article_type")} id="type"
                                class="mt-2 p-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                onChange={(e) => setArticleType(e.target.value)}>

                                <option selected>Choose a type</option>
                                <option value="General">General</option>
                                <option value="Induction">Induction</option>
                            </select>
                            <div>
                                <label class="block mb-1 text-sm text-slate-600 mt-5">
                                    Article Thumbnail
                                </label>
                                <input onChange={handleFileChange} type="file"
                                    class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                                {articleThumbnail != '' ? (
                                    <div className="p-2">
                                        <img src={URL.createObjectURL(articleThumbnail)} className="w-32 rounded-lg" />
                                    </div>
                                ) : ('')}
                            </div>
                            {articleType === "Induction" ? (
                                <div>
                                    <div>
                                        <label class="block mb-1 text-sm text-slate-600 mt-5">
                                            Article Chapter
                                        </label>
                                        <input {...register("chapter")} placeholder="Chapter" class="mt-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
                                    </div>

                                    <div>
                                        <label class="block mb-1 text-sm text-slate-600 mt-5">
                                            Estimated duration in minutes
                                        </label>
                                        <input {...register("duration")} placeholder="Article duration" class="mt-2 text-black placeholder-gray-600 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
                                    </div>
                                </div>
                            ) : (
                                ''
                            )}

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
                            <div className="mt-2 min-h-[600px] text-wrap text-black placeholder-black  px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
                                <BlockNoteView
                                    theme={"light"}
                                    editor={editor}
                                    onChange={() => {
                                        saveToStorage(editor.document);
                                    }}
                                />
                            </div>
                        </div>


                        <div class="px-5 ">
                        </div>
                        <hr class="mt-4" />
                        <div class="flex flex-row-reverse p-3">
                            <div class="flex-initial pl-3">
                                <button type="submit" class="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                                        <path d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z" opacity=".3"></path>
                                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
                                    </svg>
                                    <span class="pl-2 mx-1">Save</span>
                                </button>
                            </div>
                            <div class="flex-initial">
                                <button type="submit" class="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
                                    <img src={draftIcon} className="h-6" />
                                    <span class="pl-2 mx-1">Save as draft</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ArticleEditor;