export class Ballot {
    constructor(private _voteBallot: string, private _voterEmail: string){}

    get voteBallot() {return this._voteBallot}
    get voterEmail() {return this._voterEmail}

}