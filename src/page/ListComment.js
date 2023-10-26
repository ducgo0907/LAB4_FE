import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import productService from "../service/product.service";
import authService from "../service/auth.service";
import commentService from "../service/comment.service";

const ListComment = () => {
	const [comments, setComments] = useState([]);
	const [user, setUser] = useState(authService.getCurrentUser());
	const { id } = useParams();

	useEffect(() => {
		productService.getComments(id)
			.then(res => {
				console.log(res);
				setComments(res.data);
			})
			.catch(err => {
				console.log(err);
			})
	}, [id])
	return (
		<div>
			<div className="card mb-3">
				{comments.length > 0 ? (comments.map((comment, index) => (
					<div key={index} className="card mb-3">
						<div>{comment.user.username}</div>
						<div className="card-body">
							<h5 className="card-title">{comment.title}</h5>
							<p className="card-text">{comment.body}</p>
						</div>
					</div>
				))) : <div>No comment</div>}
			</div>
		</div>
	)
}

export default ListComment;