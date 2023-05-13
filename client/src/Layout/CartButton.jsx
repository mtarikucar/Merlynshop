import {useEffect} from 'react'
import { HiOutlineShoppingCart } from 'react-icons/Hi';
import { useSelector,useDispatch } from 'react-redux';
import { getTotals } from '../features/cartSlice';
function CartButton({ setOpen, open }) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    useEffect(() => {
        dispatch(getTotals())
    }, [cart])
    return (
        <div onClick={() => setOpen(!open)} data-dial-init className="fixed right-2 md:right-12 lg:right-16  z-50 bottom-16 group">
            <button type="button" data-dial-toggle="speed-dial-menu-default" aria-controls="speed-dial-menu-default" aria-expanded="false" className="flex items-center justify-center relative text-white bg-green-600 rounded-full w-14 h-14">
                <div className=" top-0 absolute left-8  ">
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-white font-bold p-3 text-xs text-green-500">{cart.cartTotalQuantity}</p>
                </div>
                <HiOutlineShoppingCart  className="w-8 h-8" />
            </button>
        </div>
    )
}

export default CartButton
