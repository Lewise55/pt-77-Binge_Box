import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { EpisodeImage } from "../pages/Component.jsx";

export const EpisodeCard = (props) => {
  const { store, dispatch } = useGlobalReducer();
  const [expanded, setExpanded] = useState(false);
  const [showGuestStars, setShowGuestStars] = useState(false);
  const [liked, setLiked] = useState(false);

      
  const shortenedOverview = 
    props.overview && props.overview.length > 50
      ? props.overview.slice(0, 50) + "..."
      : props.overview;

  const toggleLiked = (name) => {
    setLiked(!liked);
    // if(liked){
    dispatch({ type: "toggle_favorites", payload: name });
    // }
  };

  return (
    <div className="text-center mt-5">
      <div className="showCard">
        <div className="card h-100 bg-dark text-light mx-2" style={{ minWidth: "18rem" }}>
          <h5 className="showCard-title">{props.name}</h5>
          <div className="card-img-wrapper">
            <img
              src={"https://image.tmdb.org/t/p/w500/" + props.poster}
              className="card-img"
            />
          </div>          
          <div 
          className="card-body">
            <p 
              onClick={() => setExpanded((exp) => !exp)}
              style={{
                cuser: "pointer",
                maxHeight: expanded ? "none" : "3em",
                overflow: "hidden",
                transition: "max-height 0.3s"
              }}
              className="card-text"
            >
              {expanded && (
                <button
                style={{
                  background: "#eee",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer"
                }}
                onClick={() => setExpanded(false)}
              >
                Collapse
                </button>) ? props.overview : shortenedOverview}
                {!expanded && props.overview.length > 50 && (
                  <span style={{ color: "blue" }}> (More)</span>
                )}
              </p>  
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Air Date: {props.air_date}</li>
            <li className="list-group-item">Episode Number: {props.episode_number}</li>
            <li className="list-group-item">Runtime: {props.runtime}</li>
            <span
              onClick={() => setShowGuestStars(show => !show)}
              style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}}
            >             
              {showGuestStars ? 'Hide Guest Stars' : 'Show Guest Stars'}
            </span>
            {showGuestStars && (
              <li>
                {props.guest_stars && props.guest_stars.map(star => (
                  <li                 
                    className="Cast"
                    key={star.id}>{star.name} (as {star.character})
                  </li>              
                ))}   
              </li>
              )}
          </ul>
          <div className="card-body d-flex justify-content-around">
            <button className="btn btn-light">Watch Now</button>
            <button className="btn btn-light">Review</button>
          </div>
        </div>
      </div>      
    </div>
  );
};
