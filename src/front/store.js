export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
    user: null,
    access_token: sessionStorage.getItem("access_token"),
    shows: [],
    showsAiringToday: [],
    showsTopRated: [],
    showsTrending: [],
    showGenres: [],
    popularMovies: [],
    moviesPlayingNow: [],
    topRatedMovies: [],
    upcomingMovies: [],
    trendingMovies: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "set_user":
      const { user, access_token } = action.payload;

      sessionStorage.setItem("access_token", access_token);
      console.log(access_token);

      return {
        ...store,
        user: user,
        access_token: access_token,
      };

    case "add_shows":
      return {
        ...store,
        shows: action.payload,
      };

    case "add_airing_today":
      return {
        ...store,
        showsAiringToday: action.payload,
      };

    case "add_top_rated":
      return {
        ...store,
        showsTopRated: action.payload,
      };

    case "add_trending":
      return {
        ...store,
        showsTrending: action.payload,
      };

    case "add_genre":
      return {
        ...store,
        showGenres: action.payload,
      };

    case "add_pupular_movie":
      return {
        ...store,
        popularMovies: action.payload,
      };

    case "add_movie_playing_now":
      return {
        ...store,
        moviesPlayingNow: action.payload,
      };

    case "add_top_rated_movie":
      return {
        ...store,
        topRatedMovies: action.payload,
      };

    case "add_upcoming_movie":
      return {
        ...store,
        upcomingMovies: action.payload,
      };

    case "add_trending_movie":
      return {
        ...store,
        trendingMovies: action.payload,
      };

    default:
      throw Error("Unknown action.");
  }
}
