import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<div class="dropdown">
					<button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						<i class="fa-solid fa-bars"></i>
					</button>
					<ul class="dropdown-menu">
						Top Genres
						<li><a class="dropdown-item" href="#">Action</a></li>
						<li><a class="dropdown-item" href="#">Documentary</a></li>
						<li><a class="dropdown-item" href="#">TV Series</a></li>
						<li><a class="dropdown-item" href="#">Romance</a></li>
						<li><a class="dropdown-item" href="#">Comedy</a></li>
						<li><a class="dropdown-item" href="#">Sports</a></li>
						<li><a class="dropdown-item" href="#"></a></li>
						<li><a class="dropdown-item" href="#">Live TV <i class="fa-solid fa-tv"></i></a></li>
						<li><a class="dropdown-item" href="#">My Favorites <i class="fa-solid fa-star"></i></a></li>
						<li><a class="dropdown-item" href="#">Notifications <i class="fa-solid fa-bell"></i></a></li>
						<li><a class="dropdown-item" href="#">Settings <i class="fa-solid fa-gear"></i></a></li>
					</ul>
					<ul></ul>
					</div>
				</Link>
				<h2>BINGE BOX</h2>
				<div className="ml-auto">
<<<<<<< HEAD
					<Link className="mx-2" to="/signup">
						<button className="btn btn-primary">Signup</button>
					</Link>
					<Link to="/login">
=======
					<Link to="/demo">
>>>>>>> ca480cf54b354d3e9b823b20cf0ea148af34ff52
						<button className="btn btn-primary">Login</button>
					</Link>
					<Link to="/demo">
						<button className="btn btn-primary">Home</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};