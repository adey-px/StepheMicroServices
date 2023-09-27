import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();

// Parse body of incoming request
app.use(express.json());

// Request handler across diff ports
app.use(cors());

// Empty array & object to store comments
const comments = [];
const commentsByPostId = {};

// API - Read comments by post Id, [] for none
app.get('/post/:id/comments', (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});

// API - Create comment by post Id
app.post('/post/:id/comments', (req, res) => {
	const randomId = randomBytes(4).toString('hex');
	const { content } = req.body;
	comments.push({ commentId: randomId, content, Status: 'Pending' });
	commentsByPostId[req.params.id] = comments;

	/ send new comment data to eventBus /;
	axios
		.post('http://localhost:5004/events', {
			type: 'Comment Created',
			data: {
				commentId: randomId,
				content: content,
				postId: req.params.id,
				status: 'Pending',
			},
		})
		.catch((err) => {
			console.log('err');
		});
	res.status(201).send(comments);
});

// API - Receive data from eventBus
// Not doing anything about the data
app.post('/events', (req, res) => {
	console.log('Received data:', req.body.type);
	res.send({});
});

// Configure server
app.listen(5002, () => {
	console.log('**Started Comment api service');
});
