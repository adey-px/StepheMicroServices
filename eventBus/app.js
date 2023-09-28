import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

// API - Event Data Distribution Pipeline, send back events data received
/* Send all events data received, back to Post, Comment, Query & Admin */
app.post('/events', (req, res) => {
	const events = req.body;
	console.log(events);
	axios.post('http://localhost:5001/events', events).catch((err) => {
		if (err) {
			console.log(err);
		}
	});
	axios.post('http://localhost:5002/events', events).catch((err) => {
		if (err) {
			console.log(err);
		}
	});
	axios.post('http://localhost:5003/events', events).catch((err) => {
		if (err) {
			console.log(err);
		}
	});
	axios.post('http://localhost:5005/events', events).catch((err) => {
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
