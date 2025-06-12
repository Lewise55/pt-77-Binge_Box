import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

export const StarRating = ({vote_average}) => {


    const fullStars = Math.floor(vote_average);
    const hasHalfStar = vote_average % 1 >= 0.5;
const emptyStars = 10 - fullStars - (hasHalfStar ? 1 : 0)
            

    return (
        <div className="text-center ">
            {[...Array(fullStars)].map((_, i) => (
                <FontAwesomeIcon key={`full-${i}`} icon={solidStar} style={{color: "gold"}}/>
            ))}
            {hasHalfStar && <FontAwesomeIcon icon={faStarHalfStroke} style={{color: "gold"}}/>}
            {[...Array(emptyStars)].map((_, i) => (
                <FontAwesomeIcon key={`empty-${i}`} icon={emptyStar} style={{color: "gold"}}/>
            ))}            
        </div>        
    );
};