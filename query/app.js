import express from 'express';
import cors from 'cors';

// Instance of server
const app = express();

// Parse body of incoming request
app.use(express.json());

// Handle requests across diff ports
app.use(cors());

// Container for posts & comments
const posts = {};

// API - Get all posts for client service
app.get('/posts', (req, res) => {
	res.send(posts);
});

// API - Handle incoming data from eventBus
app.post('/events', (req, res) => {
	const { type, data } = req.body;
	console.log(`${type}, ${data}`);

	/* get post data by postId */
	if (type === 'Post Created') {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	}
	/* get comments data by postId */
	if (type === 'Comment Created') {
		const { commentId, content, postId, status } = data;
		const post = posts[postId];
		post.comments.push({ commentId, content, status });
	}
	/* get updated comments data */
	if (type === 'Comment Updated') {
		const { commentId, content, postId, status } = data;
		const post = posts[postId];
		const comment = post.comments.find((comment) => {
			return comment.commentId === commentId;
		});
		comment.content = content;
		comment.status = status;
	}
	res.send({});
});

// Configure server
app.listen(5003, () => {
	console.log('**Started Query api service');
});
