import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component - List Comments by Post Id 
const ListComments = ({ postId }) => {
	const [comments, setComments] = useState([]);

	/* get comments by post Id */
	const getComment = async () => {
		const response = await axios.get(`http://localhost:5200/posts/${postId}/comments`);
		setComments(response.data);
	};

	/* fetch once for every render */
	useEffect(() => {
		getComment();
	}, []);

	/* render comments to UI */
	const renderComments = comments.map((comment) => {
		return <li key={comment.id}>{comment.content}</li>;
	});

	return <ul>{renderComments}</ul>;
};

export default ListComments;
