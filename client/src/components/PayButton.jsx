import axios from "axios";
import { useSelector } from "react-redux";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth.user.user);
console.log(user);
  const handleCheckout = () => {
    axios
      .post(`https://whale-app-952oz.ondigitalocean.app/api/stripe/create-checkout-session`, {
        cartItems:cartItems,
        userId: user.id,
      })
      .then((response) => {
        console.log(response);
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
