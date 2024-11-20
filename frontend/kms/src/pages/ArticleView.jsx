import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumbs";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import newArticleIcon from "../assets/draft.svg"

const ArticleView = () => {
    const location = useLocation()
    const { data } = location.state
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const path = location.pathname.split('/');

    const editor = useCreateBlockNote({
        initialContent: JSON.parse(data)
    })

    async function saveToStorage(jsonBlocks) {

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

    return (
        <div className="min-h-screen">
            <div className="flex flex-col">
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full max-w-lg px-10 py-5 mx-auto'>
                        <div className='max-w-md mx-auto space-y-3'>
                            <h2 className="flex flex-row flex-nowrap items-center my-2">
                                <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                                <span className="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                    Article Page
                                </span>
                                <span className="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            </h2>

                        </div>
                    </div>
                    <BreadCrumb path={path} />

                </div>

                <Link to="/article-editor">
                    <div className="flex justify-end mx-10">
                        <button className="w-fit flex justify-center items-center rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none" type="button">
                            <img src={newArticleIcon} className="h-7 mx-1" alt="new article" />
                            Save Changes
                        </button>
                    </div>
                </Link>

                <div className="mt-10 flex justify-center">
                    <BlockNoteView
                        theme={"light"}
                        editor={editor}
                        onChange={() => {
                            saveToStorage(editor.document);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ArticleView;