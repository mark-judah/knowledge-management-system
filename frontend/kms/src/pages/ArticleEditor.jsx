import React, { useContext, useEffect, useState } from "react";
import draftIcon from "../assets/draft.svg"
import deleteIcon from "../assets/delete.svg"
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumbs";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useForm } from "react-hook-form"
import axios from "axios";
import { useCreateBlockNote } from "@blocknote/react";
import { getBackendUrl } from "../constants";
import { MyContext } from "../MyContextProvider";
import Swal from "sweetalert2";


const ArticleEditor = () => {
    const [articleData, setArticleData] = useState('')
    const location = useLocation();
    const path = location.pathname.split('/');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [articleType, setArticleType] = useState('');
    const [articleThumbnail, setArticleThumbnail] = useState('')
    const [draft, setDraft] = useState(false);
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const value = useContext(MyContext)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


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

    // const editor = useCreateBlockNote({
    //     initialContent: [
    //         {
    //             type: "paragraph",
    //             content: ""
    //         },
    //     ],
    //     uploadFile
    // })

    const editor = useCreateBlockNote({
        initialContent: location.state ? JSON.parse(location.state.articleData.article_content) : ''
    })

    async function saveToStorage(jsonBlocks) {
        setArticleData(jsonBlocks)
    }

    const handleFileChange = (event) => {
        event.preventDefault()
        setArticleThumbnail(event.target.files[0])
    }

    const onSubmit = async (data) => {
        const body = new FormData();
        if (articleData.length === 0) {
            Swal.fire('The article content cannot be empty', '', 'error')
            return
        }

        body.append('title', data['title']);
        body.append('department', data['department']);
        body.append('article_type', data['article_type']);
        body.append('thumbnail', articleThumbnail);
        body.append('tags', tags);
        body.append('article_content', JSON.stringify(articleData));
        body.append('owner', location.state ? location.state.articleData.owner : localStorage.getItem('username'));
        
        if (data['article_type'] === 'Induction') {
            body.append('chapter', data['chapter']);
            body.append('duration', data['duration']);         
        } else{
            body.append('chapter', '');
            body.append('duration', ''); 
        }

        if (draft) {
            body.append('draft', true);
        }else{
            body.append('draft', false);
        }

        if (location.state) {
            body.append('id', location.state.articleData.id)
            axios.patch(`${getBackendUrl()}` + 'api/articles/', body, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                console.log(response);
                if (response.status == 200) {
                    value.setArticleDataSeed(Math.random())
                    if (location.state.type==='general') {
                        navigate('/manage-articles')
                    }else{
                        navigate('/manage-induction')
                    }
                }
            }).catch(function (error) {
                console.log(error)
                value.setLoading(false)
                if (error.response.status == 401 && location.pathname != '/login') {
                    console.log('logging out')
                    value.logout()
                } else {
                    Swal.fire('An error occured, please try again later', '', 'error')
                }
            })
        } else {
            axios.post(`${getBackendUrl()}` + 'api/articles/', body, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                console.log(response);
                if (response.status == 201) {
                    value.setLoading(false)
                    value.setArticleDataSeed(Math.random())
                    data['article_type'] === 'General' ? (
                        navigate('/articles')
                    ) : (
                        navigate('/induction')
                    )
                }
            }).catch(function (error) {
                console.log(error)
                value.setLoading(false)
                if (error.response.status == 401 && location.pathname != '/login') {
                    console.log('logging out')
                    value.logout()
                } else {
                    Swal.fire('An error occured, please try again later', '', 'error')
                }
            })
        }
    }

    return (
        <div>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-full max-w-lg px-10 py-5 mx-auto'>
                    <div className='max-w-md mx-auto space-y-3'>
                        <h2 className="flex flex-row flex-nowrap items-center my-2">
                            <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            <span className="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                New Article
                            </span>
                            <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                        </h2>

                    </div>
                </div>

                <BreadCrumb path={path} />

            </div>
            <div className="flex justify-center items-center w-full">
                <div className="m-5 bg-white rounded-lg shadow w-[70vh] sm:w-[80vh] lg:w-[90vh] xl:w-[100vh] 2xl:w-[110vh]">
                    <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                        <span className="text-2xl text-black font-bold">
                            Contribute to the Knowledge Hub
                        </span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="px-5 pb-5">
                            <label className="block mb-1 text-sm text-slate-600 mt-5">
                                Title
                            </label>
                            <input {...register("title", {
                                required: true
                            })} placeholder={location.state ? location.state.articleData.title : 'Article title'} className="mt-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
                            {errors.title?.type === "required" && (
                                <small>Title is required</small>
                            )}
                            <label className="block mb-1 text-sm text-slate-600 mt-5">
                                Department
                            </label>
                            <select {...register("department", {
                                required: true
                            })} className="mt-2 p-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                                <option value="" selected disabled>{location.state ? location.state.articleData.department : 'Choose a department'}</option>
                                {value.departments.map((department) => (
                                    <option value={department.id}>{department.title}</option>
                                ))}
                            </select>
                            {errors.department?.type === "required" && (
                                <small>Department is required</small>
                            )}
                            <label className="block mb-1 text-sm text-slate-600 mt-5">
                                Article Type
                            </label>
                            <select {...register("article_type", {
                                required: true
                            })} id="type"
                                className="mt-2 p-2  placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                onChange={(e) => setArticleType(e.target.value)}>

                                <option value="" selected disabled>{location.state ? location.state.articleData.article_type : 'Choose a type'}</option>
                                <option value="General">General</option>
                                <option value="Induction">Induction</option>
                            </select>
                            {errors.article_type?.type === "required" && (
                                <small>Article Type is required</small>
                            )}
                            <div>
                                <label className="block mb-1 text-sm text-slate-600 mt-5">
                                    Article Thumbnail
                                </label>
                                <input {...register("thumbnail", {
                                    required: true
                                })} onChange={handleFileChange} type="file"
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                                {articleThumbnail != '' ? (
                                    <div className="p-2">
                                        <img src={URL.createObjectURL(articleThumbnail)} className="w-32 rounded-lg" />
                                    </div>
                                ) : (
                                    location.state ? (
                                        <img src={`${getBackendUrl()}` + location.state.articleData.thumbnail} className="w-24 my-4 rounded-md md:rounded-lg object-contain" />
                                    ) : ('')
                                )}

                                {errors.thumbnail?.type === "required" && (
                                    <small>Thumbnail is required</small>
                                )}
                            </div>
                            {articleType === "Induction" || location.state?.type==='induction' ? (
                                <div>
                                    <div>
                                        <label className="block mb-1 text-sm text-slate-600 mt-5">
                                            Article Chapter
                                        </label>
                                        <input {...register("chapter", {
                                            required: true
                                        })} placeholder={location.state ? location.state.articleData.chapter : 'Chapter'} className="mt-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
                                        {errors.chapter?.type === "required" && (
                                            <small>Chapter is required</small>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block mb-1 text-sm text-slate-600 mt-5">
                                            Estimated duration in minutes
                                        </label>
                                        <input {...register("duration", {
                                            required: true
                                        })} placeholder={location.state ? location.state.articleData.duration : 'Duration'} className="mt-2 text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
                                        {errors.duration?.type === "required" && (
                                            <small>Duration is required</small>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                ''
                            )}

                            <label className="block mb-1 text-sm text-slate-600 mt-5">
                                Tags
                            </label>
                            <div className="relative mt-2">
                                <input onChange={(e) => setTag(e.target.value)} type="text" className="text-black placeholder-gray-400 w-full px-4 py-2.5 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                                    placeholder={location.state ? location.state.articleData.tags : 'Enter a tag'} />
                                <button onClick={newTag} className="absolute right-1 top-2 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
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


                            <label className="block mb-1 text-sm text-slate-600 mt-5">
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


                        <div className="px-5 ">
                        </div>
                        <hr className="mt-4" />
                        <div className="flex flex-row-reverse p-3">
                            <div className="flex-initial pl-3">
                                <button type="submit" className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                                        <path d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z" opacity=".3"></path>
                                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
                                    </svg>
                                    <span className="pl-2 mx-1">Publish</span>
                                </button>
                            </div>
                            <div className="flex-initial">
                                <button  onClick={()=>setDraft(true)} type="submit" className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
                                    <img src={draftIcon} className="h-6" />
                                    <span className="pl-2 mx-1">Save as draft</span>
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