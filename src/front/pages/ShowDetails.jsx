import React, { useEffect, useState} from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useParams } from "react-router-dom";
import { EpisodeCard } from '../components/EpisodeCard.jsx';


export const ShowDetails = () => {

    const { store, dispatch } = useGlobalReducer();
    const [seasons, setSeasons] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [seasonImages, setSeasonImages] = useState([]);
    const [seasonVideos, setSeasonVideos] = useState([]);
    
    const {series_id, season_number} = useParams();
    
    useEffect(() => {
        const fetchSeason = async() => {
            if (!series_id || !season_number) {
                console.log("series_id or season_number is undefined");
                return  
            }
            const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
            let response = await fetch(`https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}?append_to_response=videos,images`, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
            });
            let data = await response.json();
            if(!response.ok){
               console.log("cannot load data");                
            }
            setSeasons(data.results);
            setEpisodes(data.episodes);
            setSeasonImages(data.images);
            setSeasonVideos(data.videos)
        };
        fetchSeason();      
    }, [series_id, season_number]);

    // console.log(seasonImages, seasonVideos);    
     
    return(
        <div className="text-center mt-5">
             <h2>Season : {season_number}</h2>
             <div className="d-flex align-items-stretch col-10 overflow-auto mt-2 mx-auto ">
                {Array.isArray(episodes) && episodes.length > 0 ? (
                episodes
                    .map((episode, index) => (
                    <EpisodeCard
                        key={index}
                        id={episode.id}
                        episode_number={episode.episode_number}
                        air_date={episode.air_date}
                        name={episode.name}                        
                        overview={episode.overview}
                        guest_stars={episode.guest_stars}
                        runtime={episode.runtime}
                    />
                    ))
                ) : (
                <p>No shows found.</p>
                )}
            </div>            
        </div>
    );
}; 