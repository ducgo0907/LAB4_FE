import React, { useState } from 'react';
import UploadImage from './UploadImage';

const host = process.env.REACT_APP_BASE_URL;
const AddProduct = () => {
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		price: '',
		discountPercentage: '',
		stock: '',
		brand: '',
		thumbnail: ''
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (url) => {
		console.log(formData);
		formData.thumbnail = url;
		// Make an API call to add the product here
		try {
			const response = await fetch(`${host}/products`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.status === 201) {
				alert('Product added successfully!');
				// Reset the form
				setFormData({
					name: '',
					description: '',
					price: 0,
					discountPercentage: 0,
					stock: 0,
					brand: '',
					thumbnail: ''
				});
			} else {
				alert('Failed to add the product.');
			}
		} catch (error) {
			console.error('Error adding the product:', error);
		}
	};

	const onUploadImage = (data) => {
		handleSubmit(data[0].url.toString());
	}

	const validateForm = () => {
		if (!formData.name || formData.name === ""
			|| !formData.price || formData.price < 0
			|| !formData.stock || formData.stock < 0
			|| !formData.brand || formData.brand === ""
		) {
			alert('Please input to require input!');
			throw new Error('Error');
		}
	}

	return (
		<div>
			<h3>Add Product</h3>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Name: <span style={{ color: 'red' }}><span style={{ color: 'red' }}>(*)</span></span></label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Description: </label>
					<input
						type="text"
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Price: <span style={{ color: 'red' }}>(*)</span></label>
					<input
						type="text"
						name="price"
						value={formData.price}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Discount Percentage: </label>
					<input
						type="number"
						name="discountPercentage"
						value={formData.discountPercentage}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Stock: <span style={{ color: 'red' }}>(*)</span></label>
					<input
						type="number"
						name="stock"
						value={formData.stock}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Brand: <span style={{ color: 'red' }}>(*)</span></label>
					<input
						type="text"
						name="brand"
						value={formData.brand}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className='form-group'>
					<UploadImage onUploadImage={onUploadImage} validateForm={validateForm} />
				</div>
			</form>
		</div>
	);
};

export default AddProduct;
