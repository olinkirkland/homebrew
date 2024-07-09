import bodyParser from 'body-parser';
import express from 'express';
import { routes } from './config/routes';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', routes); // Assuming all routes are prefixed with '/api'

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
