import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateComment from '../comment/CreateComment';
import ListComments from '../comment/ListComments';

// Fetch All Posts Component
const ListPosts = () => {
	const [posts, setPosts] = useState({});

	const getPosts = async () => {
		const res = await axios.get('http://localhost:5000/all-posts');
		setPosts(res.data);
	};

	useEffect(() => {
		getPosts();
	}, []);

	const renderPosts = Object.values(posts).map((post) => {
		return (
			<div
				key={post.id}
				className='card mb-5'
			>
				<div className='card-body'>
					<h3 className='text-center'>
						<span>{post.title}</span>
					</h3>
					<ListComments postId={post.id} />
					<CreateComment postId={post.id} />
				</div>
			</div>
		);
	});

	return (
		<div className='d-flex flex-row flex-wrap justify-content-between'>
			<span>{renderPosts}</span>
		</div>
	);
};

export default ListPosts;
