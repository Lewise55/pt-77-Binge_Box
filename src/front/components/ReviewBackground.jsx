import React, { useEffect, useState } from "react";

export const ReviewBackground = ({ itemType, itemId, children }) => {
  const[movie, setMovie] = useState('');
  const[show, setShow] = useState('');

  useEffect(() => {
    if(itemType === 'movie'){
      getMovieData()
    }else {
      getShowData()
    }
    
  }, [itemType, itemId])
  

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const getShowData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${series_id}?api_key=${API_KEY}&append_to_response=videos,images`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      setShow(data);
    }

    const getMovieData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      setMovie(data);
    }

  
    

  return (
    itemType === 'movie' ? (
    <div
      style={{
        backgroundImage:   `url("https://image.tmdb.org/t/p/w1280${movie.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1
      }}/>
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </div>
  ) : (
    <div
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/w1280${show.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1
      }}/>
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </div>
  )
  );
}