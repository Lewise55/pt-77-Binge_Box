import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const MovieDetails = () => {

    const { store, dispatch } = useGlobalReducer();
    const [movieData, setMovieData] = useState();
    const {id} = useParams();

    useEffect(() => {
        const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
        const getMovie = async() => {
            let response = await fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,images`, {
                method: 'GET',
                    headers: {
                        Authorization: "Bearer " + API_KEY,
                        "Content-Type": "application/json"
                    },
            });            
            if(!response.ok){
                console.log("movie failed to load");
                return;                
            }
            let data = await response.json();
            setMovieData(data);
        }
        getMovie();
    }, [id])
    
    if (!movieData) {
        return <p>Loading movie details...</p>;
    }

    return (
        <div
            className="text-center mt-5"
            style={{
                height: "90vh",
                backgroundImage: `url("https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
            }}
        >   
            <img src="">https://image.tmdb.org/t/p/w1280${movieData.poster_path}</img>
            <h1>{movieData.title}</h1>
            <p>{movieData.overview}</p>
            {/* Render other details as needed */}
        </div>
    );
}; 