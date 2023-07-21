import React, { useState } from 'react';
import axios from 'axios';

// Component - Create New Post
const CreatePost = () => {
	const [title, setTitle] = useState('');

	/* form submit handler */
	const submitHandler = async (e) => {
		e.preventDefault();
		await axios.post('http://localhost:5001/posts', {
			title,
		});

		setTitle('');
	};

	return (
		<div>
			<form onSubmit={submitHandler}>
				<div className='form-group'>
					<label>Title:</label>
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='form-control'
					/>
				</div>
				<button className='btn btn-primary'>
					<span>Create</span>
				</button>
			</form>
		</div>
	);
};

export default CreatePost;
