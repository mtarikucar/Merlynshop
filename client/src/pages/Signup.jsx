import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { useMutation } from "react-query";
import * as Yup from 'yup';
import axios from "axios"

import { GoogleOAuthProvider ,GoogleLogin} from '@react-oauth/google';


const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .test('password', 'Password must meet the specified criteria , Password must contain at least one uppercase letter, one number, and one special character', (password) => {
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumbers = /\d/.test(password);
            const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
            const isLongEnough = password.length >= 8;

            return hasUpperCase && hasLowerCase && hasNumbers && hasSymbols && isLongEnough;
        })
        .label('Password'),
});

function Signup() {

    const notify = () => toast("Wow so easy!");
    const navigate = useNavigate()

    const mutation = useMutation(
        (userData) =>
            axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, userData),
        {
            onSuccess: () => {
                toast.success("Hesap başarıyla oluşturuldu!");
                navigate('/login')
            },
            onError: () => {
                toast.error("Hesap oluşturulurken bir hata oluştu.");
            },
        }
    );
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            mutation.mutate(values);
            console.log(values);
        },
    });



    return (
        <div className="flex h-screen w-full py-20 items-start z-40  px-2">
            <ToastContainer />
            <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
                <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-green-600 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
                <div className="mx-auto mb-2 space-y-3">
                    <h1 className="text-center text-3xl font-bold text-gray-700">kayıt ol</h1>
                    <p className="text-gray-500">malini ve şifreni girerek kayıt ol</p>
                </div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div>
                        <div className="relative mt-2 w-full">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                className="border-1 peer block w-full appearance-none rounded-lg border  border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0" placeholder=" " />
                            <label htmlFor="name" className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300">
                                İsminizi giriniz
                            </label>
                        </div>
                        {formik.touched.name && formik.errors.name && (
                            <div className="text-red-500 text-sm">İsim Girilmesi zorunludur</div>
                        )}
                    </div>
                    <div>
                        <div className="relative mt-2 w-full">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className="border-1 peer block w-full appearance-none rounded-lg border  border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0" placeholder=" " />
                            <label htmlFor="email" className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"> Email adresinizi giriniz </label>
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 text-sm">Geçersiz mail adresi</div>
                        )}
                    </div>
                    <div>
                        <div className="relative mt-2 w-full">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0"
                                placeholder=" "
                            />
                            <label
                                htmlFor="password"
                                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
                            >
                                Şifrenizi gitiniz
                            </label>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 text-sm">Parola belirtilen ölçütleri karşılamalıdır , Parola en az bir büyük harf, bir sayı ve bir özel karakter içermelidir</div>
                        )}
                    </div>


                    <div className="flex mt-6 w-full items-center">
                        <button type='submit' className="shrink-0 w-full inline-block sortrounded-lg bg-green-600 py-3 font-bold text-white">Kayıt Ol</button>

                    </div>
                </form>
                <p className="text-center text-gray-600">
                    zaten bir hesbaın var mı?
                    <Link to={'/login'} className="whitespace-nowrap font-semibold text-gray-900 hover:underline">Giriş yap</Link>
                </p>
                {/*   <GoogleLoginButton/> */}

                <GoogleOAuthProvider clientId='485554478880-971ivflhgbuth2r0rpkjqkam066vhs5t.apps.googleusercontent.com'>

                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}

                    />
                    
                    </GoogleOAuthProvider>

            </div>
        </div>
    )
}

export default Signup