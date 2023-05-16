import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SettingsIcon from "@mui/icons-material/Settings";
import UpdateUserModal from "../components/UpdateUserModal";

function Profile() {

    const [createdAt, setCreatedAt] = useState("");
    const [onClose, setOnClose] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user.user);

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

    return (
        <div className="grid grid-cols-12 w-full h-full p-6">
            <div className="col-span-4  h-full  ">
                <div class="m-10 max-w-sm h-full">
                    <div class="rounded-lg border bg-white px-4 pt-4 pb-8 shadow-lg">
                        <button onClick={() => setOnClose(true)} className="btn ">
                            <SettingsIcon />{" "}
                        </button>
                        <div class="relative mx-auto w-36 rounded-full">
                            <img
                                class="mx-auto h-auto w-full rounded-full"
                                src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
                                alt=""
                            />
                        </div>
                        <h1 class="my-1 text-center text-xl font-bold leading-8 text-gray-900">
                            {user.name}
                        </h1>
                        <h3 class="font-lg text-semibold text-center leading-6 text-gray-600">
                            {user.email}
                        </h3>
                        <p class="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Architecto, placeat!
                        </p>

                        <ul class="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                            <li class="flex items-center py-3 text-sm">
                                <span>Status</span>
                                <span class="ml-auto">
                                    <span class="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                                        {user.role}
                                    </span>
                                </span>
                            </li>
                            <li class="flex items-center py-3 text-sm">
                                <span>Joined On</span>
                                <span class="ml-auto">{createdAt}</span>
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
            <div className="col-span-8 z-10 mx-5 my-10 max-h-[60vh] overflow-y-scroll scrollbar scrollbar-thumb-green-400 scrollbar-track-gray-100  overflow-hidden">
                <div className="grid grid-cols-3 gap-3 p-3">
                    <a href="" className="group relative block h-64 sm:h-80 lg:h-96">
                        <span className="absolute inset-0 border-2 border-dashed border-black"></span>

                        <div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                            <div className="p-4 !pt-0 transition-opacity text-3xl group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
                                <LocalShippingIcon fontSize="large" />

                                <h2 className="mt-4 text-xl font-medium sm:text-2xl">
                                    Order :{"jkjkkjkjkkjkkk "}
                                </h2>
                            </div>

                            <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
                                <h3 className="mt-4 text-xl font-medium sm:text-2xl">
                                    Go around the world
                                </h3>

                                <p className="mt-4 text-sm sm:text-base">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Cupiditate, praesentium voluptatem omnis atque culpa
                                    repellendus.
                                </p>

                                <p className="mt-8 font-bold">Read more</p>
                            </div>
                        </div>
                    </a>


                    <a href="" className="group relative block h-64 sm:h-80 lg:h-96">
                        <span className="absolute inset-0 border-2 border-dashed border-black"></span>

                        <div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                            <div className="p-4 !pt-0 transition-opacity text-3xl group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
                                <LocalShippingIcon fontSize="large" />

                                <h2 className="mt-4 text-xl font-medium sm:text-2xl">
                                    Order :{" "}
                                </h2>
                            </div>

                            <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
                                <h3 className="mt-4 text-xl font-medium sm:text-2xl">
                                    Go around the world
                                </h3>

                                <p className="mt-4 text-sm sm:text-base">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Cupiditate, praesentium voluptatem omnis atque culpa
                                    repellendus.
                                </p>

                                <p className="mt-8 font-bold">Read more</p>
                            </div>
                        </div>
                    </a>
                    <a href="" className="group relative block h-64 sm:h-80 lg:h-96">
                        <span className="absolute inset-0 border-2 border-dashed border-black"></span>

                        <div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                            <div className="p-4 !pt-0 transition-opacity text-3xl group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
                                <LocalShippingIcon fontSize="large" />

                                <h2 className="mt-4 text-xl font-medium sm:text-2xl">
                                    Order :{" "}
                                </h2>
                            </div>

                            <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
                                <h3 className="mt-4 text-xl font-medium sm:text-2xl">
                                    Go around the world
                                </h3>

                                <p className="mt-4 text-sm sm:text-base">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Cupiditate, praesentium voluptatem omnis atque culpa
                                    repellendus.
                                </p>

                                <p className="mt-8 font-bold">Read more</p>
                            </div>
                        </div>
                    </a>
                    <a href="" className="group relative block h-64 sm:h-80 lg:h-96">
                        <span className="absolute inset-0 border-2 border-dashed border-black"></span>

                        <div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                            <div className="p-4 !pt-0 transition-opacity text-3xl group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
                                <LocalShippingIcon fontSize="large" />

                                <h2 className="mt-4 text-xl font-medium sm:text-2xl">
                                    Order :{" "}
                                </h2>
                            </div>

                            <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
                                <h3 className="mt-4 text-xl font-medium sm:text-2xl">
                                    Go around the world
                                </h3>

                                <p className="mt-4 text-sm sm:text-base">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Cupiditate, praesentium voluptatem omnis atque culpa
                                    repellendus.
                                </p>

                                <p className="mt-8 font-bold">Read more</p>
                            </div>
                        </div>
                    </a>
                    <a href="" className="group relative block h-64 sm:h-80 lg:h-96">
                        <span className="absolute inset-0 border-2 border-dashed border-black"></span>

                        <div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                            <div className="p-4 !pt-0 transition-opacity text-3xl group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
                                <LocalShippingIcon fontSize="large" />

                                <h2 className="mt-4 text-xl font-medium sm:text-2xl">
                                    Order :{" "}
                                </h2>
                            </div>

                            <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
                                <h3 className="mt-4 text-xl font-medium sm:text-2xl">
                                    Go around the world
                                </h3>

                                <p className="mt-4 text-sm sm:text-base">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Cupiditate, praesentium voluptatem omnis atque culpa
                                    repellendus.
                                </p>

                                <p className="mt-8 font-bold">Read more</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Profile;
