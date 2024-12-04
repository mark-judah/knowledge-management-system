import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickLinks from "../components/QuickLinks";

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className="bg-[#F5F5F5]">
            <QuickLinks />
        </div>
    );
}

export default Home;