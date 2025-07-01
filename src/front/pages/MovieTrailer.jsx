import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const MovieTailer = () => {
  const { store, dispatch } = useGlobalReducer();
  const [trailers, setTrailers] = useState([]);
  const [movieData, setMovieData] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const getMovieTrailer = async () => {
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
      setMovieData(data);
      let actualTrailers = data.videos.results.filter(
        (video) => video.type == "Trailer"
      );
      console.log(actualTrailers);
      setTrailers(actualTrailers);
    };
    getMovieTrailer();
  }, [id]);

  console.log(trailers);
  const videoUrl =
    trailers.length > 0
      ? `https://www.youtube.com/embed/${trailers[0].key}`
      : "";

  return (
    <div className="text-center mt-5">
      <div className="cover"
        style={{
            height: "90vh",
            backgroundImage: `url("https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
        }}></div>
      {videoUrl ? (
        <iframe
          className="mt-5"
          width="560"
          height="315"
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ):(
        <p>Trailer coming soon...</p>
      )}      
    </div>    
  );
};
