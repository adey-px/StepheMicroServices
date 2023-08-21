import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

const posts = {};

// API -
app.get('/posts', (req, res) => {
	res.send(posts);
});

// API - Receive data from event-bus
app.post('/events', (req, res) => {
	const { type, data } = req.body;
	console.log(`${type}, ${data}`);
	
	if (type === 'Post Created') {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	}
	if (type === 'Comment Created') {
		const { id, content, postId } = data;
		const post = posts[postId];
		post.comments.push({ id, content });
	}
	res.send({});
});

// Configure server
app.listen(5003, () => {
	console.log('**Started Query api service');
});
