import { useNavigate } from "react-router";
import "./index.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-main-container">
      <div>
        <img
          src="https://res.cloudinary.com/dndtkpqk5/image/upload/v1664625482/Group_vrknux.png"
          alt="img"
          className="not-found-image"
        />
      </div>

      <p className="page-not-found-text">Page Not Found</p>
      <p className="page-not-found-text-details">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <button
        onClick={() => {
          navigate("/", { replace: true });
        }}
        className="not-found-home-button"
      >
        Home
      </button>
    </div>
  );
};
export default NotFound;
