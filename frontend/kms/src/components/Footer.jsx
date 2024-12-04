import React, { useContext } from "react";
import { MyContext } from "../MyContextProvider";

const Footer = () => {
    const value = useContext(MyContext)

    return (
        // <footer className="w-full bg-black sm:bg-black md:bg-red-500 lg:bg-green-500 xl:bg-purple-500 2xl:bg-yellow-500 p-8">
        <footer className="w-full bg-black p-8 mt-8">
            <p className="block mb-4 text-sm text-center text-slate-500 md:mb-0 border-t border-black mt-4 pt-4">
                Copyright © {new Date().getFullYear()}&nbsp; {value.companyData.length >0 ? value.companyData[0].title:''}
            </p>
        </footer>
    );
}

export default Footer;