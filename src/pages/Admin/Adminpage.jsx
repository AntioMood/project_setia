import AdminNavbar from "../../components/AdminNavbar";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    useDisclosure,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalEdit from "../../components/ModalEdit";
import ModalInputExcel from "../../components/ModalInputExcel";
import ModalUpdateStok from "../../components/Modalupdatestok";
import Swal from "sweetalert2";

const Adminpage = () => {

    const [produk, setProduk] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editMode, setEditMode] = useState("add");
    const [selectedItem, setSelectedItem] = useState(null);

    const [isStokOpen, setIsStokOpen] = useState(false);
    const [stokProduct, setStokProduct] = useState(null);

    const {
        isOpen: isExcelOpen,
        onOpen: onExcelOpen,
        onClose: onExcelClose,
    } = useDisclosure();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]);

    const fetchProduk = async () => {
        try {
            setLoading(true);

            const res = await axios.get("http://bangunan.fremwe.my.id/api/produk", {
                params: {
                    nama_produk: debouncedSearch,
                    page: currentPage
                }
            });

            const response = res.data.data;

            setProduk(response.data || []);
            setTotalPages(response.last_page || 1);

        } catch (err) {
            console.error("Gagal fetch produk:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduk();
    }, [debouncedSearch, currentPage]);

    const truncateText = (text, maxLength = 50) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    const handleSave = async (formData) => {
        const token = localStorage.getItem("token");

        if (!token) {
            Swal.fire("Error", "Token tidak ditemukan! Pastikan sudah login.", "error");
            return;
        }

        const isAdd = editMode === "add";
        const url = isAdd
            ? "http://bangunan.fremwe.my.id/api/produk"
            : `http://bangunan.fremwe.my.id/api/produk/${selectedItem.id_produk}`;

        const confirmResult = await Swal.fire({
            title: isAdd ? "Anda yakin ingin menyimpan produk?" : "Anda yakin ingin mengedit produk?",
            text: isAdd
                ? "Produk akan disimpan."
                : "Perubahan data produk akan disimpan.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: isAdd ? "Simpan" : "Update",
            cancelButtonText: "Batal",
        });

        if (!confirmResult.isConfirmed) return;

        try {
            await axios.post(url, formData, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            await Swal.fire({
                title: "Berhasil!",
                text: isAdd ? "Produk berhasil ditambahkan." : "Produk berhasil diedit.",
                icon: "success",
            });

            fetchProduk();
            onClose();

        } catch (error) {
            console.error("Gagal menyimpan:", error);

            Swal.fire({
                title: "Gagal",
                text: "Terjadi kesalahan saat menyimpan data.",
                icon: "error",
            });
        }
    };


    const handleDelete = async (id_produk) => {
        const token = localStorage.getItem("token");

        if (!token) {
            Swal.fire("Error", "Token tidak ditemukan! Pastikan sudah login.", "error");
            return;
        }

        const result = await Swal.fire({
            title: "Anda yakin ingin menghapus produk?",
            text: "Data produk akan dihapus secara permanen.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
        });

        if (!result.isConfirmed) return;

        try {
            await axios.delete(`http://bangunan.fremwe.my.id/api/produk/${id_produk}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            Swal.fire("Berhasil!", "Produk berhasil dihapus.", "success");

            fetchProduk();

        } catch (error) {
            console.error("Gagal menghapus:", error);

            Swal.fire("Gagal!", "Produk tidak dapat dihapus.", "error");
        }
    };

    const formatRupiah = (angka) => {
        if (!angka) return "Rp 0";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(Number(angka));
    };


    return (
        <div className="min-h-screen pt-20">
            <AdminNavbar activeIndexProp={2} />

            <ModalInputExcel
                isOpen={isExcelOpen}
                onClose={onExcelClose}
                onSuccess={fetchProduk}
            />

            <ModalUpdateStok
                isOpen={isStokOpen}
                onClose={() => setIsStokOpen(false)}
                product={stokProduct}   
                onSuccess={fetchProduk}
            />

            <div className="min-h-[calc(100vh-5rem)] px-4 sm:px-8 lg:px-16 py-6">
                <Card className="w-full">

                    <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <p className="text-2xl sm:text-3xl font-montserratAlt font-semibold">
                            Produk
                </p>

                        <input
                            type="text"
                            placeholder="Cari produk..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:w-60 px-3 py-2 border rounded-md font-montserratAlt font-medium focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </CardHeader>

                    <CardBody>
                        <div className="flex mb-4">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        color="primary"
                                        className="text-base font-montserratAlt"
                                    >
                                        Tambah Data ▾
                                    </Button>
                                </DropdownTrigger>

                                <DropdownMenu
                                    aria-label="Menu Tambah Produk"
                                    onAction={(key) => {
                                        if (key === "tambah") {
                                            setEditMode("add");
                                            setSelectedItem(null);
                                            onOpen();
                                        }

                                        if (key === "excel") {
                                            onExcelOpen();
                                        }
                                    }}
                                >
                                    <DropdownItem key="tambah">
                                        ➕ Tambah Produk
                                    </DropdownItem>

                                    <DropdownItem key="excel">
                                        📊 Input Data menggunakan Excel
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>

                        {loading ? (
                            <p className="text-center py-10">Memuat data...</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table className="[&_*]:text-sm sm:[&_*]:text-base">
                                    <TableHeader>
                                        <TableColumn>No</TableColumn>
                                        <TableColumn>Nama</TableColumn>
                                        <TableColumn>Harga</TableColumn>

                                        {/* HIDE ON MOBILE */}
                                        <TableColumn className="hidden md:table-cell">
                                            Deskripsi
                                        </TableColumn>

                                        <TableColumn>Aksi</TableColumn>
                                    </TableHeader>

                                    <TableBody emptyContent="Tidak ada data." items={produk}>
                                        {produk.map((item, index) => (
                                            <TableRow key={item.id_produk}>
                                                <TableCell>
                                                    {(currentPage - 1) * 10 + index + 1}
                                                </TableCell>

                                                <TableCell>{item.nama_produk}</TableCell>

                                                <TableCell>
                                                   {formatRupiah(item.harga_produk)}
                                                </TableCell>

                                                <TableCell className="hidden md:table-cell">
                                                    {truncateText(item.deskripsi_produk, 50)}
                                                </TableCell>

                                                <TableCell className="flex flex-col sm:flex-row gap-2">
                                                    <Button
                                                        size="sm"
                                                        className="bg-yellow-400"
                                                        onClick={() => {
                                                            setEditMode("edit");
                                                            setSelectedItem(item);
                                                            onOpen();
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        className="bg-blue-500 text-white"
                                                        onClick={() => {
                                                            setStokProduct(item);
                                                            setIsStokOpen(true);
                                                        }}
                                                    >
                                                        Update Stok
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        className="bg-red-500 text-white"
                                                        onClick={() => handleDelete(item.id_produk)}
                                                    >
                                                        Hapus
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}

                        <div className="flex justify-center items-center gap-4 mt-6">
                            <button
                                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-300 rounded-full disabled:opacity-40"
                            >
                                ❮
                </button>

                            <span className="text-lg font-medium">
                                {currentPage} / {totalPages}
                            </span>

                            <button
                                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-300 rounded-full disabled:opacity-40"
                            >
                                ❯
                </button>
                        </div>

                    </CardBody>
                </Card>
            </div>

            <ModalEdit
                isOpen={isOpen}
                onClose={onClose}
                mode={editMode}
                initialData={selectedItem}
                onSave={handleSave}
            />
        </div>

    );
};

export default Adminpage;
