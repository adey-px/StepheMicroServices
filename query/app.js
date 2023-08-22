import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Container for posts & comments
const posts = {};

// API -
app.get('/posts', (req, res) => {
	res.send(posts);
});

// API - Receive data from eventBus
/* Get both post & associated comments */
app.post('/events', (req, res) => {
	const { type, data } = req.body;
	console.log(`${type}, ${data}`);

	if (type === 'Post Created') {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	}
	if (type === 'Comment Created') {
		const { id, content, postId } = data;
		const post = posts[postId];
		post.comments.push({ id, content });
	}
	res.send({});
});

// Configure server
app.listen(5003, () => {
	console.log('**Started Query api service');
});
