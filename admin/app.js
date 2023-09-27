import express from 'express';
import axios from 'axios';

const app = express();

// Parse body of incoming post request
app.use(express.json());

app.post('/events', (req, res) => {});

app.listen('5005', () => {
  console.log('**Started Admin moderation service')
})