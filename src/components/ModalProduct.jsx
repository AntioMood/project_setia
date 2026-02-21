import React from "react";

const ModalProduct = ({ open, onClose, product }) => {
    if (!open) return null;

    const { nama_produk, harga_produk, deskripsi_produk, gambar_produk } = product || {};

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-montserratAlt font-medium"
            onClick={onClose} 
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-fadeIn"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Detail Produk</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-black
                        text-2xl leading-none bg-transparent p-0 border-none outline-none shadow-none"
                        aria-label="Tutup Modal"
                    >
                        x
                    </button>
                </div>
                <div className="p-4 space-y-4">
                    {gambar_produk ? (
                        <img
                            src={gambar_produk}
                            alt={nama_produk}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    ) : (
                        <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
                    )}

                    <div>
                        <h3 className="text-lg font-semibold">
                            {nama_produk || "Nama Produk"}
                        </h3>
                        <p className="text-gray-500">
                            {harga_produk
                                ? "Rp " + harga_produk.toLocaleString("id-ID")
                                : "Harga tidak tersedia"}
                        </p>
                    </div>

                    <p className="text-sm text-gray-600">
                        {deskripsi_produk || "Tidak ada deskripsi tersedia."}
                    </p>
                </div>
                <div className="p-4 border-t flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalProduct;
