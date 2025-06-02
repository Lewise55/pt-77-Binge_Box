import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useParams } from "react-router-dom";

export const WatchEpisode = (series_id, season_number, episode_number) => {

    const { store, dispatch } = useGlobalReducer()
    const {series_id, season_number, episode_number} = useParams();      

    return (
        <div className="text-center mt-5">
            
        </div>
    );
}; 