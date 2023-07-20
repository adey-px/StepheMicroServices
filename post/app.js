import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';

// Instance of server
const app = express();

// Parse body of incoming post request
app.use(express.json());

// Handle requests across diff ports
app.use(cors())

// Empty object to store posts
const posts = {};

// API to create new posts
app.post('/new-post', (req, res) => {
	const postId = randomBytes(4).toString('hex');
	const { title } = req.body;

	posts[postId] = {
		postId,
		title,
	};
	res.status(201).send(posts[postId]);
});

// API to get all posts
app.get('/all-posts', (req, res) => {
	res.send(posts);
});

// Configure server
app.listen(5000, () => {
	console.log('**Started Posts api service');
});
