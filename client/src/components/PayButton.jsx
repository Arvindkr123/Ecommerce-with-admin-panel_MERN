import axios from "axios";
import { Payment_URL } from "../store/features/api";
import { useSelector } from "react-redux";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);
  // console.log(user)
  
  const handleCheckOut = () => {
    axios
      .post(Payment_URL, { cartItems, userId: user._id })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <button onClick={handleCheckOut}>Checkout</button>
    </>
  );
};
export default PayButton;
