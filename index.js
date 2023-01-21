import express from 'express';

const port = 8000;
const app = express();

app.all('/hello', (req, res, next) => {
	console.log('All');
	next();
});

const cb = (req, res, next) => {
	console.log('CB');
	next();
}

app.route('/user')
	.get('/hello', (req, res) => {
		res.send('Hi GET!');
	})
	.post('/hello', (req, res) => {
		res.send('Hi Post!');
	});

app.listen(port, () => {
    console.log(`Server run on http://localhost:${port}`);
});