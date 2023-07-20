import React, { useState, useEffect } from 'react';
import axios from 'axios';

// List Comments by Post Id Component
const ListComments = ({ postId }) => {
	const [comments, setComments] = useState([]);

	/* get comments by post Id */
	const getComment = async () => {
		const res = await axios.get(`http://localhost:5200/post/${postId}/comments`);
		setComments(res.data);
	};

	useEffect(() => {
		getComment();
	}, []);

	const renderComments = comments.map((comment) => {
		return <li key={comment.id}>{comment.content}</li>;
	});

	return <ul>{renderComments}</ul>;
};

export default ListComments;
