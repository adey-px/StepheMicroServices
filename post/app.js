import express from 'express';
import { randomBytes } from 'crypto';
import axios from 'axios';
import cors from 'cors';

// Instance of server
const app = express();

// Parse body of incoming post request
app.use(express.json());

// Handle requests across diff ports
app.use(cors());

// Empty object to store posts
const posts = {};

// API - create new post
app.post('/posts', (req, res) => {
	const id = randomBytes(4).toString('hex');
	const { title } = req.body;

	/* new post: id as key = {id, title} */
	posts[id] = {
		id,
		title,
	};

	/* send event data to event-bus api service */
	axios
		.post('http://localhost:5004/events')
		.then({
			type: 'Post Created',
			data: {
				id,
				title,
			},
		})
		.catch((err) => {
			console.log('err');
		});

	/* send new Id to posts object  */
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
