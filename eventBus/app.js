import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

// API - Event data distribution pipeline
/* Send data to Post, Comment & Query services */
app.post('/events', (req, res) => {
	const event = req.body;
	console.log(event);
	axios.post('http://localhost:5001/events', event).catch((err) => {
		if (err) {
			console.log(err);
		}
	});
	axios.post('http://localhost:5002/events', event).catch((err) => {
		if (err) {
			console.log(err);
		}
	});
	axios.post('http://localhost:5003/events', event).catch((err) => {
		if (err) {
			console.log(err);
		}
	});
	res.send({ status: 'OK' });
});

// Configure server
app.listen(5004, () => {
	console.log('**Started eventBus api service');
});
