import { Optional } from "@angular/core";

export class User {
    private _fullName: string;
    constructor(
    private _userName: string,
    private _email: string,
    private _firstName: string,
    private _lastName: string,
    private _avatarURL?: string
    ){this._fullName = this._firstName + ' ' + this._lastName}

    get fullName() {return this._fullName}
    get userName() {return this._userName}
    get email() {return this._email}
    get avatarURL() {return this._avatarURL}
}