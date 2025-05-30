import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const ShowCard = (props) => {
  const { store, dispatch } = useGlobalReducer();
  const [expanded, setExpanded] = useState(false);
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

  const onShowClick = () => {
    props.id === series_id;
  }

  return (
    <div className="text-center mt-5">
      <div className={`showCard ${expanded ? "expanded" : ""}`}>
        <div className="card h-100 bg-dark text-light mx-2" style={{ minWidth: "18rem" }}>
          <h5 className="showCard-title">{props.name}</h5>
          <div className="card-img-wrapper">
            <img
              src={"https://image.tmdb.org/t/p/w500/" + props.poster_path}
              className="card-img"
              alt={props.first_air_date}
            />
          </div>          
          <div className="card-body">    
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
              <li className="list-group-item">An item</li>
              <li className="list-group-item">A second item</li>
              <li className="list-group-item">A third item</li>
            </ul>
          <div className="card-body d-flex">
            <Link className="mx-2" to={`/showDetails/1/${props.id}`}>
						<button 
              className="btn btn-light"
              onClick={() => onShowClick(props.id, 1)}>
                Show Details
            </button>
            </Link>
            <Link to="/episodeCard">
              <button className="btn btn-light">Watch Episodes</button>
            </Link>
          </div>
        </div>
      </div>      
    </div>
  );
};
