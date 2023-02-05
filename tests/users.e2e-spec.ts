import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register_error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: 'e@wee.com', password: '1' });
		expect(res.statusCode).toBe(422);
	});

	it('Login_success', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'ddvb@djwef.com', password: 'sdsdvd' });
		expect(res.body.jwt).not.toBeUndefined();
	});

	it('Login_error', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'ddvb@djwef.com', password: '1' });
		expect(res.statusCode).toBe(401);
	});

	it('Info_success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'ddvb@djwef.com', password: 'sdsdvd' });
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(res.body.email).toBe('ddvb@djwef.com');
	});

	it('Info_error', async () => {
		const res = await request(application.app).get('/users/info').set('Authorization', `Bearer 1`);
		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
