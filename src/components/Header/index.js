import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import "./index.css";
const Header = () => {
  const navigate = useNavigate();
  const logOutRef = useRef(null);
  const [isLogOut, setIsLogOut] = useState(false);
  const onClickLogout = () => {
    setIsLogOut(true);
  };
  const onclickYes = () => {
    Cookies.remove("jwtToken");
    navigate("/login", { replace: true });
  };
  useEffect(() => {
    const body = document.querySelector("body");
    if (isLogOut) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "initial";
    }
  }, [isLogOut]);
  useEffect(() => {
    const handler = (event) => {
      if (logOutRef.current && !logOutRef.current.contains(event.target)) {
        setIsLogOut(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <div className="header-background-container">
      <div className="header-logo-and-heading-container">
        <img
          src="https://res.cloudinary.com/dndtkpqk5/image/upload/v1664029743/Group_7420_r0ezka.svg"
          alt="img"
        />
        <p className="header-heading-text">Tasty Kitchen</p>
      </div>
      <div className="header-buttons-container">
        <div>
          <NavLink to="/" className="home-navlink">
            Home
          </NavLink>
        </div>
        <div className="cart-navlink-container">
          <NavLink to="/cart" className="home-navlink">
            Cart
          </NavLink>
        </div>
        <div className="logout-button-container">
          <button className="logout-button" onClick={onClickLogout}>
            logout
          </button>
        </div>
        {isLogOut && (
          <div className="logout-popup-container">
            <div className="logout-popup-container-two" ref={logOutRef}>
              <p>Are you sure to want to exit</p>
              <div>
                <button onClick={onclickYes} autoFocus className="yes-button">
                  Yes
                </button>
                <button
                  onClick={() => {
                    setIsLogOut(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
