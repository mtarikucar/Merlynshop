import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const PayButton = ({ cart }) => {
  const { user } = useSelector((state) => state.auth);

  const [url, setUrl] = useState(null);
  const handleCheckout = (values) => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/paytr/create-payment`, {
        cart: cart,
        user: user,
        values: values
      })
      .then((response) => {
        console.log(response);
        if (response.data.url) {
          setUrl("https://www.paytr.com/odeme/guvenli/" + response.data.url);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const initialValues = {
    name: "",

    address: "",
    phoneNumber: ""
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("İsim alanı zorunludur"),
    address: Yup.string().required("Adres alanı zorunludur"),
    phoneNumber: Yup.string().required("Telefon numarası zorunludur")
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleCheckout(values);
    }
  });

  console.log(user, cart);
  return (
    <>
      {url ? (
        <iframe
          src={url}    
          allowTransparency="true"
          className="
           w-full h-screen overflow-clip"
        ></iframe>
      ) : (
        <div className="mx-auto w-full max-w-lg">
          <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">Ödeme Bilgileri<span className="mt-2 block h-1 w-10 bg-green-600 sm:w-20"></span></h1>
          <form onSubmit={formik.handleSubmit} className="mt-10 flex flex-col space-y-4">

            <div >
              <label for="name" className="text-xs font-semibold text-gray-500">
                İsim
              </label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-green-500"
              />


              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500">{formik.errors.name}</div>
              )}
            </div>

            <div className="">
              <label htmlFor="address" className="text-xs font-semibold text-gray-500">
                Adres
              </label>
              <input
                id="address"
                name="address"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.address}
                className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-green-500"
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500">{formik.errors.address}</div>
              )}
            </div>
            <div className="">
              <label htmlFor="phoneNumber" className="text-xs font-semibold text-gray-500">
                Telefon Numarası
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-green-500"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="text-red-500">{formik.errors.phoneNumber}</div>
              )}
            </div>
            <p className="mt-10 text-center text-sm font-semibold text-gray-500">Bu siparişi vererek şunları kabul etmiş olursunuz:
              <a href="#" className="whitespace-nowrap text-green-400 underline hover:text-green-500">Mesafeli Satiş Sözleşmesi</a>
            </p>
            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center rounded bg-green-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-green-500 sm:text-lg"
              disabled={!formik.isValidating && Object.values(formik.values).some((value) => !value)}
            >
              Ödemeyi tamamla
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default PayButton;
