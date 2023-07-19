import express from 'express';
import { randomBytes } from 'crypto';

const app = express();
app.use(express.json());

// Empty object to store comments
const commentsByPostId = {};

// Create comment by post Id
/* check for comment by postId passed in url, empty array for none, 
	push the new comment into the array, assign it to the postId */
app.post('/post/:pid/new-comment', (req, res) => {
	const commentId = randomBytes(4).toString('hex');
	const { content } = req.body;
	const comment = commentsByPostId[req.params.pid] || [];
	
	comment.push({ id: commentId, content });
	commentsByPostId[req.params.pid] = comment;
	res.status(201).send(comment);
});

// Read comments by post Id
app.get('/post/:pid/comments', (req, res) => {
	res.send(commentsByPostId[req.params.pid] || []);
});

// Configure server
app.listen(5200, () => {
	console.log('**Started Comments api service');
});
