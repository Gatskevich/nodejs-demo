import express from 'express';

const userRouter = express.Router();

router.get('/login', (req, res) => {
    res.send('login');
});

router.post('/register', (req, res) => {
    res.send('register');
});

export { userRouter };