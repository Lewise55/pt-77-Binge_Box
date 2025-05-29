import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">BINGE BOX</h1>
			<p className="lead">
				<img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
			</p>
			<div className="alert alert-info">
				{store.message ? (
					<span>{store.message}</span>
				) : (
					<span className="text-danger">
						Loading message from the backend (make sure your python 🐍 backend is running)...
					</span>
				)}
			</div>
		</div>
	);
}; 

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const movies = [
  {
    title: "Movie Title 1",
    description: "Action-packed thriller with a twist.",
    image: "Place Holder",
  },
  {
    title: "Movie Title 2",
    description: "A heartfelt drama about love and loss.",
    image: "Place Holder",
  },
  {
    title: "Movie Title 3",
    description: "Journey through a dystopian future.",
    image: "Place Holder",
  },
];

const MovieCarousel = () => {
  return (
    <div id="movieCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {movies.map((movie, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            style={{
              height: "90vh",
              backgroundImage: `url(${movie.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <div className="carousel-caption text-start d-none d-md-block" style={{
              background: "rgba(0, 0, 0, 0.6)",
              padding: "1.5rem",
              borderRadius: "10px",
              bottom: "20%",
            }}>
              <h5 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{movie.title}</h5>
              <p style={{ fontSize: "1.2rem" }}>{movie.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#movieCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#movieCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default MovieCarousel;