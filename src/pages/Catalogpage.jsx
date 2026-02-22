import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ModalLogin from "../components/ModalLogin";
import ModalProduct from "../components/ModalProduct";

import { Card, CardHeader, CardBody } from "@nextui-org/react";

const Pagination = ({ page, totalPages, setPage }) => {
    if (totalPages <= 1) return null;

    const [showAllPages, setShowAllPages] = useState(false);

    const getPages = () => {
        if (totalPages <= 5)
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (page <= 3) return [1, 2, 3, 4, "...", totalPages];
        if (page >= totalPages - 2)
            return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [1, "...", page - 1, page, page + 1, "...", totalPages];
    };

    const pages = getPages();

    return (
        <div className="flex flex-col items-center mt-6">
            <div className="flex justify-center items-center gap-2">
                <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 flex items-center justify-center"
                >
                    ‹
                </button>

                {pages.map((p, i) =>
                    p === "..." ? (
                        <div
                            key={`dots-${i}`}
                            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xl"
                        >
                            …
                        </div>
                    ) : (
                        <button
                            key={`page-${p}-${i}`}
                            onClick={() => setPage(p)}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${page === p
                                ? "bg-[#757575] text-white"
                                : "bg-gray-300"
                                }`}
                        >
                            {p}
                        </button>
                    )
                )}

                <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 flex items-center justify-center"
                >
                    ›
                </button>
            </div>

            {totalPages > 5 && (
                <div className="relative mt-2">
                    <div
                        className="cursor-pointer text-sm text-gray-600 px-2 py-1 rounded-md hover:bg-gray-100"
                        onClick={() => setShowAllPages((s) => !s)}
                    >
                        Lihat semua halaman
                    </div>

                    {showAllPages && (
                        <div className="absolute bottom-full mb-3 bg-white shadow-xl p-4 rounded-xl grid grid-cols-5 gap-3 w-max z-50">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                <button
                                    key={num}
                                    onClick={() => {
                                        setPage(num);
                                        setShowAllPages(false);
                                    }}
                                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${page === num
                                        ? "bg-[#757575] text-white"
                                        : "bg-gray-200 hover:bg-gray-300"
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const Catalogpage = () => {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isProductOpen, setIsProductOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = { page };
            if (search.trim() !== "") {
                params.nama_produk = search;
            }

            const res = await axios.get(
                "https://bangunan.fremwe.my.id/api/produk",
                { params }
            );

            const pagination = res.data.data;
            setProducts(pagination.data);
            setTotalPages(pagination.last_page);
        } catch (error) {
            console.log("Error fetching products:", error);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        // setPage(1);
    }, [page, search]);

    return (
        <div className="min-h-screen pt-20 bg-[#E3E3E3]">
            <Navbar
                onOpenLogin={() => setIsLoginOpen(true)}
                    onSearch={(value) => {
                        setPage(1);  
                        setSearch(value);
                }}
            />

            <ModalLogin open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

            <div className="min-h-[calc(100vh-5rem)] px-4 sm:px-8 lg:px-16">
                <Card className="w-full bg-[#E3E3E3]" shadow="none">
                    <CardHeader>
                        <span className="text-xl sm:text-2xl font-bold font-montserratAlt">
                            List Product
                        </span>
                    </CardHeader>

                    <CardBody className="flex flex-col items-center">
                        <ModalProduct
                            open={isProductOpen}
                            onClose={() => setIsProductOpen(false)}
                            product={selectedProduct}
                        />

                        {loading ? (
                            <div className="mt-10 text-xl">Loading...</div>
                        ) : products.length === 0 ? (
                            <div className="mt-10 text-center text-lg sm:text-xl font-semibold text-gray-700">
                                Barang yang anda cari tidak ditemukan 😢
                            </div>
                        ) : (
                            <div
                                className="
                                    grid
                                    grid-cols-2
                                    sm:grid-cols-2
                                    md:grid-cols-3
                                    lg:grid-cols-4
                                    xl:grid-cols-5
                                    gap-6 sm:gap-8 lg:gap-12
                                    mt-4
                                    place-items-center
                                    font-montserratAlt
                                    font-medium
                                "
                            >
                                {products.map((item) => (
                                    <div
                                        key={item.id_produk}
                                        onClick={() => {
                                            setSelectedProduct(item);
                                            setIsProductOpen(true);
                                        }}
                                        className="
                                            cursor-pointer
                                            w-full
                                            max-w-[10.5rem]
                                            sm:max-w-[14rem]
                                            bg-[#7a7a7a]
                                            rounded-2xl
                                            shadow-lg
                                            flex
                                            flex-col
                                            items-center
                                            p-3
                                            gap-2
                                        "
                                    >
                                        <img
                                            src={item.gambar_produk}
                                            alt={item.nama_produk}
                                            className="w-full aspect-video object-cover bg-white rounded-md"
                                        />

                                        <p className="text-white text-sm sm:text-base mt-3 text-center">
                                            {item.nama_produk}
                                        </p>
                                        <p className="text-white text-xs sm:text-sm mt-auto">
                                            Rp {item.harga_produk}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {products.length > 0 && (
                            <Pagination
                                page={page}
                                totalPages={totalPages}
                                setPage={setPage}
                            />
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Catalogpage;
