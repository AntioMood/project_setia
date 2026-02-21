import { Modal, ModalContent } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModalInputExcel = ({ isOpen, onClose, onSuccess }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const allowedTypes = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
        ];

        if (!allowedTypes.includes(selectedFile.type)) {
            Swal.fire("Error", "File harus berupa Excel (.xlsx / .xls)", "error");
            e.target.value = "";
            return;
        }

        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            Swal.fire("Error", "Silakan pilih file Excel", "error");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire("Error", "Token tidak ditemukan", "error");
            return;
        }

        const formData = new FormData();
        // 🔥 HARUS SAMA DENGAN BACKEND
        formData.append("excel_file", file);

        try {
            setLoading(true);

            await axios.post(
                "ttp://bangunan.fremwe.my.id/api/produk/excel",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            Swal.fire("Berhasil", "Produk berhasil diimport", "success");
            onSuccess?.();
            onClose();

        } catch (error) {
            console.error(error.response?.data || error);

            Swal.fire(
                "Gagal",
                error.response?.data?.message || "Import gagal",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadTemplate = () => {
        window.open("/template/template_produk.xlsx", "_blank");
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Import Produk dari Excel
                </h2>

                {/* FILE INPUT (STYLED) */}
                <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-700
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />

                {/* DOWNLOAD TEMPLATE */}
                <p className="text-sm text-gray-600 mt-4">
                    Gunakan template ini agar format sesuai dengan sistem.{" "}
                    <span
                        onClick={handleDownloadTemplate}
                        className="text-blue-600 cursor-pointer font-semibold hover:underline"
                    >
                        Download Disini
                    </span>
                </p>

                {/* UPLOAD BUTTON */}
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg
                    hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? "Mengupload..." : "Upload Excel"}
                </button>
            </ModalContent>
        </Modal>
    );
};

export default ModalInputExcel;
