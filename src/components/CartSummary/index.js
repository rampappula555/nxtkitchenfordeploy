import "./index.css";
import { useState } from "react";
import CartContext from "../../context/CartContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
  const navigate = useNavigate();
  const value = useContext(CartContext);
  const { deletecartList, cartList } = value;

  const [isCheckedOut, setIscheckedOut] = useState(false);

  const onClickCheckOut = () => setIscheckedOut(true);
  const onClickGoHome = () => {
    deletecartList();
    navigate("/");
  };
  const flag = cartList.map((eachItem) => eachItem.quantity * eachItem.cost);
  const price = flag.reduce((acc, prsnt) => acc + prsnt, 0);
  return (
    <div className="cart-summary-main-container">
      <div>
        <h1 className="totalprice-heading">Order Total: Rs {price}/-</h1>
        <p>{cartList.length} items in cart</p>
        <button className="checkout-button" onClick={onClickCheckOut}>
          Checkout
        </button>
        {isCheckedOut && (
          <div className="checkout-greetings-container">
            <div>
              <img
                src="https://res.cloudinary.com/dndtkpqk5/image/upload/v1664607537/Vector_3_uvgo7n.png"
                alt="img"
                className="checkout-greetings-image"
              />
            </div>
            <p className="payment-successfull-text">Payment Successful</p>
            <p className="payment-successful-details-text">
              Thank you for ordering <br /> Your payment is successfully
              completed.
            </p>
            <button onClick={onClickGoHome} className="home-button">
              Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartSummary;
