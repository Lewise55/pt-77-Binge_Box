import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Carousel = () => {
  const { store, dispatch } = useGlobalReducer();
  const [movies, setMovies]  = useState([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
      //https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
      let response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?append_to_response=videos,images",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json",
          },
        }
      );  
      let data = await response.json();
      if (!response.ok) {
        console.log("cannot load movie data");
        return;
      }
      setMovies(data.results);    
    };
    fetchUpcomingMovies();
  }, [])

  console.log(movies)

  return (
    <div id="movieCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {Array.isArray(movies) && movies.length > 0 ? (
          movies
            .slice(0, 20)
            .map((movie, index) => (
              <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              style={{
                height: "90vh",
                backgroundImage: `url("https://image.tmdb.org/t/p/w1280${movie.backdrop_path}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <div
                className="carousel-caption text-start d-none d-md-block"
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  padding: "1.5rem",
                  borderRadius: "10px",
                  bottom: "20%",
                }}
              >
                <h5 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                  {movie.original_title}
                </h5>
                <p style={{ fontSize: "1.2rem" }}>{movie.description}</p>
              </div>
            </div>
            ))
          ) : (          
          <p>More Coming Soon...</p>
        )}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#movieCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#movieCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};
