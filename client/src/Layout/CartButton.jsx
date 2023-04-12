import React from 'react'
import { HiOutlineShoppingCart } from 'react-icons/Hi';

function CartButton({setOpen, open}) {
    return (
        <div data-dial-init className="fixed right-2 md:right-12 lg:right-16  z-50 bottom-16 group">
            <div id="speed-dial-menu-default" className=" flex-col items-center hidden mb-4 space-y-2">
            </div>
            <button type="button" data-dial-toggle="speed-dial-menu-default" aria-controls="speed-dial-menu-default" aria-expanded="false" className="flex items-center justify-center text-white bg-green-600 rounded-full w-14 h-14">
                <HiOutlineShoppingCart onClick={() => setOpen(!open)} className="w-8 h-8 transition-transform group-hover:rotate-45" />
            </button>
        </div>
    )
}

export default CartButton
