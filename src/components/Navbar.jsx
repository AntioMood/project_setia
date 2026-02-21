import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

const Navbar = ({ onOpenLogin, onSearch }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [keyword, setKeyword] = useState("");

    const debouncedSearch = useCallback(
        debounce((value) => {
            onSearch(value);
        }, 500),
        []
    );

    const handleChange = (e) => {
        const value = e.target.value;
        setKeyword(value);
        debouncedSearch(value);
    };


    return (
        <>
            <div className="w-full flex items-center justify-center fixed z-20 top-0">
                <div className="bg-[#757575] w-full p-3 relative">

                    <div className="relative flex items-center px-4">

                        <div className="flex-1">
                            <Link to="/" className="hidden md:flex items-center">
                                <img
                                    src="/Logo-Setia-HD.png"
                                    alt="Logo"
                                    className="h-10 w-auto"
                                />
                            </Link>
                        </div>
                        <h3
                            className="
                                absolute left-1/2 -translate-x-1/2
                                text-2xl md:text-3xl lg:text-5xl
                                font-semibold text-[#E3E3E3]
                                font-montserratAlt
                                [text-shadow:0_3px_6px_rgba(0,0,0,0.55)]
                            "
                        >
                            Catalogue
                        </h3>
                        <div className="flex-1 flex justify-end items-center gap-4">

                            <div
                                className="
                                    hidden md:flex items-center gap-2
                                    bg-[#B1B1B1] rounded-full
                                    px-3 py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2
                                "
                            >
                                <i className="bx bx-search text-xl text-[#757575]"></i>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="
                                        bg-transparent outline-none
                                        text-xs md:text-xs lg:text-sm
                                        w-28 md:w-28 lg:w-40
                                    "
                                    value={keyword}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                onClick={onOpenLogin}
                                className="hidden md:flex flex-col items-center bg-transparent"
                            >
                                <i className="bx bxs-user text-3xl text-[#B1B1B1]"></i>
                                <p className="text-[10px] leading-none text-black font-montserratAlt">
                                    Admin
                                </p>
                            </button>
                            <button
                                className="md:hidden text-white text-4xl"
                                onClick={() => setOpenMenu(true)}
                            >
                                <i className="bx bx-menu"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {openMenu && (
                <div
                    className="
                        fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm 
                        flex justify-end z-30
                    "
                    onClick={() => setOpenMenu(false)}
                >
                    <div
                        className="w-64 h-full bg-white shadow-xl p-6 flex flex-col gap-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="text-3xl self-end"
                            onClick={() => setOpenMenu(false)}
                        >
                            <i className="bx bx-x"></i>
                        </button>
                        <div className="flex justify-center">
                            <img
                                src="/Logo-Setia-HD.png"
                                alt="Logo"
                                className="h-16 w-auto mx-auto"
                            />
                        </div>
                        <div className="flex items-center gap-2 bg-gray-200 rounded-full px-4 py-2">
                            <i className="bx bx-search text-xl text-gray-600"></i>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent outline-none text-sm w-full"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => {
                                setOpenMenu(false);
                                onOpenLogin();
                            }}
                            className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl"
                        >
                            <i className="bx bxs-user text-3xl text-gray-600"></i>
                            <span className="text-gray-700">Admin Login</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
