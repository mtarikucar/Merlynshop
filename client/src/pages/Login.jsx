import React from 'react'

function Login() {
    return (

        <div className="flex h-screen w-screen items-center z-40  px-2">
            <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
                <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-green-600 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
                <div className="mx-auto mb-2 space-y-3">
                    <h1 className="text-center text-3xl font-bold text-gray-700">Sign in</h1>
                    <p className="text-gray-500">Sign in to access your account</p>
                </div>
                <div>
                    <div className="relative mt-2 w-full">
                        <input type="text" id="email" value="email@gmail.com" className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0" placeholder=" " />
                        <label for="email" className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"> Enter Your Email </label>
                    </div>
                </div>
                <div>
                    <div className="relative mt-2 w-full">
                        <input type="text" id="password" className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0" placeholder=" " />
                        <label for="password" className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"> Enter Your Password</label>
                    </div>
                </div>
                <div className="flex w-full items-center">
                    <button className="shrink-0 inline-block w-36 rounded-lg bg-green-600 py-3 font-bold text-white">Login</button>
                    <a className="w-full text-center text-sm font-medium text-gray-600 hover:underline" href="#">Forgot your password?</a>
                </div>
                <p className="text-center text-gray-600">
                    Don't have an account?
                    <a href="#" className="whitespace-nowrap font-semibold text-gray-900 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    )
}

export default Login