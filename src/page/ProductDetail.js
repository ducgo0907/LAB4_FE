import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import productService from "../service/product.service";
import Comment from "./Comment";
import authService from "../service/auth.service";
import commentService from "../service/comment.service";
import UploadImageProduct from "./UploadImageProduct";
import ImageGallery from "./ImageGallery";

const ProductDetail = () => {
	const [product, setProduct] = useState([]);
	const [user, setUser] = useState(authService.getCurrentUser());
	const { id } = useParams();

	useEffect(() => {
		productService.detail(id)
			.then(res => {
				setProduct(res.data.product);
			})
			.catch(err => {
				console.log(err);
			})
	}, [id])

	const onAddComment = (newComment) => {
		newComment.userId = user.id;
		newComment.productId = product._id;
		commentService.addComment(newComment)
			.then(res => {
				let newComments = [...product.comments, res.data.newComment];
				setProduct({ ...product, comments: newComments });
			})
			.catch(err => {
				console.log(err);
			})
	}

	const onUploadImage = (data) => {
		alert('Insert Image success');
		productService.detail(id)
			.then(res => {
				setProduct(res.data.product);
			})
			.catch(err => {
				console.log(err);
			})
	}
	return (
		<div>
			<div className="card mb-3">
				<h1 style={{ textAlign: 'center' }}>Detail product</h1>
				<img
					src={product.thumbnail || 'placeholder-image.jpg'} // Provide a placeholder image source
					className="card-img-top"
					alt={product.name}
				/>
				<ImageGallery images={product.images} />
				<div className="card-body">
					<h5 className="card-title">
						<Link to={`detail/${product._id}`}>{product.name}</Link>
					</h5>
					<p className="card-text">{product.description}</p>
					<p className="card-text">Price: ${product.price}</p>
					<p className="card-text">Stock: {product.stock}</p>
					<p className="card-text">Brand: {product.brand}</p>
					<p className="card-text">Discount: {product.discountPercentage}%</p>
				</div>
				<UploadImageProduct onUploadImage={onUploadImage} productId={product._id} />
			</div>
			<div>
				<Comment product={product} onAddComment={onAddComment} />
			</div>
		</div>
	)
}

export default ProductDetail;