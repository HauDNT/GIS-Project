import React from "react";
import { useNavigate, Outlet } from 'react-router-dom';


function Home() {
    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default Home;