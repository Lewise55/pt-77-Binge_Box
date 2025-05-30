// exports for user setup
export const signup = async (dispatch, payload) => {
    // console.log(payload)
    let response = await fetch(import.meta.env.VITE_BACKEND_URL + "/signup", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            first_name: payload.first_name,
            last_name: payload.last_name,
            email: payload.email,
            user_name: payload.user_name,
            password: payload.password
        }),
    });    
    let data =  await response.json();
}

export const login = async (dispatch, payload) => {
    let responce = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            email: payload.email,
            password: payload.password
        }),
    });
    let data =  await responce.json();

    // Dispatch the user data to the global state
    dispatch({
        type: "set_user",
        payload: {user: data.user, access_token: data.access_token}
    });
}

export const getUser = async (dispatch, payload) => {
    let response = await fetch(import.meta.env.VITE_BACKEND_URL + "/private", {
        method: "GET",
        headers: {"Authorization": "Bearer " + payload},
    });
    let data =  await response.json();

    if (!response.ok) {
        // If token is invalid, remove it and reset state
        throw new Error("Invalid or expired token");
    } 

    dispatch({
        type: "set_user",
        payload: {user: data.user, access_token: payload}
    });
};

// exports for TV api

export const getShows = async(dispatch, payload) => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    let response = await fetch("https://api.themoviedb.org/3/tv/popular", {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json"
        },
    });
    let data = await response.json();

    if(!response.ok){
        console.log('Network response was not ok');
    }else{
        // // console.log(data);
        dispatch({
            type: "add_shows",
            payload: data.results
        });
        return data;            
    }    
} 

export const getAiringToday = async(dispatch, payload) => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    let response = await fetch("https://api.themoviedb.org/3/tv/airing_today", {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json"
        },
    });
    let data = await response.json();
    if(!response.ok){
        console.log('Network response was not ok');
    }else{
        // // console.log(data);
        dispatch({
            type: "add_airing_today",
            payload: data.results
        });
        return data;            
    }    
} 

export const getTopRated = async(dispatch, payload) => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    let response = await fetch("https://api.themoviedb.org/3/tv/top_rated", {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json"
        },
    });
    let data = await response.json();
    if(!response.ok){
        console.log('Network response was not ok');
    }else{
        // // console.log(data);
        dispatch({
            type: "add_top_rated",
            payload: data.results
        });
        return data;            
    }    
} 

export const getGenres = async(dispatch, payload) => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    let response = await fetch("https://api.themoviedb.org/3/genre/tv/list", {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json"
        },
    });
    let data = await response.json();
    if(!response.ok){
        console.log('Network response was not ok');
    }else{
        // // console.log(data);
        dispatch({
            type: "add_genre",
            payload: data.results
        });
        return data;            
    }    
} 

export const getShowSeason = async(dispatch, payload) => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    let response = await fetch("https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}", {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json"
        },
    });
    let data = await response.json();
    if(!response.ok){
        console.log('Network response was not ok');
    }else{
        // console.log(data);
        dispatch({
            type: "add_season",
            payload: data.results
        });
        return data;            
    }    
} 

export const getSeasonImage = async(dispatch, payload) => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    let response = await fetch("https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}/images", {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json"
        },
    });
    let data = await response.json();
    if(!response.ok){
        console.log('Network response was not ok');
    }else{
        // console.log(data);
        dispatch({
            type: "add_season_image",
            payload: data.results
        });
        return data;            
    }    
} 

export const getSeasonVideos = async(dispatch, payload) => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    let response = await fetch("https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}/videos", {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json"
        },
    });
    let data = await response.json();
    if(!response.ok){
        console.log('Network response was not ok');
    }else{
        // console.log(data);
        dispatch({
            type: "add_season_video",
            payload: data.results
        });
        return data;            
    }    
} 

export const getShowEpisodes = async(dispatch, payload) => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    let response = await fetch("https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}/episode/{episode_number}", {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json"
        },
    });
    let data = await response.json();
    if(!response.ok){
        console.log('Network response was not ok');
    }else{
        // console.log(data);
        dispatch({
            type: "add_episode",
            payload: data.results
        });
        return data;            
    }    
} 

export const getEpisodeImages = async(dispatch, payload) => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    let response = await fetch("https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}/episode/{episode_number}/images", {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json"
        },
    });
    let data = await response.json();
    if(!response.ok){
        console.log('Network response was not ok');
    }else{
        // console.log(data);
        dispatch({
            type: "add_episode_image",
            payload: data.results
        });
        return data;            
    }    
} 

export const getEpisodeVideos = async(dispatch, payload) => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    let response = await fetch("https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}/episode/{episode_number}/videos", {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json"
        },
    });
    let data = await response.json();
    if(!response.ok){
        console.log('Network response was not ok');
    }else{
        // console.log(data);
        dispatch({
            type: "add_episode_video",
            payload: data.results
        });
        return data;            
    }    
} 

