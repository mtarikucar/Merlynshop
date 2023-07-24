import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import AdminAddCoupon from "../../components/Admin/AdminAddCoupon";

function AdminCoupon() {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const queryClient = useQueryClient();
  const { token } = useSelector((store) => store.auth);
  const fetchCoupons = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/coupon`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return res.data;
  };

  const {
    data: coupons,
    isLoading,
    isError,
  } = useQuery(["coupons"], fetchCoupons);

  const deleteCouponMutation = useMutation(
    (couponId) =>
      axios.delete(`${import.meta.env.VITE_BASE_URL}/coupon/${couponId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("coupons");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleDeleteCoupon = (couponId) => {
    deleteCouponMutation.mutate(couponId);
  };

  if (isLoading) return <p>Loading coupon...</p>;

  if (isError) return <p>Error loading coupon</p>;

  console.log(coupons);

  return (
    <>
      <div className="h-full w-full mt-4 mb-10 border-2 rounded-lg">
        <div className="w-full   mr-24">
          <div className="pl-8 mt-4">
            <button
              onClick={() => setOpenAddProduct(true)}
              className=" inline-flex items-center text-white bg-green-500 border hover:bg-white border-green-500 hover:text-gray-900 font-medium rounded-lg text-sm px-3 py-1.5 outline-none"
              type="button"
            >
              Add coupon
            </button>
          </div>
          <div className="">
            <div class="flex flex-wrap gap-x-4 gap-y-12  px-4 py-8 lg:px-8">
              {coupons?.map((coupon, key) => (
                <div key={key} class="flex w-72">
                  <div class="flex w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
                    <div class="p-3 flex  justify-between">
                      <div class="  h-16 w-16 rounded-xl bg-gradient-to-tr from-green-700 to-green-500 text-center text-white shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="mt-4 h-7 w-16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div class="pt-1">
                        <p class="text-sm font-light capitalize">Indirim</p>
                        <h4 class="text-2xl font-semibold tracking-tighter xl:text-2xl">
                          ₺{coupon.discountAmount}
                        </h4>
                      </div>
                      <div class="pt-1">
                        <p class="text-sm font-light capitalize ">Min Tutar</p>
                        <h4 class="text-2xl font-semibold tracking-tighter xl:text-2xl">
                          ₺{coupon.minOrderAmount}
                        </h4>
                      </div>
                    </div>
                    <hr class="opacity-50" />
                    <div class="py-2 px-3  flex justify-between items-center">
                      <p class="font-light">
                        <span class="text-md font-bold text-slate-600-600">
                          #{coupon.code}{" "}
                        </span>
                      </p>
                      <button
                        onClick={() => handleDeleteCoupon(coupon.id)}
                        className="  inline-flex items-center text-white bg-rose-500 border hover:bg-white border-rose-500 hover:text-gray-900 font-medium rounded-lg text-sm px-3 py-1.5 outline-none"
                        type="button"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <AdminAddCoupon open={openAddProduct} setOpen={setOpenAddProduct} />
      </div>
    </>
  );
}

export default AdminCoupon;
