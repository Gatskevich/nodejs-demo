import 'reflect-metadata';
import { UserModel } from '@prisma/client';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import { UserService } from './users.service';
import { IUserService } from './users.service.interface';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		createdUser = await usersService.createUser({
			email: 'df@d.com',
			name: 'Alex',
			password: '1',
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1');
	});

	it('validateUser', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const existedUser = await usersService.validateUser({
			email: 'df@d.com',
			password: '1',
		});
		expect(existedUser).toBeTruthy();
	});

	it('validateUser_wrong_password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const existedUser = await usersService.validateUser({
			email: 'df@d.com',
			password: '2',
		});
		expect(existedUser).toBeFalsy();
	});

	it('validateUser_wrong_email', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const existedUser = await usersService.validateUser({
			email: 'df@wfd.com',
			password: '1',
		});
		expect(existedUser).toBeFalsy();
	});
});
