import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const MovieDetails = () => {

    const { store, dispatch } = useGlobalReducer();
    const [movieData, setMovieData] = useState();
    const {movie_id} = useParams();

    useEffect(() => {
        const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
        const getMovie = async() => {
            let response = fetch('', {
                method: 'GET',
                    headers: {
                        Authorization: "Bearer " + API_KEY,
                        "Content-Type": "application/json"
                    },
            });
            let data = await response.json();
            if(!response.ok){
                console.log("movie failed to load");
                return;                
            }
            setMovieData(data.results);
        }
    }, [movie_id])

    return (
        <div className="text-center mt-5" 
            style={{
                height: "90vh",
                backgroundImage: `url("https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
            }}>
            
        </div>
    );
}; 