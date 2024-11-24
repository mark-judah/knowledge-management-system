import React, { useContext } from "react";
import { Circles } from 'react-loader-spinner'
import { MyContext } from "../MyContextProvider";

const LoadingAnimation = () => {
    const value=useContext(MyContext)

    return (
        <div className="absolute h-screen flex justify-center items-center z-10">
            {value.loading ? (
                <Circles
                    height="80"
                    width="80"
                    color="#000000"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            ) : (
                ''
            )}
        </div>
    );
}

export default LoadingAnimation;


