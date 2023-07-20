import React, { useState } from 'react';
import axios from 'axios';

// Create New Comment Component 
const CreateComment = ({ postId }) => {
	const [content, setContent] = useState('');

	/* form submit handler */
	const submitHandler = async (event) => {
		event.preventDefault();
		await axios.post(`http://localhost:5200/post/${postId}/new-comment`, {
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
