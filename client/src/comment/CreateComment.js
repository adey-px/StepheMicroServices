import React, { useState } from 'react';
import axios from 'axios';

// Component - Create New Comment
const CreateComment = ({ postId }) => {
	const [content, setContent] = useState('');

	/* form submit handler */
	const submitHandler = async (e) => {
		e.preventDefault();
		await axios.post(`http://localhost:5002/post/${postId}/comments`, {
			content,
		});
		setContent('');
	};

	return (
		<div>
			<form onSubmit={submitHandler}>
				<div className='form-group'>
					<input
						value={content}
						placeholder='Type comment'
						onChange={(e) => setContent(e.target.value)}
						className='form-control mt-5'
					/>
				</div>
				<button className='btn btn-primary'>
					<span>Send</span>
				</button>
			</form>
		</div>
	);
};

export default CreateComment;
