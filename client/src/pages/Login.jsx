import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchLogin } from '../api';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { reset, login } from '../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const notify = () => toast("giriş başarılı");
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
            console.log('success');
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values, bag) => {
            try {
                const registerResponse = dispatch(login(values))
                console.log(registerResponse);
            } catch (e) {

            }
        },
    });

    if (isLoading) {
        return notify;
    }
    /* 
     username: 'kminchelle',
        password: '0lelplR', */
    return (

        <div className="flex h-screen w-screen py-20 items-start z-40  px-2">
             
            <ToastContainer />
            <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
                <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-green-600 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
                <div className="mx-auto mb-2 space-y-3">
                    <h1 className="text-center text-3xl font-bold text-gray-700">Sign in</h1>
                    <p className="text-gray-500">Sign in to access your account</p>
                </div>
                <form  className=' space-y-5'  action="" onSubmit={formik.handleSubmit}>
                    <div>
                        <div className="relative mt-2 w-full">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}

                                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0" placeholder=" " />
                            <label htmlFor="username" className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"> Enter Your User Name </label>
                        </div>
                    </div>
                    <div>
                        <div className="relative mt-2 w-full">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0" placeholder=" " />
                            <label htmlFor="password" className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"> Enter Your Password</label>
                        </div>
                    </div>
                    <div className="flex w-full items-center">
                        <button type='submit' className="shrink-0 inline-block w-36 rounded-lg bg-green-600 py-3 font-bold text-white">Login</button>
                        <a className="w-full text-center text-sm font-medium text-gray-600 hover:underline" href="#">Forgot your password?</a>
                    </div>
                </form>
                <p className="text-center text-gray-600">
                    Don't have an account?
                    <Link to='/signup' className="whitespace-nowrap font-semibold text-gray-900 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login