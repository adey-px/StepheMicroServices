import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateComment from '../comment/CreateComment';
import ShowComments from '../comment/ShowComments';

// Component - Fetch All Posts from Query Service
const ListPosts = () => {
	const [posts, setPosts] = useState({});
	const getPosts = async () => {
		const response = await axios.get('http://localhost:5003/posts');
		console.log(response.data);
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
					<ShowComments comments={post.comments} />
					<CreateComment postId={post.id} />
				</div>
			</div>
		);
	});

	return <div className='d-flex flex-row flex-wrap justify-content-between'>{renderPosts}</div>;
};

export default ListPosts;
