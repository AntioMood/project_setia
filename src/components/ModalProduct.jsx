import React from "react";

const SkeletonModal = () => {
    return (
        <div className="p-4 space-y-4 animate-pulse">
            <div className="w-full aspect-[3/4] bg-gray-300 rounded-lg"></div>

            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>

            <div className="space-y-2">
                <div className="h-3 w-full bg-gray-300 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
                <div className="h-3 w-4/6 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
};

const ModalProduct = ({ open, onClose, product }) => {
    if (!open) return null;

    const { nama_produk, harga_produk, deskripsi_produk, gambar_produk, jumlah_produk } =
        product || {};

    const isLoading = !product;

    return (
        <div
            className="
                fixed inset-0 bg-black/50 backdrop-blur-sm
                flex items-center justify-center z-50 p-4
                font-montserratAlt font-medium
            "
            onClick={onClose}
        >
            <div
                className="
                    bg-white rounded-2xl shadow-xl
                    w-full max-w-md sm:max-w-lg
                    animate-fadeIn
                "
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg sm:text-xl font-semibold">Detail Produk</h2>
                    <button
                        onClick={onClose}
                        className="
                            text-gray-600 hover:text-black
                            text-2xl leading-none
                            bg-transparent p-0 border-none outline-none shadow-none
                        "
                        aria-label="Tutup Modal"
                    >
                        ×
                    </button>
                </div>

                {/* BODY */}
                {isLoading ? (
                    <SkeletonModal />
                ) : (
                    <div className="p-4 space-y-4">
                        {/* IMAGE */}
                        <div
                            className="
                                w-full
                                aspect-[3/4]
                                sm:aspect-[4/3]
                                bg-gray-100
                                rounded-lg
                                overflow-hidden
                                flex items-center justify-center
                            "
                        >
                            <img
                                src={gambar_produk}
                                alt={nama_produk}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* TITLE & PRICE */}
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold">
                                {nama_produk}
                            </h3>
                            <p className="text-gray-600 text-sm sm:text-base">
                                Rp {Number(harga_produk).toLocaleString("id-ID")}
                            </p>
                        </div>

                        {/* DESCRIPTION */}
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {deskripsi_produk}
                        </p>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {jumlah_produk}
                        </p>
                    </div>
                )}

                {/* FOOTER */}
                <div className="p-4 border-t flex justify-end">
                    <button
                        onClick={onClose}
                        className="
                            px-4 py-2 rounded-lg
                            bg-gray-300 hover:bg-gray-400
                            text-sm sm:text-base
                        "
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalProduct;