import React, { useState } from 'react';

const Comment = ({ product, onAddComment, isHide }) => {
	return (
		<div>
			<div>
				{isHide ? <></> : <CommentForm onAddComment={onAddComment} />}
			</div>
			<div
				className="comment-list"
				style={{
					maxHeight: '400px', // Adjust the height as needed
					overflowY: 'auto',
				}}
			>
				{product.comments ? (
					product.comments.map((comment, index) => (
						<div key={index} className="card mb-3">
							<div>{comment.user.username}</div>
							<div className="card-body">
								<h5 className="card-title">{comment.title}</h5>
								<p className="card-text">{comment.body}</p>
							</div>
						</div>
					))
				) : (
					<>
					</> // You can also display a message here if there are no comments
				)}
			</div>
		</div>
	);
};


const CommentForm = ({ onAddComment }) => {
	const [newComment, setNewComment] = useState({ title: '', body: '' });

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewComment({ ...newComment, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddComment(newComment);
		setNewComment({ title: '', body: '' });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					className="form-control"
					id="title"
					name="title"
					value={newComment.title}
					onChange={handleInputChange}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="body">Comment</label>
				<textarea
					className="form-control"
					id="body"
					name="body"
					value={newComment.body}
					onChange={handleInputChange}
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Add Comment
			</button>
		</form>
	);
};

export default Comment;
