// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"  // Import the reducer and the initial state.
import {
    signup as handle_signup, 
    login as handle_login, 
    getUser as handle_getUser, 
    getShows, 
    getAiringToday, 
    getTopRated, 
    getGenres,
    getPopularMovies,
    getTopRatedMovies,
    getMoviesPlayingNow,
    getUpcomingMovies
} from "./actions"

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext()

// Define a provider component that encapsulates the store and warps it in a context provider to 
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
    // Initialize reducer with the initial state.
    const [store, dispatch] = useReducer(storeReducer, initialStore())
    // Provide the store and dispatch method to all child components.
    const actions = {
        handle_signup: (payload) => handle_signup(dispatch, payload),
        handle_login: (payload) => handle_login(dispatch, payload),
        handle_getUser: (payload) => handle_getUser(dispatch, payload),
        getShows: (payload) => getShows(dispatch, payload),
        getAiringToday: (payload) => getAiringToday(dispatch, payload),
        getTopRated: (payload) => getTopRated(dispatch, payload),
        getGenres: (payload) => getGenres(dispatch, payload),
        getPopularMovies: (payload) => getPopularMovies(dispatch, payload),
        getTopRatedMovies: (payload) => getTopRatedMovies(dispatch, payload),
        getMoviesPlayingNow: (payload) => getMoviesPlayingNow(dispatch, payload),
        getUpcomingMovies: (payload) => getUpcomingMovies(dispatch, payload),
    }
    return <StoreContext.Provider value={{ store, dispatch, ...actions}}>
        {children}
    </StoreContext.Provider>
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    const { 
        dispatch, 
        store, 
        handle_signup, 
        handle_login, 
        handle_getUser, 
        getShows, 
        getAiringToday, 
        getTopRated,
        getGenres,
        getPopularMovies,
        getTopRatedMovies,
        getMoviesPlayingNow,
        getUpcomingMovies 
    } = useContext(StoreContext)
    return { 
        dispatch, 
        store, 
        handle_signup, 
        handle_login,        
        handle_getUser, 
        getShows, 
        getAiringToday, 
        getTopRated,
        getGenres,
        getPopularMovies,
        getTopRatedMovies,
        getMoviesPlayingNow,
        getUpcomingMovies
    };
}