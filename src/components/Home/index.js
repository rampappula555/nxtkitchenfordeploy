import Header from "../Header";
import "./index.css";
import Cookies from "js-cookie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { MdSort } from "react-icons/md";
import {
  AiOutlineStar,
  AiFillBackward,
  AiOutlineForward,
} from "react-icons/ai";
import Footer from "../Footer";
const apiStatusConstants = {
  initial: "INITIAL",
  progress: "PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};
const sortByOptions = [
  {
    id: "HIGHEST",
    displayText: "Highest",
  },
  {
    id: "LOWEST",
    displayText: "Lowest",
  },
];
const Home = () => {
  const [offersApiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [restaurantApiStatus, setRestaurantApiStatus] = useState(
    apiStatusConstants.initial
  );
  const [offers, setOffers] = useState([]);
  const [sortBy, setSortBy] = useState(sortByOptions[0].id);
  const [offSet, setOffSet] = useState(0);
  const [activePageCount, setActivePageCount] = useState(1);
  const [restaurantList, setRestaurantsList] = useState([]);
  const [usersSearch, setUsersSearch] = useState("");
  const [hotelSearch, setHotelSearch] = useState("");
  const getHomeSectionOffers = useCallback(async () => {
    setApiStatus(apiStatusConstants.progress);
    const jwtToken = Cookies.get("jwtToken");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(
      "https://apis.ccbp.in/restaurants-list/offers",
      options
    );
    const fetchedData = await response.json();
    if (response.ok) {
      const updatedData = fetchedData.offers.map((eachOffer) => ({
        id: eachOffer.id,
        imageUrl: eachOffer.image_url,
      }));
      setOffers(updatedData);
      setApiStatus(apiStatusConstants.success);
    } else if (response.ok === false) {
      setApiStatus(apiStatusConstants.failure);
    }
  }, []);
  const getRestaurants = useCallback(async () => {
    setRestaurantApiStatus(apiStatusConstants.progress);
    const jwtToken = Cookies.get("jwtToken");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list?search=${hotelSearch}&offset=${offSet}&limit=9&sort_by_rating=${sortBy}
`,
      options
    );
    const fetchedData = await response.json();

    if (response.ok) {
      const updatedData = fetchedData.restaurants.map((eachRestaurant) => ({
        id: eachRestaurant.id,
        name: eachRestaurant.name,
        imageUrl: eachRestaurant.image_url,
        costForTwo: eachRestaurant.cost_for_two,
        cuisine: eachRestaurant.cuisine,
        groupByTime: eachRestaurant.group_by_time,
        hasOnlineDelivery: eachRestaurant.has_online_delivery,
        hasTableBooking: eachRestaurant.has_table_booking,
        isDeliveringNow: eachRestaurant.is_delivering_now,
        location: eachRestaurant.location,
        menuType: eachRestaurant.menu_type,
        opensAt: eachRestaurant.opens_at,
        rating: eachRestaurant.user_rating.rating,
        ratingColor: eachRestaurant.user_rating.rating_color,
        ratingText: eachRestaurant.user_rating.rating_text,
        totalReviews: eachRestaurant.user_rating.total_reviews,
      }));
      setRestaurantsList(updatedData);
      setRestaurantApiStatus(apiStatusConstants.success);
    }
    if (response.ok === false) {
      setRestaurantApiStatus(apiStatusConstants.failure);
    }
  }, [sortBy, offSet, hotelSearch]);
  useEffect(() => {
    getHomeSectionOffers();
  }, [getHomeSectionOffers]);
  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };
  const onChangeSortbyOptions = (event) => {
    setSortBy(event.target.value);
  };

  const getSuccessView = () => {
    return (
      <div>
        <Slider {...settings}>
          {offers.map((eachOffer) => {
            return (
              <div key={eachOffer.id} className="carousel-images-container">
                <img
                  src={eachOffer.imageUrl}
                  alt="img"
                  className="carousel-images"
                />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  };
  const getOffersView = () => {
    switch (offersApiStatus) {
      case apiStatusConstants.progress:
        return <h1>LOADING</h1>;
      case apiStatusConstants.success:
        return getSuccessView();
      case apiStatusConstants.failure:
        return <h1>FAILED</h1>;
      default:
        return null;
    }
  };
  const onClickDecrement = () => {
    if (activePageCount >= 2) {
      setActivePageCount((prevState) => prevState - 1);
      setOffSet((prevState) => prevState - 9);
    }
  };
  const onClickIncrement = () => {
    if (activePageCount < 4) {
      setActivePageCount((prevState) => prevState + 1);
      setOffSet((prevState) => prevState + 9);
    }
  };

  const getRestaurantSuccessview = () => {
    return (
      <div className="restaurant-details-container">
        {restaurantList.length === 0 ? (
          <div className="no-restaurants-found-text-container">
            <h1 className="failed-view-text">No Restaurants found</h1>
          </div>
        ) : (
          restaurantList.map((eachRestaurant) => {
            const {
              name,
              id,
              imageUrl,
              costForTwo,
              cuisine,
              groupByTime,
              hasOnlineDelivery,
              hasTableBooking,
              isDeliveringNow,
              location,
              menuType,
              opensAt,
              rating,
              ratingColor,
              ratingText,
              totalReviews,
            } = eachRestaurant;
            return (
              <div key={id} className="home-page-restaurant-details-container">
                <div className="home-page-restaurant-images-container">
                  <Link to={`/food-item/${id}`}>
                    <img
                      src={imageUrl}
                      alt="img"
                      className="home-page-restaurant-images"
                    />
                  </Link>
                </div>
                <div>
                  <p className="homepage-restaurant-heading-text">{name}</p>
                  <p className="homepage-cuisine-text">{cuisine}</p>
                  <p className="homepage-rating-and-reviews-text">
                    <span className="homepage-rating-text">
                      <span className="rating-icon-container">
                        <AiOutlineStar />
                      </span>

                      {rating}
                    </span>
                    <span className="homepage-reviews-text">
                      ({totalReviews} reviews)
                    </span>
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };
  const getRestaurantsView = () => {
    switch (restaurantApiStatus) {
      case apiStatusConstants.progress:
        return <h1>LOADING</h1>;
      case apiStatusConstants.success:
        return getRestaurantSuccessview();
      case apiStatusConstants.failure:
        return <h1 className="failed-view-text">NO RESTAURANTS FOUND</h1>;
      default:
        return null;
    }
  };
  const isLoading =
    offersApiStatus !== apiStatusConstants.progress &&
    restaurantApiStatus !== apiStatusConstants.progress;

  const onChangeUsersSearch = (event) => {
    setUsersSearch(event.target.value);
  };
  const onClickSearchButton = () => {
    setHotelSearch(usersSearch);
  };
  return (
    <div className="home-main-container">
      <Header />
      {!isLoading ? (
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
      ) : (
        <div>
          {getOffersView()}
          <div className="home-page-heading-and-sortby-options-container">
            <div className="a">
              <div>
                <p className="home-page-heading">Popular Restaurants</p>
                <p className="home-page-text">
                  Select Your favourite restaurant special dish and make your
                  day happy...
                </p>
              </div>
              <div className="sortby-options-container">
                <div className="sortby-option-icon-container">
                  <MdSort />
                </div>
                <select onChange={onChangeSortbyOptions} value={sortBy}>
                  {sortByOptions.map((eachOption) => (
                    <option key={eachOption.id} value={eachOption.id}>
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="horizontal-line-container">
            <hr />
          </div>
          <div className="home-page-search-container">
            <input
              type="search"
              value={usersSearch}
              onChange={onChangeUsersSearch}
            />
            <button onClick={onClickSearchButton}>search</button>
          </div>
          <div>{getRestaurantsView()}</div>
          <div className="homepage-button-container">
            {activePageCount > 1 && (
              <button
                className="active-page-count-button"
                onClick={onClickDecrement}
              >
                <AiFillBackward />
              </button>
            )}
            <p className="active-page-count-text">{activePageCount}</p>
            {activePageCount !== 4 && (
              <button
                className="active-page-count-button"
                onClick={onClickIncrement}
              >
                <AiOutlineForward />
              </button>
            )}
          </div>
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default Home;
