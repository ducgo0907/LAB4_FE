import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './ImageGallery'
const host = process.env.REACT_APP_BASE_URL;

const UploadImage = ({ onUploadImage, validateForm, onUploadImageProduct }) => {
	const [previewImages, setPriviewImages] = useState([]);
	const [imagesState, setImagesState] = useState([]);
	const [imagesStateP, setImagesStateP] = useState([]);
	const [previewImagesP, setPriviewImagesP] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleFileChange = async (e) => {
		const imagesData = [];
		const previewImagesArray = [];
		const files = e.target.files;


		const file = files[0];
		const imageData = await readFileHandler(file);
		if (imageData !== undefined) {
			imagesData.push(imageData);
		}

		if (file.type.startsWith('image/')) {
			previewImagesArray.push(URL.createObjectURL(file));
		}


		// Ensure that you set the previewImages state to a new array with the current previews
		setPriviewImages([...previewImagesArray]);

		// Update the images state to accumulate all selected images
		setImagesState((prevImages) => [...prevImages, ...imagesData]);
	};

	const handleFileChange2 = async (e) => {
		const imagesData = [];
		const previewImagesArray = [];
		const files = e.target.files;

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const imageData = await readFileHandler2(file);
			if (imageData !== undefined) {
				imagesData.push(imageData);
			}

			if (file.type.startsWith('image/')) {
				previewImagesArray.push(URL.createObjectURL(file));
			}
		}

		// Ensure that you set the previewImages state to a new array with the current previews
		setPriviewImagesP((prev) => [...prev, ...previewImagesArray]);

		// Update the images state to accumulate all selected images
		setImagesStateP((prevImages) => [...prevImages, ...imagesData]);
	};

	const readFileHandler = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImagesState((curr) => [...curr, reader.result]);
			return reader.result;
		};
	};

	const readFileHandler2 = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImagesStateP((curr) => [...curr, reader.result]);
			return reader.result;
		};
	};

	const handleFileUpload = () => {
		try {
			validateForm();
		} catch (err) {
			return;
		}
		setIsLoading(true);
		const formData = new FormData();
		for (let i = 0; i < imagesState.length; i++) {
			let file = imagesState[i];
			formData.append("file", file);
		}
		axios.post(`${host}/image/`, formData)
			.then(async (response) => {
				const data = response.data;
				const productId = await onUploadImage(data.images);
				console.log("Hehe", productId);
				setImagesState([]);
				setPriviewImages([]);
				if (imagesStateP.length > 0) {
					console.log("abc");
					const formData2 = new FormData();
					formData2.append("productId", productId);
					for (let i = 0; i < imagesStateP.length; i++) {
						let file2 = imagesStateP[i];
						formData2.append("file", file2);
					}
					const response2 = await axios.post(`${host}/image/uploadProduct`, formData2, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					});
					setIsLoading(false);
					if (response2.status === 200) {
						const data = response.data;
						setImagesStateP([]);
						setPriviewImagesP([])
					} else {
						alert('Failed to upload images products.');
					}
				}
				setIsLoading(false);
				alert('Created Product successfully!!');
			})
			.catch(error => {
				console.error(error);
			});
	};

	return (
		<div>
			<Form>
				<Form.Group>
					<Form.Label>Thumbnail: &nbsp; </Form.Label>
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
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
				<Form.Group>
					<Form.Label>Images: &nbsp; </Form.Label>
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange2}
						multiple="multiple"
					/>
				</Form.Group>
				{previewImagesP.map((preview, index) => (
					<img
						key={index}
						src={preview}
						alt={`Preview ${index}`}
						style={{ width: '100px', height: '100px', margin: '5px' }}
					/>
				))}
				<br />
				<Button variant="primary" onClick={handleFileUpload}>
					Add Product
				</Button>
			</Form>
			<div>
				{isLoading ? (
					<div className="loading-spinner"></div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default UploadImage;
