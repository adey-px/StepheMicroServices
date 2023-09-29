import express from 'express';
import axios from 'axios';

const app = express();

// Parse body of incoming request
app.use(express.json());

// API - Receive, Handle Incoming Event from EventBus
/* use post method bcos it sent back as response */
app.post('/events', async (req, res) => {
	const { type, data } = req.body;

	/* moderate comment status, send back to eventBus */
	if (type === 'Comment Created') {
		const status = data.content.includes('red') ? 'Rejected' : 'Approved';
		await axios.post('http://localhost:5004/events', {
			type: 'Comment Updated',
			data: {
				commentId: data.commentId,
				content: data.content,
				postId: data.postId,
				status,
			},
		});
	}
	res.send({});
});

app.listen('5005', () => {
	console.log('**Started Admin moderation service');
});
