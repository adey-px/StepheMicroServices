import express from 'express';
import cors from 'cors';
import axios from 'axios'

// Instance of server
const app = express();

// Parse body of incoming request
app.use(express.json());

// Handle requests across diff ports
app.use(cors());

// Storage container for aLL posts & comments
const posts = {};

// API - Get all posts for client service
app.get('/posts', (req, res) => {
	res.send(posts);
});

// Event handler, Use in API & Server Fetch Below
/* first get post by postId, assign to posts {} */
const eventHandler = (type, data) => {
	if (type === 'Post Created') {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	}
	/* get comments by postId, assign to posts {} */
	if (type === 'Comment Created') {
		const { commentId, content, postId, status } = data;
		const post = posts[postId];
		post.comments.push({ commentId, content, status });
	}
	/* get comment status, update & assign back */
	if (type === 'Comment Updated') {
		const { commentId, content, postId, status } = data;
		const post = posts[postId];
		const comment = post.comments.find((comment) => {
			return comment.commentId === commentId;
		});
		comment.content = content;
		comment.status = status;
	}
};

// API - Receive, Handle Incoming Event from EventBus
/* use post method bcos it sent back as response */
app.post('/events', (req, res) => {
	const { type, data } = req.body;
	eventHandler(type, data);
	res.send({});
});

// Configure server, Fetch aLL events from EventBus
/* reach out to EventBus, get aLL events that occur */
app.listen(5003, async () => {
	console.log('**Started Query api service');
	try {
		const res = await axios.get('http://localhost:5004/events');
		for (let event of res.data) {
			console.log('Processing event:', event.type);
			eventHandler(event.type, event.data);
		}
	} catch (error) {
		console.log(error.message);
	}
});
