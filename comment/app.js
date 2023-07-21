import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';

const app = express();

// Parse body of incoming post request
app.use(express.json());

// Handle requests across diff ports
app.use(cors());

// Empty object to store comments
const commentsByPostId = {};

// Create comment by post Id
/* find comments by post Id passed in url, empty array for none, 
	push new comment obj into the array, assign it to the post Id */
app.post('/posts/:id/comments', (req, res) => {
	const commentId = randomBytes(4).toString('hex');
	const { content } = req.body;
	const comments = commentsByPostId[req.params.id] || [];

	comments.push({ id: commentId, content });
	commentsByPostId[req.params.id] = comments;
	res.status(201).send(comments);
});

// Read comments assigned to post Id, empty array for none
app.get('/posts/:id/comments', (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});

// Configure server
app.listen(5002, () => {
	console.log('**Started Comments api service');
});
