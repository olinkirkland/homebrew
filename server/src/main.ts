import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

app.post('/api/echo', (req, res) => {
    res.json({ data: req.body });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
