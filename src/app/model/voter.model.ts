export class Voter{
    constructor(private _name: string, private _email: string){}

    get name() {return this._name}
    get email() {return this._email}
}