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
