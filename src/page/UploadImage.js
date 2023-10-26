import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
const host = process.env.REACT_APP_BASE_URL;

const UploadImage = ({ onUploadImage, validateForm }) => {
	const [files, setFiles] = useState([]);

	const handleFileChange = (e) => {
		setFiles(e.target.files);
	};

	const handleUpload = async () => {
		try{
			validateForm();
		}catch(err){
			return;
		}
		
		if (files.length === 0) {
			alert('Please select at least one image to upload.');
			return;
		}

		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append('image', files[i]);
		}
		try {
			const response = await axios.post(`${host}/image`, formData, {
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
					<Form.Label>Thumbnail: &nbsp; </Form.Label>
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						multiple="multiple"
					/>
				</Form.Group>
				<Button variant="primary" onClick={handleUpload}>
					Add Product
				</Button>
			</Form>
		</div>
	);
};

export default UploadImage;
