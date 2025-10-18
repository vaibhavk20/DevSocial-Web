import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const AppLayout = () => {
    return (
        <div>
            <Navbar />
            {/* body */}
            <div className="p-5">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default AppLayout;
