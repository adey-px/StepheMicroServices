import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();

// Parse body of incoming post request
app.use(express.json());

// Handle requests across diff ports
app.use(cors());

// Empty object to store comments
const commentsByPostId = {};

// API - Read comments by post Id, [] for none
app.get('/posts/:id/comments', (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});

/* API - Create comment by post Id
- find comments by post Id passed in url, empty array for none 
- push new comment obj into the array, assign it to the post Id 
- comment is by id, its content & associated post
- send data to event-bus service
*/
app.post('/posts/:id/comments', (req, res) => {
	const commentId = randomBytes(4).toString('hex');
	const { content } = req.body;
	const comments = commentsByPostId[req.params.id] || [];

	comments.push({ id: commentId, content });
	commentsByPostId[req.params.id] = comments;
	axios
		.post('http://localhost:5004/events', {
			type: 'Comment Created',
			data: {
				commentId,
				content,
				postId: req.params.id,
			},
		})
		.catch((err) => {
			console.log('err');
		});
	res.status(201).send(comments);
});

// API - Receive data from eventBus
app.post('/events', (req, res) => {
	console.log('Received event data:', req.body.type);
	res.send({});
});

// Configure server
app.listen(5002, () => {
	console.log('**Started Comments api service');
});
