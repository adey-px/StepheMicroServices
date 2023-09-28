import express from 'express';
import axios from 'axios';

const app = express();

// Parse body of incoming post request
app.use(express.json());

// API - Handle incoming data from eventBus
app.post('/events', async (req, res) => {
	const { type, data } = req.body;
	if (type === 'Comment Created') {
		const status = data.content.includes('red') ? 'Rejected' : 'Approved';

		/* send comment status update to eventBus */
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
