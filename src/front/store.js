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
    showSeasons: [],
    seasonImages: [],
    seasonVideos: [],
    showEpisodes: [],
    episodeImages: [],
    episodeVideos: [],
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

    case "add_season":
      return {
        ...store,
        showSeasons: action.payload,
      };

    case "add_season_image":
      return {
        ...store,
        seasonImages: action.payload,
      };

    case "add_season_video":
      return {
        ...store,
        seasonVideos: action.payload,
      };

    case "add_episode":
      return {
        ...store,
        showEpisodes: action.payload,
      };

    case "add_episode_image":
      return {
        ...store,
        episodeImages: action.payload,
      };

    case "add_episode_video":
      return {
        ...store,
        episodeVideos: action.payload,
      };

    default:
      throw Error("Unknown action.");
  }
}
