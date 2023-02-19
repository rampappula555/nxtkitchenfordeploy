import React from "react";
const CartContext = React.createContext({
  cartList: [],
  updatedArray: [],
  addTocart: () => {},
  onClickDelete: () => {},
  deletecartList: () => {},
  onClickDecrease: () => {},
  onClickIncrease: () => {},
});
export default CartContext;
