import React, { useEffect, useState } from "react";

export const ReviewBackground = ({ itemType, itemId, children }) => {
  const [movie, setMovie] = useState(null);
  const [show, setShow] = useState(null);

  useEffect(() => {
    if (!itemType || !itemId) return;

    const fetchData = async () => {
      try {
        const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
        const endpoint =
          itemType === "movie"
            ? `https://api.themoviedb.org/3/movie/${itemId}?append_to_response=videos,images`
            : `https://api.themoviedb.org/3/tv/${itemId}?append_to_response=videos,images`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        itemType === "movie" ? setMovie(data) : setShow(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [itemType, itemId]);

  const backdropPath =
    itemType === "movie" ? movie?.backdrop_path : show?.backdrop_path;

  return (
    <div
      style={{
        backgroundImage: backdropPath
          ? `url("https://image.tmdb.org/t/p/w1280${backdropPath}")`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
};