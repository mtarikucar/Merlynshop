import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
function Checkout() {


    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)



    return (
        <div>
            <section>
                <h1 className="sr-only">Checkout</h1>

                <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
                    <div className="bg-gray-50 py-8 md:py-8">
                        <div className="mx-auto max-w-lg space-y-2 px-4 lg:px-8">
                            <div className="flex items-center ">
                           

                                <h2 className="font-medium text-xl text-gray-900">orders</h2>
                            </div>

                            <div>
                                <p className="text-2xl font-medium tracking-tight text-gray-900">
                                   Total Price : ${cart.cartTotalAmount}
                                </p>

                                <p className="mt-1 text-sm text-gray-600">
                                    Total Quantity: {cart.cartTotalQuantity}
                                </p>
                            </div>

                            <div>
                                <div className="flow-root  ">
                                    <ul className="-my-4 divide-y  divide-gray-100">

                                        {
                                            cart &&
                                            cart?.cartItems.map((product) => (


                                                <li key={product.id} className="flex items-center gap-4 border-b p-2 py-4">
                                                    <img
                                                        src={product.thumbnail}
                                                        alt={product.name}
                                                        className="h-32 w-32 rounded object-cover"
                                                    />

                                                    <div className='w-full'>
                                                        <h3 className="text-sm text-gray-900">{product.name}</h3>

                                                        <div className='flex flex-row justify-between items-center w-full'>
                                                            <div>

                                                                <dl className="mt-0.5 space-y-px text-sm text-gray-600">
                                                                    <div>
                                                                        <dt className="inline">Size:</dt>
                                                                        <dd className="inline">XXS</dd>
                                                                    </div>

                                                                    <div>
                                                                        <dt className="inline">category:</dt>
                                                                        <dd className="inline">{product.category}</dd>
                                                                    </div>
                                                                </dl>
                                                            </div>
                                                            <div className='text-sm  text-center'>
                                                                <p>quantity: {product.cartQuantity}</p>
                                                                <p>price: ${product.price}</p>
                                                                <span>{product.cartQuantity}x ${product.price} </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }


                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white py-12 md:py-24">
                        <div className="mx-auto max-w-lg px-4 lg:px-8">
                            <form className="grid grid-cols-6 gap-4">
                                <div className="col-span-3">
                                    <label
                                        htmlFor="FirstName"
                                        className="block text-xs font-medium text-gray-700"
                                    >
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        id="FirstName"
                                        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-3">
                                    <label
                                        htmlFor="LastName"
                                        className="block text-xs font-medium text-gray-700"
                                    >
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        id="LastName"
                                        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="Email" className="block text-xs font-medium text-gray-700">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        id="Email"
                                        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="Phone" className="block text-xs font-medium text-gray-700">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        id="Phone"
                                        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                    />
                                </div>

                                <fieldset className="col-span-6">
                                    <legend className="block text-sm font-medium text-gray-700">
                                        Card Details
                                    </legend>

                                    <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                                        <div>
                                            <label htmlFor="CardNumber" className="sr-only"> Card Number </label>

                                            <input
                                                type="text"
                                                id="CardNumber"
                                                placeholder="Card Number"
                                                className="relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                                            />
                                        </div>

                                        <div className="flex">
                                            <div className="flex-1">
                                                <label htmlFor="CardExpiry" className="sr-only"> Card Expiry </label>

                                                <input
                                                    type="text"
                                                    id="CardExpiry"
                                                    placeholder="Expiry Date"
                                                    className="relative w-full rounded-es-md border-gray-200 focus:z-10 sm:text-sm"
                                                />
                                            </div>

                                            <div className="-ms-px flex-1">
                                                <label htmlFor="CardCVC" className="sr-only"> Card CVC </label>

                                                <input
                                                    type="text"
                                                    id="CardCVC"
                                                    placeholder="CVC"
                                                    className="relative w-full rounded-ee-md border-gray-200 focus:z-10 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className="col-span-6">
                                    <legend className="block text-sm font-medium text-gray-700">
                                        Billing Address
                                    </legend>

                                    <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                                        <div>
                                            <label htmlFor="Country" className="sr-only">Country</label>

                                            <select
                                                id="Country"
                                                className="relative w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                                            >
                                                <option>England</option>
                                                <option>Wales</option>
                                                <option>Scotland</option>
                                                <option>France</option>
                                                <option>Belgium</option>
                                                <option>Japan</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="sr-only" htmlFor="PostalCode"> ZIP/Post Code </label>

                                            <input
                                                type="text"
                                                id="PostalCode"
                                                placeholder="ZIP/Post Code"
                                                className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="col-span-6">
                                    <button
                                        className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
                                    >
                                        Pay Now
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Checkout