
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

function AdminCategoryForm({ openCategory, setOpenCategory }) {


    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={openCategory} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenCategory}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 text-center sm:pb-4">
                                    <h1 className='text-xl'>Add Category</h1>
                                    <div className=" w-full">
                                        <form action="">
                                            <div class="mb-6 w-full">
                                                <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 text-start ">Default input</label>
                                                <input type="text" id="default-input" class="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="px-4 py-3 flex gap-3 sm:flex-row-col w-full justify-between ">
                                        <button
                                            type="button"
                                            className="flex mt-3 w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 "
                                            onClick={() => setOpenCategory(false)}
                                        >
                                            save
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 "
                                            onClick={() => setOpenCategory(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
export default AdminCategoryForm