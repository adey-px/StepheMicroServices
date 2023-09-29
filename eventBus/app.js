import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

// Storage container for all incoming events
const events = [];

// API - Receive Event Data from Services, Distribute Back to ALL Services
/* use post method bcos it sent back as response */
app.post('/events', (req, res) => {
	const event = req.body;
	events.push(event);
	console.log(event);

	/* distribution pipeline to Post, Comment, Query & Admin */
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
	axios.post('http://localhost:5005/events', event).catch((err) => {
		if (err) {
			console.log(err);
		}
	});
	res.send({ status: 'OK' });
});

// API - Fetch, Synchronize All Incoming Events
app.get('/events', (req, res) => {
	res.send(events);
});

// Configure server
app.listen(5004, () => {
	console.log('**Started eventBus api service');
});
