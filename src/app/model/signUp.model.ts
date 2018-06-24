export class SignUp {
    constructor(private _identifier: string, private _password: string, private _email: string, private _firstName: string, private _lastName: string){}
    get identifier() {return this._identifier}
    get password() {return this._password}
    get email() {return this._email}
    get firstName() {return this._firstName}
    get lastName() {return this._lastName}
}