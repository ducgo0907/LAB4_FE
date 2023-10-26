import React, { useEffect, useState } from 'react';
import cartService from '../service/cart.service';

const ShoppingCart = () => {
	const [carts, setCarts] = useState([]);
	const [changeQuantity, setChangeQuantity] = useState(false);

	useEffect(() => {
		cartService.getAll()
			.then(res => {
				setCarts(res.data.data);
			})
			.catch(err => {
				console.log(err);
			})
	}, [])

	const handleChangeQuantity = (e, productId) => {
		setCarts(listCart => listCart.map(cart => {
			cart.products = cart.products.map(p => {
				if (p._id === productId) {
					p.quantity = e.target.value;
				}
				return p;
			})
			return cart;
		}))
	}

	const updateCustomQuantity = (productId, quantity, cartId) => {
		console.log(productId, quantity, cartId);
		cartService.updateCustomProduct({ productId, quantity, cartId })
			.then(res => {
				alert(res.data.message);
				cartService.getAll()
					.then(res => {
						setCarts(res.data.data);
					})
					.catch(err => {
						console.log(err);
					})
			})
			.catch(err => {
				console.log(err);
			})
	}

	const removeProduct = (cartId, productId) => {
		cartService.removeProduct({ cartId, productId })
			.then(res => {
				cartService.getAll()
					.then(res => {
						setCarts(res.data.data);
					})
					.catch(err => {
						console.log(err);
					})
			})
			.catch(err => {
				console.log(err);
			})
	}

	return (
		<div className="container">
			<h2>Shopping Cart</h2>
			<ul className="list-group">
				{carts.map((item, index) => (
					<li key={item._id} className="list-group-item mb-4">
						<h2>Cart {index + 1}</h2>
						<span className="badge badge-primary badge-pill float-right">
							Quantity: {item.totalQuantity}
						</span>
						<div>
							<span style={{ fontWeight: "bold" }}>{item?.products?.length > 0 ? "List products: " : ""}</span>
						</div>
						{item.products.map(product => (
							<div className='row' key={product._id} style={{
								border: 'red solid 1px',
								marginBottom: '10px'
							}}>
								<div className='col-sm-6'>
									<div className='row'>
										<div className='col-sm-12'>
											Name: {product.name}
										</div>
										<div className='col-sm-12'>
											Price: {product.price}
										</div>
										<div className='col-sm-12'>
											Discount Percentage: {product.discountPercentage}%
										</div>
										<div className='col-sm-12'>
											Quantity: {changeQuantity ?
												<div>
													<input type='text'
														value={product.quantity}
														onChange={(e) => handleChangeQuantity(e, product._id)}
													/>
													<button
														className='btn btn-success'
														onClick={() => updateCustomQuantity(product._id, product.quantity, item._id)}
													>
														Change
													</button>
												</div>
												: product.quantity}
										</div>
										<div className='col-sm-12'>
											Price: {product.total}
										</div>
									</div>
								</div>
								<div className='col-sm-6'>
									<img src={product.thumbnail} alt={product.name} className='mt-2' style={{ maxHeight: '120px', float: 'right' }} />
								</div>
								<div className='col-sm-12'>
									<button
										className='btn btn-primary mb-2 ml-2'
										onClick={() => setChangeQuantity(!changeQuantity)}>
										{changeQuantity ? "Done" : "Update Quantity"}
									</button>
									<button
										className='btn btn-danger mb-2 ml-2'
										onClick={() => removeProduct(item._id, product._id)}>
										Remove Product
									</button>
								</div>
							</div>
						))}
						<div>
							Total Product: {item.totalProduct}
						</div>
						<div>
							Total Discount: {item.discountTotal}
						</div>
						<div>
							Total Price: {item.totalPrice}
						</div>
						<div>
							Total Quantity: {item.totalQuantity}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ShoppingCart;
