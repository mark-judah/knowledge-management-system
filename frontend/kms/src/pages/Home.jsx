import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token === null) {
            navigate('/login')
        }

    }, [navigate]);

    return (
        <div>
        </div>
    );
}

export default Home;