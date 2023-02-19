import "./App.css";
import FoodItemDetails from "./components/FoodItemDetails";
import LoginForm from "./components/LoginForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState, useEffect } from "react";
import CartContext from "./context/CartContext";
import NotFound from "./components/NotFound";
const App = () => {
  const parsedArray = JSON.parse(sessionStorage.getItem("cartList"));

  const [cartList, setCartList] = useState(
    parsedArray === null ? [] : parsedArray
  );
  // const addTocart = (foodItem) => {
  //   setCartList((prevState) => {
  //     const x = prevState.findIndex((eachItem) => {
  //       if (eachItem.id === foodItem.id) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //     if (x !== -1) {
  //       const y = prevState.splice(x, 1);
  //       console.log(y);
  //       return [
  //         ...prevState,
  //         { ...y[0], quantity: foodItem.quantity + y[0].quantity },
  //       ];
  //     } else {
  //       return [...prevState, foodItem];
  //     }
  //   });
  // };
  const addTocart = (foodItem) => {
    setCartList((prevState) => {
      const x = prevState.findIndex((eachItem) => {
        if (eachItem.id === foodItem.id) {
          return true;
        } else {
          return false;
        }
      });
      if (x !== -1) {
        const y = prevState.slice(x, x + 1);
        console.log(y);
        prevState.splice(x, 1, {
          ...y[0],
          quantity: foodItem.quantity + y[0].quantity,
        });
        return [...prevState];
      } else {
        return [...prevState, foodItem];
      }
    });
  };
  const deletecartList = () => {
    setCartList([]);
  };
  const onClickDelete = (id) => {
    const deletedcartList = cartList.filter((eachItem) => eachItem.id !== id);
    setCartList(deletedcartList);
  };
  useEffect(() => {
    sessionStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);
  const onClickDecrease = (id) => {
    const decreasedResult = cartList.map((eachItem) => {
      if (eachItem.id === id) {
        if (eachItem.quantity > 1) {
          return { ...eachItem, quantity: eachItem.quantity - 1 };
        }
      }
      return eachItem;
    });
    setCartList(decreasedResult);
  };
  const onClickIncrease = (id) => {
    const decreasedResult = cartList.map((eachItem) => {
      if (eachItem.id === id) {
        return { ...eachItem, quantity: eachItem.quantity + 1 };
      }
      return eachItem;
    });
    setCartList(decreasedResult);
  };
  return (
    <BrowserRouter>
      <CartContext.Provider
        value={{
          cartList,
          addTocart,
          onClickDelete,
          deletecartList,
          onClickIncrease,
          onClickDecrease,
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/food-item/:id" element={<FoodItemDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
};

export default App;
