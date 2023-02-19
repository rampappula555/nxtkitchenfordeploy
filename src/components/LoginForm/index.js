import "./index.css";
import { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router";

const LoginForm = () => {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const [username, setUsername] = useState("rahul");
  const [password, setPassword] = useState("rahul@2021");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const onChangeUsername = (event) => setUsername(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);
  const onChangeShowPassword = (event) => setShowPassword(event.target.checked);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch("https://apis.ccbp.in/login", options);
    const data = await response.json();
    if (response.ok) {
      //go to home page
      Cookies.set("jwtToken", data.jwt_token, { expires: 30 });
      navigate("/", { replace: true });
    } else if (response.ok === false) {
      setErrorMessage(data.error_msg);
      setShowErrorMessage(true);
    }
  };
  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);
  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className="login-form-background-container">
      <div className="form-container">
        <form className="form" onSubmit={onSubmitForm}>
          <img
            src="https://res.cloudinary.com/dndtkpqk5/image/upload/v1664029743/Group_7420_r0ezka.svg"
            alt="img"
            className="login-form-logo"
          />
          <p className="tasty-kitchen-heading">Tasty Kitchen</p>
          <p className="login-text">Login</p>
          <label className="username-label" htmlFor="username">
            USERNAME
          </label>
          <br />
          <input
            type="text"
            id="username"
            className="username-input"
            onChange={onChangeUsername}
            value={username}
            ref={usernameRef}
          />
          <br />
          <label className="password-label" htmlFor="password">
            PASSWORD
          </label>

          <br />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="password-input"
            onChange={onChangePassword}
            value={password}
          />
          <div>
            <input
              type="checkbox"
              id="showpasswordCheckbox"
              onChange={onChangeShowPassword}
              value={showPassword}
            />
            <label htmlFor="showpasswordCheckbox">Show Password</label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMessage && (
            <p className="error-message-text">{errorMessage}</p>
          )}
        </form>
      </div>
      <div className="login-page-image-container">
        <img
          src="https://res.cloudinary.com/dndtkpqk5/image/upload/v1664029007/Rectangle_1456_2_dmsuna.jpg"
          alt="img"
          className="login-page-image"
        />
      </div>
    </div>
  );
};
export default LoginForm;
