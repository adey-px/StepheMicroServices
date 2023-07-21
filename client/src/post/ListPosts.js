import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateComment from '../comment/CreateComment';
import ListComments from '../comment/ListComments';

// Component - Fetch All Posts
const ListPosts = () => {
	const [posts, setPosts] = useState({});

	/* fetch posts from post service */
	const getPosts = async () => {
		const response = await axios.get('http://localhost:5001/posts');
		setPosts(response.data);
	};

	/* fetch once for every render */
	useEffect(() => {
		getPosts();
	}, []);

	/* render posts list to UI */
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
			{renderPosts}
		</div>
	);
};

export default ListPosts;
