import React from "react";
import emptyIcon from "../assets/empty.svg"

const Empty = () => {
    return (
        <div>
            <div className="h-[80vh] flex justify-center items-center">
                    <div className="flex flex-col items-center space-y-5">
                        <div>
                            <img src={emptyIcon} className="w-[40vh]" />
                        </div>
                        <div>
                            <p className="text-3xl mt-5 font-bold">Nothing to see here</p>
                        </div>

                    </div>
                </div>
        </div>
    );
}

export default Empty;