import {
    Modal,
    ModalContent
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const ModalEdit = ({ isOpen, onClose, mode = "add", initialData = null, onSave }) => {

    const [nama, setNama] = useState("");
    const [harga, setHarga] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [jumlah, setJumlah] = useState("");

    const [gambar, setGambar] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setNama(initialData.nama_produk || "");
            setHarga(initialData.harga_produk || "");
            setDeskripsi(initialData.deskripsi_produk || "");
            setJumlah(initialData.jumlah_produk || "");
            if (initialData.gambar_produk) {
                setPreview(initialData.gambar_produk);
            }
        } else {
            setNama("");
            setHarga("");
            setDeskripsi("");
            setJumlah("");
            setGambar(null);
            setPreview(null);
        }
    }, [isOpen, mode, initialData]);

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("nama_produk", nama);
        formData.append("harga_produk", harga);
        formData.append("deskripsi_produk", deskripsi);
        formData.append("jumlah_produk", jumlah);

        if (gambar) {
            formData.append("gambar_produk", gambar);
        }

        onSave(formData);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            backdrop="blur"
            size="lg"
            hideCloseButton
            classNames={{
                wrapper: "items-center justify-center",
                base: "bg-[#e6e6e6] rounded-2xl shadow-xl"
            }}
        >
            <ModalContent
                className="
                    max-h-[90vh]
                    flex flex-col
                    overflow-hidden
                "
            >
                {/* HEADER (STICKY) */}
                <div className="sticky top-0 z-10 bg-[#e6e6e6] px-6 py-4 flex justify-between items-center">
                    <h2 className="font-semibold text-lg">
                        {mode === "add" ? "Tambah Produk" : "Edit Produk"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-xl hover:text-red-600 transition"
                    >
                        ✕
                    </button>
                </div>

                {/* BODY (SCROLLABLE) */}
                <div className="flex-1 overflow-y-auto px-6 pb-6">

                    <div className="flex flex-col items-center w-full pt-2">

                        {/* PREVIEW IMAGE */}
                        <div
                            className="
                                w-full max-w-[320px] sm:max-w-[350px]
                                aspect-[3/4]
                                bg-white
                                border border-gray-300
                                rounded-xl
                                flex items-center justify-center
                                mb-4
                                overflow-hidden
                            "
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <span className="text-gray-500 text-sm sm:text-lg font-medium">
                                    Preview Gambar
                                </span>
                            )}
                        </div>

                        {/* UPLOAD */}
                        <label className="w-full max-w-[320px] sm:max-w-[350px]">
                            <div className="cursor-pointer bg-blue-500 text-white py-2 rounded-lg text-center text-sm hover:bg-gray-800 transition">
                                Upload Gambar
                            </div>

                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    const allowedTypes = ["image/png", "image/jpeg"];
                                    if (!allowedTypes.includes(file.type)) {
                                        alert("Format gambar harus PNG atau JPG/JPEG");
                                        e.target.value = "";
                                        return;
                                    }

                                    const maxSize = 1 * 1024 * 1024;
                                    if (file.size > maxSize) {
                                        alert("Ukuran gambar maksimal 1 MB");
                                        e.target.value = "";
                                        return;
                                    }

                                    setGambar(file);
                                    setPreview(URL.createObjectURL(file));
                                }}
                                required={mode === "add"}
                            />
                        </label>

                        {/* FORM */}
                        <div className="w-full max-w-[320px] sm:max-w-[350px] flex flex-col gap-4 mt-6">

                            <div>
                                <label>Harga</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md mt-1"
                                    value={harga}
                                    onChange={(e) => setHarga(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label>Nama Produk</label>
                                <input
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md mt-1"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label>Deskripsi</label>
                                <textarea
                                    rows={2}
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md mt-1"
                                    value={deskripsi}
                                    onChange={(e) => setDeskripsi(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>Jumlah</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md mt-1"
                                    value={jumlah}
                                    onChange={(e) => setJumlah(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full mt-3 bg-blue-500 text-white py-3 rounded-lg text-md hover:bg-gray-800 transition"
                            >
                                {mode === "add" ? "Tambah" : "Simpan"}
                            </button>

                        </div>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
};

export default ModalEdit;