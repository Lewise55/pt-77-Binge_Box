import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light bg-gradient">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="navbar-brand" href="#">
          <img src="logo.png" alt="" width="100" height="100" />
        </div>
        <button className="btn btn-light text-primary">
          Action <i class="fa-solid fa-gun"></i>
        </button>
        <button className="btn btn-light text-primary">
          Romance <i class="fa-solid fa-heart"></i>
        </button>
        <button className="btn btn-light text-primary">
          Comedy <i class="fa-solid fa-masks-theater"></i>
        </button>
        <button className="btn btn-light text-primary">
          {" "}
          Sports <i class="fa-solid fa-futbol"></i>
        </button>
        <button className="btn btn-light text-primary">
          Live TV <i class="fa-solid fa-tv"></i>
        </button>
        <button className="btn btn-light text-primary">
          My favorites <i class="fa-solid fa-star"></i>
        </button>

        <div className="d-flex ms-auto align-items-center">
          <Link className="mx-2" to="/signup">
            <button className="btn btn-light text-primary">Signup</button>
          </Link>
          <Link className="mx-2" to="/">
            <button className="btn btn-light text-primary">
              <i class="fa-solid fa-house fa-xl"></i>{" "}
            </button>
          </Link>

          <input
            type="text"
            className="form-control search-input ms-2"
            placeholder="Search Binge Box"
          />
          <Link className="mx-2" to="/profile">
            <button className="btn btn-light text-primary">
              <i class="fa-solid fa-user fa-xl"></i>{" "}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
