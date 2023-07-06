import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const PayButton = ({ cartItems }) => {
  const {user} = useSelector((state) => state.auth);

  const [url, setUrl] = useState(null);
  const handleCheckout = () => {
    axios
      .post(`http://localhost:3000/api/paytr/create-payment`, {
        cartItems,
        userId: user.id,
      })
      .then((response) => {
        console.log(response);
        if (response.data.url) {
          setUrl(
            "https://www.paytr.com/odeme/guvenli/" + response.data.url
          );
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      {url ? (
        <iframe
          src={url}
          width="600"
          height="800"
          frameborder="0"
          allowtransparency="true"
        ></iframe>
      ) : (
        <button
          className="block w-full rounded-md bg-green-500 p-2.5 text-sm text-white transition hover:shadow-lg"
          onClick={() => handleCheckout()}
        >
          ödeme bilgileri
        </button>
      )}
    </>
  );
};

export default PayButton;
