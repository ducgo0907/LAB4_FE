import { useEffect, useState } from "react";
import ListProduct from "./ListProduct";
import axios from "axios";
import cartService from "../service/cart.service";
import authService from "../service/auth.service";
import { Link } from "react-router-dom";

const host = process.env.REACT_APP_BASE_URL;

const Home = () => {
	const [products, setProducts] = useState([]);
	const [carts, setCarts] = useState([]);
	const [user, setUser] = useState(authService.getCurrentUser());
	const [page, setPage] = useState(1); // Current page
	const [pageSize, setPageSize] = useState(6); // Products per page
	const [totalProducts, setTotalProducts] = useState(0); // Total number of products
	const totalPages = Math.ceil(totalProducts / pageSize);

	useEffect(() => {
		// Fetch products with pagination parameters
		axios
			.get(`${host}/products?page=${page}&size=${pageSize}`)
			.then((res) => {
				setProducts(res.data.data);
				setTotalProducts(res.data.totalProduct); // Set total number of products
			})
			.catch((err) => {
				console.log(err);
			});
	}, [page, pageSize]);

	useEffect(() => {
		cartService
			.getAll()
			.then((res) => {
				setCarts(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const onAddToCart = (cartId, productId, quantity) => {
		cartService
			.addProduct({ cartId, productId, quantity })
			.then((res) => {
				alert(res.data.message);
				axios
					.get(`${host}/products?page=${page}&size=${pageSize}`)
					.then((res) => {
						setProducts(res.data.data);
						setTotalProducts(res.data.totalProduct); // Update total number of products
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const addNewCart = () => {
		if (user) {
			cartService
				.create(user.id)
				.then((res) => {
					alert("Success");
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const handlePageClick = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			setPage(pageNumber);
		}
	};

	const generatePageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => handlePageClick(i)}
					className={i === page ? "btn btn-primary" : "btn"}
				>
					{i}
				</button>
			);
		}
		return pageNumbers;
	};

	return (
		<div>
			{user ? (
				<button className="btn btn-primary" onClick={addNewCart}>
					Add new cart
				</button>
			) : (
				<div>
					Login to create a new cart <Link to="login">login</Link>
				</div>
			)}
			<div className="row">
				{products.map((product) => (
					<div className="col-sm-4" key={product._id}>
						<ListProduct product={product} userCarts={carts} onAddToCart={onAddToCart} />
					</div>
				))}
			</div>
			<div>
				<button onClick={() => handlePageClick(page - 1)} disabled={page <= 1}>
					Previous
				</button>
				{generatePageNumbers()}
				<button onClick={() => handlePageClick(page + 1)} disabled={page >= totalPages}>
					Next
				</button>
			</div>
		</div>
	);
};

export default Home;
