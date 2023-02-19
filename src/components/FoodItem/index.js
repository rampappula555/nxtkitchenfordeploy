import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import CartContext from "../../context/CartContext";
import { AiOutlineStar } from "react-icons/ai";
import "./index.css";
const FoodItem = (props) => {
  const navigate = useNavigate();
  const value = useContext(CartContext);
  const { addTocart, cartList } = value;
  const [quantity, setQuantity] = useState(1);
  const [clickAddTocart, setClickAddToCart] = useState(false);
  const { eachFoodItem } = props;
  const { name, imageUrl, cost, id, rating } = eachFoodItem;
  const onClickIncrease = () => {
    setQuantity((prevState) => prevState + 1);
  };
  const onClickDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevState) => prevState - 1);
    }
  };
  const onClickAddToCart = () => {
    if (clickAddTocart === false) {
      addTocart({ ...eachFoodItem, quantity });
    }
    setClickAddToCart(true);
  };
  let z = false;
  const x = cartList.filter((each) => each.id === id);
  if (x.length !== 0) {
    if (x[0].id === id) {
      z = true;
    }
  }
  const onClickGoToCart = () => {
    navigate("/cart");
  };

  return (
    <div key={id} className="each-food-details-container">
      <div className="each-food-details-image-container">
        <img src={imageUrl} alt="img" className="food-item-image" />
      </div>
      <div className="each-food-details-text-container">
        <p className="each-food-details-name-text">{name}</p>
        <p className="each-food-details-price-text">price:{cost}</p>
        <div className="each-food-details-rating-container">
          <div className="each-food-details-rating-icon-container">
            <AiOutlineStar />
          </div>
          <p className="each-food-details-rating-text">{rating}</p>
        </div>
        {clickAddTocart || z ? (
          <p className="added-to-cart-text">Added to cart</p>
        ) : (
          <div className="buttons-container">
            <button
              className="food-item-increase-button"
              onClick={onClickDecrease}
            >
              -
            </button>
            <p className="each-food-item-quantity">{quantity}</p>
            <button
              onClick={onClickIncrease}
              className="food-item-increase-button"
            >
              +
            </button>
          </div>
        )}
        {clickAddTocart || z ? (
          <button onClick={onClickGoToCart} className="btn">
            go to cart
          </button>
        ) : (
          <button onClick={onClickAddToCart} className="btn">
            {clickAddTocart || z ? "go to cart" : "add to cart"}
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
