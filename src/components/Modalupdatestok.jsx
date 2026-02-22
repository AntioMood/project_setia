import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModalUpdateStok = ({ isOpen, onClose, product, onSuccess }) => {
    const [jumlah, setJumlah] = useState(0);

    useEffect(() => {
        if (isOpen && product) {
            // ambil stok dari backend
            setJumlah(Number(product.jumlah_produk));
        }
    }, [isOpen, product]);

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            Swal.fire("Error", "Token tidak ditemukan", "error");
            return;
        }

        if (jumlah === 0) {
            Swal.fire("Warning", "Jumlah stok tidak boleh 0", "warning");
            return;
        }

        try {
            await axios.patch(
                `https://bangunan.fremwe.my.id/api/produk/${id_produk}`,
                {
                    jumlah: jumlah, // bisa positif atau negatif
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            Swal.fire("Berhasil", "Stok berhasil diperbarui", "success");
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            Swal.fire("Gagal", "Gagal update stok", "error");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="center">
            <ModalContent>
                <ModalHeader>Update Stok</ModalHeader>
                <ModalBody>
                    <p className="text-sm text-gray-600 mb-2">
                        Produk: <b>{product?.nama_produk}</b>
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <Button
                            color="danger"
                            onClick={() => setJumlah((prev) => prev - 1)}
                        >
                            -
                        </Button>

                        <Input
                            type="number"
                            value={jumlah}
                            onChange={(e) => setJumlah(Number(e.target.value))}
                            className="w-24 text-center"
                        />

                        <Button
                            color="success"
                            onClick={() => setJumlah((prev) => prev + 1)}
                        >
                            +
                        </Button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-2">
                        Gunakan + untuk menambah stok, - untuk mengurangi stok
                    </p>
                </ModalBody>

                <ModalFooter>
                    <Button variant="light" onClick={onClose}>
                        Batal
                    </Button>
                    <Button color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalUpdateStok;