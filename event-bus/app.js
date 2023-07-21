import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

// API - Event data distribution pipeline
app.post('/events', (req, res) => {
	const event = req.body;
	axios.post('http://localhost:5001', event).catch((err) => {
		if (err) {
			console.log(err);
		}
	});
	axios.post('http://localhost:5002', event).catch((err) => {
		if (err) {
			console.log(err);
		}
	});
	axios.post('http://localhost:5003', event).catch((err) => {
		if (err) {
			console.log(err);
		}
	});

	res.send({ status: 'OK' });
});

// Configure server
app.listen(5004, () => {
	console.log('**Started event-bus api service');
});
