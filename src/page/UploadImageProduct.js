import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
const host = process.env.REACT_APP_BASE_URL;

const UploadImageProduct = ({ onUploadImage, productId }) => {
	const [files, setFiles] = useState([]);

	const handleFileChange = (e) => {
		setFiles(e.target.files);
	};

	const handleUpload = async () => {
		if (files.length === 0) {
			alert('Please select at least one image to upload.');
			return;
		}

		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append('productImages', files[i]);
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
				setFiles([]);
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
				<Button variant="primary" onClick={handleUpload}>
					Add Images
				</Button>
			</Form>
		</div>
	);
};

export default UploadImageProduct;
