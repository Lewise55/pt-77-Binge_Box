import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faComment } from "@fortawesome/free-solid-svg-icons";
import { StarRating } from "./StarRating.jsx";

export const ShowCard = (props) => {
  const { store, dispatch } = useGlobalReducer();
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const[bookmarked, setBookmarked] = useState(false);
  const[favorites, setFavorites] = useState([]);  
  const [watchList, setWatchList] = useState([]);

  const shortenedOverview =
    props.overview && props.overview.length > 50
      ? props.overview.slice(0, 50) + "..."
      : props.overview;

 const toggleLiked = () => {
  setLiked(!liked);
  if(liked){
    handleLiked(id);
  }  
};

const handleLiked = async () => {
    const token = sessionStorage.getItem('access_token');
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/user/favorites', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ favorites: props.id })
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Failed to update favs", error);
    }
  };  

  const toggleBookmarked = () => {
    setBookmarked(!bookmarked);
    if(bookmarked){      
      handleWatchList(id);     
    }
  };

  const handleWatchList = async () => {
    const token = sessionStorage.getItem('access_token');
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/user/favorites', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({favorites: props.id})
        });
        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error("Failed to update favs")
    }       
  };

  const onShowClick = () => {};

  return (
    <div className="text-center mt-5">
      <div className={`showCard ${expanded ? "expanded" : ""}`}>
        <div
          className="card h-100 bg-dark text-light mx-2"
          style={{ minWidth: "18rem" }}
        >
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
                cursor: "pointer",
                maxHeight: expanded ? "none" : "3em",
                overflow: "hidden",
                transition: "max-height 0.3s",
              }}
              className="card-text"
            >
              {expanded ? (
                <>
                  {props.overview}
                  <span style={{ color: "blue" }}> (less)</span>
                </>
              ) : (
                <>
                  {shortenedOverview}
                  {props.overview.length > 50 && (
                    <span style={{ color: "blue" }}> (More)</span>
                  )}
                </>
              )}
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="d-flex justify-content-around">
                <span
                onClick={() => toggleBookmarked(props.name)}
                style={{ color: bookmarked ? 'red' : 'gray'}} 
                className="icon">
                 <FontAwesomeIcon icon={faBookmark} />
                </span>
                <Link to={`/reviews/series/${props.id}`}>
                  <span style={{color: 'gray'}}><FontAwesomeIcon icon={faComment} /></span>
                </Link>                
                <span
                  onClick={() => toggleLiked(props.name)}
                  style={{ color: liked ? 'red' : 'gray'}} 
                  className="icon">
                  <FontAwesomeIcon icon={faHeart} />
                </span>
              </div>              
            </li>
            <li className="list-group-item"><b>Release Date:</b> {props.first_air_date}</li>
            <li className="list-group-item">
              <span className="Vote text-center">
                <StarRating vote_average={props.vote_average} />
                {props.vote_average}
              </span>   
            </li>
          </ul>
          <div className="card-body d-flex">
            <Link className="mx-2" to={`/showDetails/1/${props.id}`}>
              <button
                className="btn btn-light"
                onClick={() => onShowClick(props.id, 1)}
              >
                View Details
              </button>
            </Link>
            <Link to={`/watchTrailer/${props.id}`}>
              <button className="btn btn-light">Watch Tailer</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
