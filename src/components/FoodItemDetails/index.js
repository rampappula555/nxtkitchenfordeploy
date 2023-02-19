import "./index.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../Header";
import FoodItem from "../FoodItem";
import { AiOutlineStar } from "react-icons/ai";
import { ThreeDots } from "react-loader-spinner";
import Footer from "../Footer";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const apiStatusConstants = {
  initial: "INITIAL",
  progress: "PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};
const FoodItemDetails = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [foodMenu, setFoodMenu] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const getFoodItemsDetailView = async () => {
      setApiStatus(apiStatusConstants.progress);
      const jwtToken = Cookies.get("jwtToken");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(
        `https://apis.ccbp.in/restaurants-list/${id}`,
        options
      );
      const fetchedData = await response.json();
      if (response.ok) {
        const updatedRestaurantDetails = {
          costForTwo: fetchedData.cost_for_two,
          cuisine: fetchedData.cuisine,
          itemsCount: fetchedData.items_count,
          location: fetchedData.location,
          opensAt: fetchedData.opens_at,
          reviewsCount: fetchedData.reviews_count,
          rating: fetchedData.rating,
          id: fetchedData.id,
          imageUrl: fetchedData.image_url,
          name: fetchedData.name,
        };
        const updatedFoodMenu = fetchedData.food_items.map((eachFoodItem) => ({
          id: eachFoodItem.id,
          imageUrl: eachFoodItem.image_url,
          cost: eachFoodItem.cost,
          name: eachFoodItem.name,
          rating: eachFoodItem.rating,
          foodType: eachFoodItem.food_type,
        }));
        setRestaurantDetails(updatedRestaurantDetails);
        setFoodMenu(updatedFoodMenu);
        setApiStatus(apiStatusConstants.success);
      }
    };
    getFoodItemsDetailView();
  }, [id]);

  const getSuccessView = () => {
    const {
      name,
      imageUrl,
      rating,
      cuisine,
      location,
      reviewsCount,
      costForTwo,
    } = restaurantDetails;
    return (
      <div>
        <div className="food-item-details-background-container">
          <div className="restaurant-details-image-container">
            <img src={imageUrl} alt="img" className="restaurant-image" />
          </div>

          <div className="restaurant-details-details-text-container">
            <p className="restaurant-details-heading-text">{name}</p>
            <p className="restaurant-details-cuisine-text">{cuisine}</p>
            <p className="restaurant-details-location-text">{location}</p>
            <div className="restaurant-details-price-and-rating-container">
              <div>
                <div className="restaurant-details-rating-container">
                  <div className="restaurant-details-rating-icon-container">
                    <AiOutlineStar />
                  </div>
                  <p className="restaurant-details-rating-text">{rating}</p>
                </div>
                <p className="restaurant-details-reviews-text">
                  {reviewsCount} Reviews
                </p>
              </div>
              <div className="restaurant-details-price-text-container">
                <p className="restaurant-details-price-text">
                  price:{costForTwo}
                </p>
                <p className="restaurant-details-costfortwo-text">
                  Cost for two
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="each-food-item-bg-container">
          {foodMenu.map((eachFoodItem) => (
            <FoodItem key={eachFoodItem.id} eachFoodItem={eachFoodItem} />
          ))}
        </div>
      </div>
    );
  };
  const getLoadingView = () => (
    <div className="loading-spinner-container">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#F7931E"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
  const getMenu = () => {
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return getLoadingView();
      case apiStatusConstants.success:
        return getSuccessView();
      case apiStatusConstants.failure:
        return <h1>FAILED</h1>;
      default:
        return null;
    }
  };
  const onClickScrollButton = () => {
    if (window.scrollY > 400) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, document.body.scrollHeight);
    }
  };
  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 400) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);
  return (
    <div>
      <Header />
      <div>{getMenu()}</div>
      <div>
        <Footer />
      </div>
      <div className="up-and-down-button-container">
        {isScrolled ? (
          <button onClick={onClickScrollButton} className="scroll-button">
            <AiOutlineArrowUp />
          </button>
        ) : (
          <button onClick={onClickScrollButton} className="scroll-button">
            <AiOutlineArrowDown />
          </button>
        )}
      </div>
    </div>
  );
};
export default FoodItemDetails;
