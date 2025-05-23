import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Private } from "./Private.jsx";
import { Link } from "react-router-dom";
import { ShowCard } from "../components/ShowCard.jsx";

export const Home = () => {
  const { store, dispatch, getShows, getAiringToday, getTopRated } =
    useGlobalReducer();
  const [shows, setShows] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    getShows();
    getAiringToday();
    getTopRated();
  }, []);

  useEffect(() => {
    setShows(store.shows);
    setAiringToday(store.showsAiringToday);
    setTopRated(store.showsTopRated);
  }, [store.shows, store.showsAiringToday, store.showsTopRated]);

  // console.log(shows, airingToday, topRated, "HERE");

  return (
    <div className="text-center mt-5">
      <h2>Popular TV</h2>
      <div>
        {Array.isArray(shows) && shows.length > 0 ? (
          shows
            .slice(0, 10)
            .map((show, index) => (
              <ShowCard
                key={index}
                poster_path={show.poster_path}
                first_air_date={show.first_air_date}
                name={show.name}
                overview={show.overview}
              />
            ))
        ) : (
          <p>No shows found.</p>
        )}
      </div>
      <div className="alert alert-info">
        {store.message ? (
          <span>{store.message}</span>
        ) : (
          <span className="text-danger">
            Loading message from the backend (make sure your python 🐍 backend
            is running)...
          </span>
        )}
      </div>
      <Link to={"/profile"}>View Profile</Link>
    </div>
  );
};
