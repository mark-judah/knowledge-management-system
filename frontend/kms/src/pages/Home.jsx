import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuickLinks from "../components/QuickLinks";

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
        const token = localStorage.getItem('token')
        console.log(token)
        if (token === null) {
            navigate('/login')
        }

    }, [navigate]);

    return (
        <div>
            <QuickLinks/>
        </div>
    );
}

export default Home;