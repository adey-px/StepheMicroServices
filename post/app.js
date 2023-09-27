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
/** post is an id as key = {id, title}  */
const posts = {};

// API - Get all posts, forward to client
app.get('/posts', (req, res) => {
	res.send(posts);
});

// API - create new post
/* new post: id as key = {id, title} */
app.post('/posts', (req, res) => {
	const id = randomBytes(4).toString('hex');
	const { title } = req.body;
	posts[id] = {
		id,
		title,
	};
	/ send new post data to eventBus /
	axios
		.post('http://localhost:5004/events', {
			type: 'Post Created',
			data: {
				id,
				title,
			},
		})
		.catch((err) => {
			console.log('err');
		});
	/* send created Id key to posts {} */
	res.status(201).send(posts[id]);
});

// API - Receive data from eventBus
// Not doing anything about the data
app.post('/events', (req, res) => {
	console.log('Received data:', req.body.type);
	res.send({});
});

// Configure server
app.listen(5001, () => {
	console.log('**Started Posts api service');
});
