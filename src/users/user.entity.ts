import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(private readonly _email: string, private readonly _name: string, password?: string) {
		if (password) {
			this._password = password;
		}
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: string): Promise<void> {
		this._password = await hash(pass, Number(salt));
	}

	public async comparePassword(password: string): Promise<boolean> {
		return compare(password, this._password);
	}
}
