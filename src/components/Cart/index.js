import "./index.css";
import CartContext from "../../context/CartContext";
import { useContext } from "react";
import Header from "../Header";
import { useNavigate } from "react-router";
import CartSummary from "../CartSummary";
const Cart = () => {
  const navigate = useNavigate();
  const value = useContext(CartContext);
  const { cartList, onClickDelete, onClickDecrease, onClickIncrease } = value;
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        {cartList.length > 0 ? (
          <div>
            {cartList.map((eachItem) => {
              const { imageUrl, name, quantity, cost, id } = eachItem;

              return (
                <div className="cartlist-item-main-container" key={id}>
                  <div className="cartlist-view-image-container">
                    <img
                      src={imageUrl}
                      alt="img"
                      className="cartlist-view-image"
                    />
                  </div>
                  <div className="title-and-brand-text-container">
                    <h3>{name}</h3>
                  </div>
                  <div className="cartlistitem-buttons-container">
                    <button
                      onClick={() => {
                        onClickDecrease(id);
                      }}
                      className="food-item-increase-button"
                    >
                      -
                    </button>
                    <p>{quantity}</p>
                    <button
                      onClick={() => {
                        onClickIncrease(id);
                      }}
                      className="food-item-increase-button"
                    >
                      +
                    </button>
                  </div>

                  <div className="cartlistitem-price-container">
                    <p>{cost}</p>
                  </div>
                  <div className="delete-item-button-container">
                    <button
                      onClick={() => {
                        onClickDelete(id);
                      }}
                      className="btn"
                    >
                      Delete Item
                    </button>
                  </div>
                  <p>Total {cost * quantity}</p>
                </div>
              );
            })}
            <div>
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="empty-cart-list-main-container">
            <div>
              <img
                src="https://res.cloudinary.com/dndtkpqk5/image/upload/v1664614760/OBJECTS_obsuby.png"
                alt="img"
              />
            </div>
            <p className="no-orders-yet-text">No Orders Yet!</p>
            <p className="no-order-text-details">
              Your cart is empty. Add something from the menu.
            </p>
            <button
              className="order-now-button"
              onClick={() => {
                navigate("/", { replace: true });
              }}
            >
              Order Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
