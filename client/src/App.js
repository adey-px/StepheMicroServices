import React from 'react';
import CreatePost from './post/CreatePost';
import ListPosts from './post/ListPosts';

const App = () => {
	return (
		<div className='container'>
			<h3 className='text-center mt-5'>
				<span>Create Post</span>
			</h3>
			<CreatePost />
			<hr className='mt-5' />

			<h2 className='text-center mt-5'>
				<span>Recent Posts</span>
			</h2>
			<ListPosts />
		</div>
	);
};

export default App;
