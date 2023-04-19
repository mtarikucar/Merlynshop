import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function Dropdown() {

    const { user } = useSelector((state) => state.auth)
    console.log(user);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {user.user?.name}
                    <ExpandMoreIcon className="-mr-1 h-5 w-5 text-gray-400" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">

                        {

                            user.user?.role == 'admin ' ? (
                                <Menu.Item>
                                    {({ active }) => (
                                        <NavLink
                                            to='/admin/dashboard'
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Admin
                                        </NavLink>
                                    )}
                                </Menu.Item>
                            ):(
                                <Menu.Item>
                                    {({ active }) => (
                                        <NavLink
                                            to='/profile'
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Profile
                                        </NavLink>
                                    )}
                                </Menu.Item>
                            )
                            
                        }


                        <form method="POST" action="#">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        type="submit"
                                        onClick={onLogout}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-2 text-left text-sm'
                                        )}
                                    >
                                        Sign out
                                    </button>
                                )}
                            </Menu.Item>
                        </form>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
export default Dropdown