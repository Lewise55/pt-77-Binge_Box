export const signup = async (dispatch, payload) => {
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
