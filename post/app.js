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

// API - create new posts
app.post('/posts', (req, res) => {
	const id = randomBytes(4).toString('hex');
	const { title } = req.body;
	
	/* key id = {id, title} */
	posts[id] = {
		id,
		title,
	};
	res.status(201).send(posts[id]);
});

// API - get all posts
app.get('/posts', (req, res) => {
	res.send(posts);
});

// Configure server
app.listen(5001, () => {
	console.log('**Started Posts api service');
});
