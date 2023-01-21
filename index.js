import express from 'express';

const port = 8000;
const app = express();

app.get('/hello', (req, res) => {
    res.send('hi');
});

app.listen(port, () => {
    console.log(`Server run on http://localhost:${port}`);
});