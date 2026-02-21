import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginModal = ({ open, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!open) {
            setEmail("");
            setPassword("");
            setErrors({});
        }
    }, [open]);

    const validate = () => {
        let newErrors = {};

        if (!email) newErrors.email = "Email wajib diisi";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Format email tidak valid";

        if (!password) newErrors.password = "Password wajib diisi";
        else if (password.length < 6) newErrors.password = "Minimal 6 karakter";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {
            const response = await axios.post(
                "http://bangunan.fremwe.my.id/api/auth/login",
                {
                    email: email,
                    password: password
                }
            );

            const token = response.data.data.access_token;

            localStorage.setItem("token", token);

            console.log("TOKEN DISIMPAN:", token);

            onClose();
            navigate("/admin");

        } catch (error) {
            console.log(error);
            if (error.response?.data?.message) {
                setErrors({
                    api: error.response.data.message
                });
            } else {
                setErrors({
                    api: "Terjadi kesalahan. Coba lagi."
                });
            }
        }

        setLoading(false);
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[999]"
            onClick={onClose}
        >
            <div className="bg-white w-[30rem] p-6 rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()}>

                <h2 className="text-2xl font-bold mb-4 text-center">Login Admin</h2>

                {errors.api && (
                    <p className="text-red-500 text-sm mb-2 text-center">{errors.api}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">

                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-md"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-md"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex flex-col justify-center items-center gap-4">
                        <button
                            className="bg-blue-500 w-1/2 py-2 mt-2 rounded-md text-white hover:text-[#B1B1B1]"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="w-1/2 py-2 text-sm text-white hover:text-[#B1B1B1] bg-[#757575]"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
