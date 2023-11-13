import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import verified from "../../Assets/Images/verified.jpg";
import StarRatings from 'react-star-ratings';

const Garage = ({garage}) => {

//   const isVerified = false; 
    const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  const requestService = () => {
    navigate("/request-service", { state: garage})
  }

  const handleReview = () => {
    navigate("/review", {state: garage})
  }

    return (
      <div className="card mt-2 mb-2">
        <img className="w-full h-60 object-cover" src={garage.logo} />

        <div className="p-5 flex flex-col gap-3 ">
          <div className="flex items-center gap-2">
            <span className="badge">
              {garage.is_verified ? "Verified" : "Not verified"}
            </span>
            {garage.is_verified && <img className="h-9 w-9" src={verified} />}
          </div>
          <h2 className="product-title" title="best garage ever">
            {garage.name}
          </h2>

          <div>
            <span className="text-xl font-semi-bold">{garage.town}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm line-through opacity-50">
                {garage.price}
              </span>
              <button
                onClick={() => requestService()}
                className="bg-yellow-200 text-black font-[poppins] duration-500 px-6 py-2 mx-1 rounded hover:bg-cyan-600 hover:text-white"
              >
                Call
              </button>
              <button
                id={garage.id}
                // onClick={()=>reviewForm()}
                onClick={(e) => handleReview(e.target.id)}
                className="bg-yellow-200 text-black font-[poppins] duration-500 px-6 py-2 mx-1 rounded hover:bg-cyan-600 hover:text-white"
              >
                Review
              </button>
            </div>
          </div>
          {/* garage ratings */}
          {/* <span className="flex items-centre mt-1 gap-2" >
                    <img className="h-9 w-9" src="https://iconsplace.com/wp-content/uploads/_icons/ffe500/256/png/rating-star-icon-19-256.png" />
                    <img className="h-9 w-9" src="https://iconsplace.com/wp-content/uploads/_icons/ffe500/256/png/rating-star-icon-19-256.png" />
                    <img className="h-9 w-9" src="https://iconsplace.com/wp-content/uploads/_icons/ffe500/256/png/rating-star-icon-19-256.png" />
                    <img className="h-9 w-9" src="https://iconsplace.com/wp-content/uploads/_icons/ffe500/256/png/rating-star-icon-19-256.png" />
                    <img className="h-9 w-9" src="https://iconsplace.com/wp-content/uploads/_icons/ffe500/256/png/rating-star-icon-19-256.png" />
                </span> */}
          <StarRatings
            // rating={this.state.rating}
            rating={4}
            starRatedColor="bg-cyan-600"
            // changeRating={this.changeRating}
            numberOfStars={5}
            name="rating"
            starDimension="25px"
            starSpacing="8px"
          />
        </div>
        <br />
      </div>
    );
}

export default Garage;