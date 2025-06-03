import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Private } from "./Private.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ShowCard } from "../components/ShowCard.jsx";
import { Carousel } from "../components/Carousel.jsx";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  const { store, dispatch, getShows, getAiringToday, getTopRated, getGenres } =
    useGlobalReducer();
  const navigate = useNavigate();
  const [selectedShow, setSelectedShow] = [];
  const [shows, setShows] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [genres, setGenres] = useState([]);
  const [action, setAction] = useState([]);
  const [animmation, setAnimation] = useState([]);
  const [drama, setDrama] = useState([]);
  const [Comedy, setComedy] = useState([]);
  const [crime, setCrime] = useState([]);
  const [family, setFamily] = useState([]);
  const [sciFi, setSciFi] = useState([]);
  const [soap, setSoap] = useState([]);
  const [other, setOther] = useState([]);

  useEffect(() => {
    getShows();
    getAiringToday();
    getTopRated();
    getGenres().then((data) => {
      setGenres(data.genres);
    });
  }, []);

  useEffect(() => {
    let actionGenre = genres.find((g) => g.id === 10759);
    let actionGenreId = actionGenre ? actionGenre.id : null;

    Array.isArray(shows) && shows.length > 0
      ? setAction(
          shows.filter(
            (show) =>
              Array.isArray(show.genre_ids) &&
              show.genre_ids.includes(actionGenreId)
          )
        )
      : [];
  }, [shows, genres]);

  useEffect(() => {
    setShows(store.shows);
    setAiringToday(store.showsAiringToday);
    setTopRated(store.showsTopRated);
  }, [store.shows, store.showsAiringToday, store.showsTopRated]);

  // console.log(shows, airingToday, topRated, "HERE");

  return (
    <div className="text-center mt-5">
      <Carousel />
      <h2 className="py-2">Popular TV</h2>
      <div className="d-flex align-items-stretch col-10 overflow-auto mt-2 mx-auto ">
        {Array.isArray(shows) && shows.length > 0 ? (
          shows
            .slice(0, 15)
            .map((show, index) => (
              <ShowCard
                key={index}
                id={show.id}
                poster_path={show.poster_path}
                first_air_date={show.first_air_date}
                name={show.name}
                overview={show.overview}
                onClick={() => setSelectedShow({ id })}
              />
            ))
        ) : (
          <p>No shows found.</p>
        )}
      </div>

      <h2 className="py-2">Airing Today</h2>
      <div className="d-flex align-items-stretch col-10 overflow-auto mt-2 mx-auto ">
        {Array.isArray(airingToday) && airingToday.length > 0 ? (
          airingToday
            .slice(0, 15)
            .map((show, index) => (
              <ShowCard
                key={index}
                id={show.id}
                poster_path={show.poster_path}
                first_air_date={show.first_air_date}
                name={show.name}
                overview={show.overview}
                onClick={() => setSelectedShow({ id })}
              />
            ))
        ) : (
          <p>No shows found.</p>
        )}
      </div>

      <h2 className="py-2">Top Rated</h2>
      <div className="d-flex align-items-stretch col-10 overflow-auto mt-2 mx-auto ">
        {Array.isArray(topRated) && topRated.length > 0 ? (
          topRated
            .slice(0, 15)
            .map((show, index) => (
              <ShowCard
                key={index}
                id={show.id}
                poster_path={show.poster_path}
                first_air_date={show.first_air_date}
                name={show.name}
                overview={show.overview}
                onClick={() => setSelectedShow({ id })}
              />
            ))
        ) : (
          <p>No shows found.</p>
        )}
      </div>

      <h2 className="py-2">Action</h2>
      <div className="d-flex align-items-stretch col-10 overflow-auto mt-2 mx-auto ">
        {Array.isArray(action) && action.length > 0 ? (
          action
            .slice(0, 15)
            .map((show, index) => (
              <ShowCard
                key={index}
                id={show.id}
                poster_path={show.poster_path}
                first_air_date={show.first_air_date}
                name={show.name}
                overview={show.overview}
                onClick={() => setSelectedShow({ id })}
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
