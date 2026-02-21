import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="w-full bg-[#757575] h-20 flex items-center px-6 fixed top-0 left-0 z-50 shadow">
            <div className="flex items-center justify-between w-full">

                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
                    <img src="/Logo-Setia-HD.png" alt="Logo" className="h-14 object-contain" />
                    <h1 className="text-4xl font-bold text-[#E3E3E3] hidden md:block font-montserratAlt">
                        Administration
                    </h1>
                </div>
                <button
                    className="ml-auto bg-transparent border-0"
                    onClick={handleLogout}
                >
                    <i className="bx bx-log-out text-2xl text-black hover:text-red-600 transition"></i>
                </button>
            </div>
        </nav>
    );
}
