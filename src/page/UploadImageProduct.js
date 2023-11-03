import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
const host = process.env.REACT_APP_BASE_URL;

const UploadImageProduct = ({ onUploadImage, productId }) => {
	const [previewImages, setPriviewImages] = useState([]);
	const [imagesState, setImagesState] = useState([]);

	const handleFileChange = async (e) => {
		const imagesData = [];
		const previewImagesArray = [];
		const files = e.target.files;

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const imageData = await readFileHandler(file);
			if (imageData !== undefined) {
				imagesData.push(imageData);
			}

			if (file.type.startsWith('image/')) {
				previewImagesArray.push(URL.createObjectURL(file));
			}
		}

		// Ensure that you set the previewImages state to a new array with the current previews
		setPriviewImages((prev) => [...prev, ...previewImagesArray]);

		// Update the images state to accumulate all selected images
		setImagesState((prevImages) => [...prevImages, ...imagesData]);
	};

	const readFileHandler = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImagesState((curr) => [...curr, reader.result]);
			return reader.result;
		};
	};

	const handleUpload = async () => {
		if (imagesState.length === 0) {
			alert('Please select at least one image to upload.');
			return;
		}

		const formData = new FormData();
		for (let i = 0; i < imagesState.length; i++) {
			formData.append('file', imagesState[i]);
		}
		formData.append('productId', productId);
		try {
			const response = await axios.post(`${host}/image/uploadProduct`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (response.status === 200) {
				const data = response.data;
				onUploadImage(data.images)
				setImagesState([]);
				setPriviewImages([])
			} else {
				alert('Failed to upload images.');
			}
		} catch (error) {
			console.error('Error uploading images:', error);
		}
	};

	return (
		<div>
			<Form>
				<Form.Group>
					<Form.Label>Images: &nbsp; </Form.Label>
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						multiple="multiple"
					/>
				</Form.Group>
				{previewImages.map((preview, index) => (
					<img
						key={index}
						src={preview}
						alt={`Preview ${index}`}
						style={{ width: '100px', height: '100px', margin: '5px' }}
					/>
				))}
				<br />
				<Button variant="primary" onClick={handleUpload}>
					Add Images
				</Button>
			</Form>
		</div>
	);
};

export default UploadImageProduct;
