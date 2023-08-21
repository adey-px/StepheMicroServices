import express, { json } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(json());

app.get('/posts', (req, res) => {});

// API - receive event from event bus
app.post('events/', (req, res) => {});

app.listen(5003, () => {
	console.log('**Started Query api service');
});
