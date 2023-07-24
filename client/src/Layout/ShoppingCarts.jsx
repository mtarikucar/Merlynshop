import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, decreaseCart, addToCart, getTotals, increaseCart } from '../store/cartSlice'
import store from '../store'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'



function ShoppingCarts({ open, setOpen }) {


    store.dispatch(getTotals())

    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    useEffect(() => {
        dispatch(getTotals())
    }, [cart])


    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product))
    }

    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product))
    }


    const handleIncreaseCart = (product) => {
        dispatch(increaseCart(product))
    }



    function findFeatureValue(data) {
        console.log(data);
        const targetFeatureId = data.product_feature;

        const targetFeature = data.product_features.find(
            (feature) => feature.id === targetFeatureId
        );

        if (targetFeature) {
            return targetFeature;
        } else {
            return null;
        }
    }


    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex items-center p-5  justify-between">
                                            <Dialog.Title className="text-lg font-medium text-gray-900">Sepet</Dialog.Title>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="sr-only">Paneli kapat</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {cart?.cartItems.map((product, key) => (
                                                            <li key={key} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img

                                                                        src={product.thumbnail}

                                                                        className="h-full w-full p-1 object-cover object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <p className='text-md'>
                                                                                <a href={`/products/${product.id}`}>{product.name}</a>
                                                                            </p>
                                                                            <div className='flex flex-col justify-center items-center'>

                                                                                <p className="ml-4">₺{product.price}</p>

                                                                            </div>
                                                                        </div>
                                                                        {/*  <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                                                    </div>
                                                                    <div className='flex justify-between'>
                                                                        {<p className="font-mono ">{findFeatureValue(product)?.feature?.name}:{findFeatureValue(product)?.value}</p>}
                                                                        <p className="font-mono  ml-4">{product.cartQuantity} x  {product.price * product.cartQuantity}₺</p>
                                                                    </div>
                                                                    <div className="flex flex-1 items-center justify-between text-sm">
                                                                        <div className="flex">
                                                                            <button
                                                                                onClick={() => handleRemoveFromCart(product)}
                                                                                type="button"
                                                                                className="font-medium text-green-600 hover:text-green-500"
                                                                            >
                                                                                Sil
                                                                            </button>
                                                                        </div>
                                                                        <div className="sm:order-1 ">
                                                                            <div className="flex h-8  text-gray-600">
                                                                                <button
                                                                                    onClick={() => handleDecreaseCart(product)}
                                                                                    className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-green-500 hover:text-white">-</button>
                                                                                <div className="flex  items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{product.cartQuantity}</div>
                                                                                <button
                                                                                    onClick={() => handleIncreaseCart(product)}
                                                                                    className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-green-500 hover:text-white">+</button>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Toplam</p>
                                                <p>₺{cart?.cartTotalAmount}</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">kargo ve taksitlendirme ödeme sayfasında hesaplanacaktır.</p>
                                            
                                                
                                                    <div className={`${ !cart && "curs" }   mt-6 `}>
                                                        <Link
                                                            to='checkout'
                                                            
                                                            onClick={ cart ?  () => setOpen(!open) : () => toast.info("Carta ürün ekleyin !") }
                                                            className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                                                        >
                                                            Ödeme
                                                        </Link>
                                                    </div>
                                                 
                                            
                                           
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    
                                                    <button
                                                        type="button"
                                                        className="font-medium text-green-600 hover:text-green-500"
                                                        onClick={() => setOpen(!open)}
                                                    >
                                                        Alışverişe devam et
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ShoppingCarts