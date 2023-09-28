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
app.get('/post/:postId/comments', (req, res) => {
	res.send(commentsByPostId[req.params.postId] || []);
});

// API - Create comment by post Id
app.post('/post/:postId/comments', (req, res) => {
	const randomId = randomBytes(4).toString('hex');
	const { content } = req.body;
	comments.push({ commentId: randomId, content, Status: 'Pending' });
	commentsByPostId[req.params.postId] = comments;

	/* send new comment data to eventBus */ axios
		.post('http://localhost:5004/events', {
			type: 'Comment Created',
			data: {
				commentId: randomId,
				content: content,
				postId: req.params.postId,
				status: 'Pending',
			},
		})
		.catch((err) => {
			console.log('err');
		});
	res.status(201).send(comments);
});

// API - Handle incoming data from eventBus
app.post('/events', async (req, res) => {
	console.log('Received data:', req.body.type);
	const { type, data } = req.body;

	/* update comment status by postId */
	if (type === 'Created Comment') {
		const { commentId, content, postId, status } = data;
		const comments = commentsByPostId[postId];
		const comment = comments.find((comment) => {
			return comment.commentId === commentId;
		});
		comment.status = status;

		/* send updated comment to eventBus */
		await axios.post('http://localhost:5004/events', {
			type: 'Comment Updated',
			data: {
				commentId,
				content,
				postId,
				status,
			},
		});
	}
	res.send({});
});

// Configure server
app.listen(5002, () => {
	console.log('**Started Comment api service');
});
