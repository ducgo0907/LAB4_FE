import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { routes } from './routes';
import { useState } from 'react';
import authService from './service/auth.service';
import cartService from './service/cart.service';

function App() {
	const [user, setUser] = useState(authService.getCurrentUser());
	const logOut = () => {
		authService.logout();
		setUser(null);
		window.location.reload();
	}

	return (
		<Router>
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="add">Add</Link>
						</li>
						<li>
							<Link className="nav-link" to="carts">My Cart</Link>
						</li>
						<li className="nav-item">
							{user
								? <div className='nav-link' onClick={logOut}>Logout</div>
								: <Link className="nav-link" to="login">Login</Link>
							}

						</li>
					</ul>
				</nav>
				<div className="container">
					<Routes>
						{routes.map((route, index) => (
							<Route key={index} {...route} />
						))}
					</Routes>
				</div>
			</div>
		</Router >
	);
}

export default App;
