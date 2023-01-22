import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './users/users.js'

const port = 8000;
const app = express();

app.all('/hello', (req, res, next) => {
	console.log('All');
	next();
});

app.use('/users', userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.log(err.message);
	res.status(401).send(err.message);
});

app.listen(port, () => {
    console.log(`Server run on http://localhost:${port}`);
});