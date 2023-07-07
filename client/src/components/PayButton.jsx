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
        cart:cart,
        user: user,
        values:values
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
          width="600"
          height="1600"
          frameBorder="0"
          allowTransparency="true"
        ></iframe>
      ) : (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1">
              İsim
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}
          </div>
         
          <div className="flex flex-col">
            <label htmlFor="address" className="mb-1">
              Adres
            </label>
            <input
              id="address"
              name="address"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.address}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500">{formik.errors.address}</div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="mb-1">
              Telefon Numarası
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-red-500">{formik.errors.phoneNumber}</div>
            )}
          </div>
          <button
            type="submit"
            className="block w-full rounded-md bg-green-500 p-2.5 text-sm text-white transition hover:shadow-lg"
            disabled={!formik.isValidating && Object.values(formik.values).some((value) => !value)}
          >
            Ödemeyi tamamla
          </button>
        </form>
      )}
    </>
  );
};

export default PayButton;
