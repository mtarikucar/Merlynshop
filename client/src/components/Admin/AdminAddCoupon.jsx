import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { storage } from "../../firebase"; // Firebase yapılandırmanızı içeren dosyanız
import axios from "axios";
import { toast } from "react-toastify";


function AdminAddCoupon({ open, setOpen }) {
    const cancelButtonRef = useRef(null);
    const queryClient = useQueryClient();


    const postcouponMutation = useMutation(
        (coupon) =>
            axios.post(`${import.meta.env.VITE_BASE_URL}/coupon`, coupon),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("coupons");
                setOpen(false);
                formik.initialValues.
                    toast.success(`coupon Added`, {
                        position: "bottom-left",
                    });
            },
            onError: (err) => {
                console.log(err);
                toast.error(`Error adding coupon: ${err.message}`, {
                    position: "bottom-left",
                });
            },
        }
    );


    const formik = useFormik({
        initialValues: {
            code: "",
            minOrderAmount: null,
            discountAmount: null,
        },
        onSubmit: async (values) => {

            postcouponMutation.mutate(values);
        },
    });


    useEffect(() => {
        formik.setFieldValue("code", "");
        formik.setFieldValue("minOrderAmount", []);
        formik.setFieldValue("discountAmount", "");
      
    }, [open]);




    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                {/* ...Same Transition.Child, Dialog.Panel and other code as in AdminAddProduct */}
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <form
                                        onSubmit={formik.handleSubmit}
                                        className="min-w-md w-full mx-auto my-10 bg-white p-5 rounded shadow-sm"
                                    >
                                        {/* ...Remaining form fields (if any) */}
                                        <div className="mb-4">
                                            <label
                                                htmlFor="code"
                                                className="block mb-2 text-sm font-medium text-gray-600"
                                            >
                                                İndirim codu:
                                            </label>
                                            <input
                                                id="code"
                                                name="code"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.code}
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="minOrderAmount"
                                                className="block mb-2 text-sm font-medium text-gray-600"
                                            >
                                                Min Tutar:
                                            </label>
                                            <input
                                                id="minOrderAmount"
                                                name="minOrderAmount"
                                                type="number"
                                                onChange={formik.handleChange}
                                                value={formik.values.minOrderAmount}
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="discountAmount"
                                                className="block mb-2 text-sm font-medium text-gray-600"
                                            >
                                                İndirim mıktarı:
                                            </label>
                                            <input
                                                id="discountAmount"
                                                name="discountAmount"
                                                type="number"
                                                onChange={formik.handleChange}
                                                value={formik.values.discountAmount}
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full p-2 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600"
                                            disabled={postcouponMutation.isLoading} // Disable the button while uploading
                                        >
                                            {postcouponMutation.isLoading
                                                ? "Adding coupon..."
                                                : "Add coupon"}
                                        </button>
                                        {/* ...Rest of the code */}
                                    </form>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="w-full p-2 bg-indigo-500 text-white font-semibold rounded hover:bg-rose-600"
                                    >
                                        close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default AdminAddCoupon;
