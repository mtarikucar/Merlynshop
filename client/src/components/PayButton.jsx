import axios from "axios";
import { useSelector } from "react-redux";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios
      .post(`http://localhost:3000/api/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button
        className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
        onClick={() => handleCheckout()}
      >
        pay now
      </button>
    </>
  );
};

export default PayButton;
