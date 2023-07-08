import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SettingsIcon from "@mui/icons-material/Settings";
import UpdateUserModal from "../components/UpdateUserModal";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import DeleteOrderModal from "../components/DeleteOrderModal";
import Loading from "../components/Loading";
function Profile() {
  const [orderId, setOrderId] = useState();
  const [close, setClose] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [onClose, setOnClose] = useState(false);
  const [onOrderClose, setOrderOnClose] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const givenDate = new Date(user.createdAt);
    setCreatedAt(
      givenDate.getDate() +
      "/" +
      (givenDate.getMonth() + 1) +
      "/" +
      givenDate.getFullYear()
    );
  }, []);

  const {
    isLoading,
    isError,
    data: orders,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      axios.get(
        `${import.meta.env.VITE_BASE_URL}/order/user/${user.id}`
      ),
  });

  const cancelHandle = (order) => {
    setOrderId(order);
    setClose(true);
  };

  console.log(orders);

  return (
    <div className="  md:grid lg:grid  lg:grid-cols-12 w-full h-full lg:py-6">
      {close ? (
        <DeleteOrderModal close={close} setClose={setClose} orderId={orderId} />
      ) : null}
      <div className="col-span-3  h-full  ">
        <div className="my-4 h-full">
          <div className="rounded-lg border bg-white px-4 pt-4 pb-8 shadow-lg">
            <button onClick={() => setOnClose(true)} className="btn ">
              <SettingsIcon />{" "}
            </button>
            <div className="relative mx-auto w-36 rounded-full">
              <img
                className="mx-auto h-auto w-full rounded-full"
                src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
                alt=""
              />
            </div>
            <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
              {user?.name}
            </h1>
            <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
              {user?.email}
            </h3>
            <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Architecto, placeat!
            </p>

            <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
              <li className="flex items-center py-3 text-sm">
                <span>Status</span>
                <span className="ml-auto">
                  <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                    {user?.role}
                  </span>
                </span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span>Joined On</span>
                <span className="ml-auto">{createdAt}</span>
              </li>
            </ul>
          </div>
        </div>
        {onClose ? (
          <UpdateUserModal
            onClose={onClose}
            setOnClose={setOnClose}
            user={user}
          />
        ) : null}
      </div>

      {isLoading ? (<Loading />) : (
        <div className="lg:col-span-9 md:col-span-9 z-10 my-10 max-h-[60vh] w-full overflow-y-scroll  scrollbar scrollbar-thumb-green-400 scrollbar-track-gray-100  overflow-hidden">
          <div className="grid px-8">
            {isSuccess ? (
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      image
                    </th>

                    <th scope="col" className="px-6 py-3">
                      adress
                    </th>
                    <th scope="col" className="px-6 py-3">
                      status
                    </th>

                    <th scope="col" className="px-6 py-3">
                      total price
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders &&
                    orders?.data.map((order) => (
                      <tr
                        key={order.id}
                        className="bg-white border-b  hover:bg-gray-50 "
                      >
                        <th
                          scope="row"
                          className="flex items-center px-6 py-4whitespace-nowrap"
                        >
                          {order.products.map((product, key) => (
                            <div>
                              <div>
                                <img
                                  className="w-20 px-1 h-20 rounded"
                                  src={product.thumbnail}
                                  alt="Jese image"
                                />
                              </div>
                              <td>
                                <div className="text-center w-full">
                                  <div className=" text-sm font-semibold">
                                    quantity: {product.order_product.quantity}
                                  </div>
                                </div>
                              </td>
                            </div>
                          ))}
                        </th>
                        <td>
                          <div className="pl-3">
                            <div className="text-base font-semibold">
                              {order.location.address}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div
                              className={`h-2.5 w-2.5 rounded-ful mr-2 rounded-full ${order.status == "canceled"
                                ? "bg-red-500"
                                : "bg-green-500 "
                                }`}
                            ></div>
                            {order.status}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {order.total_price / 100}.00₺
                          </div>
                        </td>
                        <td className="px-6 py-4 space-x-2 text-center">

                          {order.status != "canceled" ? (
                            <button
                              type="submit"
                              id={`${order.id}`}
                              onClick={() => cancelHandle(order)}
                              className="font-medium bg-red-600 px-2 py-1 rounded-lg text-white"
                            >
                              Cancel Order
                            </button>
                          ) :
                            <p>order is cancelled</p>}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <div className=" w-full uppercase text-center">
                Come on place an order
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
