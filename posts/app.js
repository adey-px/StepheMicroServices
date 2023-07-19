import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';

// Instance of server
const app = express();

// Parse body of post request
// newly replaced by express.json
app.use(bodyParser.json());

// Empty object to store posts
const posts = {};

// API to get all posts
app.get('/posts', (req, res) => {
	res.send(posts);
});

// API to create new posts
app.post('/posts', (req, res) => {
	const id = randomBytes(4).toString('hex');
	const { title } = req.body;

	posts[id] = {
		id,
		title,
	};
	res.status(201).send(posts[id]);
});

// Configure server
app.listen(5000, () => {
	console.log('**Started development server');
});
