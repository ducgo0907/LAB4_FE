import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './ImageGallery.css'

const ImageGallery = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	// Define the number of images to display at a time
	const imagesPerPage = 4;

	const handleNextClick = () => {
		const nextIndex = currentIndex + imagesPerPage;
		if (nextIndex < (images ? images.length : 0)) {
			setCurrentIndex(nextIndex);
		}
	};

	const handlePrevClick = () => {
		const prevIndex = currentIndex - imagesPerPage;
		if (prevIndex >= 0) {
			setCurrentIndex(prevIndex);
		}
	};

	const displayedImages = (images || []).slice(
		currentIndex,
		currentIndex + imagesPerPage
	);

	return (
		<Container>
			<Row>
				{displayedImages.map((image, index) => (
					<Col key={index} xs={6} md={4} lg={3} className='mt-2'>
						{image && (
							<div className={`gallery-item ${currentIndex === index ? 'current' : ''}`}>
								<img src={image.url} alt={image.caption || `Image ${index}`} className="img-fluid" style={{ maxHeight: '140px' }} />
							</div>
						)}
					</Col>
				))}
			</Row>
			<Row className='mt-2'>
				<Col>
					<Button
						variant="primary"
						onClick={handlePrevClick}
						disabled={currentIndex === 0}
						hidden={!images || images.length <= 0}
					>
						Previous
					</Button>
				</Col>
				<Col className="text-end">
					<Button
						variant="primary"
						onClick={handleNextClick}
						disabled={currentIndex + imagesPerPage >= (images ? images.length : 0)}
						hidden={!images || images.length <= 0}
						style={{ float: 'right' }}
					>
						Next
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default ImageGallery;
