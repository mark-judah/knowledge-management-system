import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumbs";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";

const ArticleView = () => {
    const location = useLocation()
    const { data } = location.state
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const path = location.pathname.split('/');

    const editor = useCreateBlockNote({
        initialContent: data
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
        <div>
            <div className="flex flex-col">
                <div class='flex flex-col items-center justify-center'>
                    <div class='w-full max-w-lg px-10 py-5 mx-auto'>
                        <div class='max-w-md mx-auto space-y-3'>
                            <h2 class="flex flex-row flex-nowrap items-center my-2">
                                <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                                <span class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                                    Article Page
                                </span>
                                <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                            </h2>

                        </div>
                    </div>
                    <BreadCrumb path={path} />

                </div>

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