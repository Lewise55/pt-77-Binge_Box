import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const ShowCard = (props) => {
  const { store, dispatch } = useGlobalReducer();
  const [liked, setLiked] = useState(false);

  const toggleLiked = (name) => {
    setLiked(!liked);
    // if(liked){
    dispatch({ type: "toggle_favorites", payload: name });
    // }
  };

  return (
    <div className="text-center mt-5">
      <div className="card bg-dark mx-2" style={{ minWidth: "18rem" }}>
        <img
          src={"https://image.tmdb.org/t/p/w500/" + props.poster_path}
          className="card-img-top"
          alt={props.first_air_date}
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.overview}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
        </ul>
        <div className="card-body">
          {/* <a href="#" className="card-link">Card link/>
                    <a href="#" className="card-link">Another link/> */}
        </div>
      </div>
    </div>
  );
};
