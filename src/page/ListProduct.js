import React, { useState } from 'react';
import CartSelectionModal from './ListCart';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

const ListProduct = ({ product, onAddToCart, userCarts }) => {
	const [quantity, setQuantity] = useState(1);
	const [showCartSelection, setShowCartSelection] = useState(false);

	const handleAddToCart = () => {
		// onAddToCart(product, quantity);
		if (userCarts.length === 0) {
			// Handle the case where the user has no carts.
			alert('You have no carts. Please create a cart first.');
		} else if (userCarts.length === 1) {
			onAddToCart(userCarts[0].id, product.id, quantity);
		} else {
			// Show the cart selection modal.
			setShowCartSelection(true);
		}
	};

	const selectCartAndAdd = (cart) => {
		onAddToCart(cart._id, product._id, quantity);
		setShowCartSelection(false);
	};

	const closeModal = () => {
		setShowCartSelection(false);
	};

	return (
		<div className={`card mb-3`}>
			<img
				src={product.thumbnail || 'placeholder-image.jpg'} // Provide a placeholder image source
				className="card-img-top"
				alt={product.name}
				style={{ maxHeight: '195px' }}
			/>
			<div className="card-body">
				<h5 className="card-title">
					<Link to={`detail/${product._id}`}>{product.name}</Link>
					<Badge className='new-product'>New</Badge>
				</h5>
				<p className="card-text">Description: {product.description}</p>
				<p className="card-text">Price: ${product.price}</p>
				<p className="card-text">Stock: {product.stock}</p>
				<p className="card-text">Brand: {product.brand}</p>
				<p className="card-text">Discount: {product.discountPercentage}%</p>
				<div className="form-group">
					<label htmlFor="quantity">Quantity:</label>
					<input
						type="number"
						id="quantity"
						className="form-control"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
				</div>
				<button className="btn btn-primary" onClick={handleAddToCart}>
					Add to Cart
				</button>
				<Link to={`${product._id}/comments`} className='btn btn-success ml-2'>See Comment</Link>
				<div>
					{showCartSelection && (
						<CartSelectionModal
							carts={userCarts}
							onSelectCart={selectCartAndAdd}
							onClose={closeModal}
						/>
					)}
				</div>
			</div>
		</div >
	);
};

export default ListProduct;
