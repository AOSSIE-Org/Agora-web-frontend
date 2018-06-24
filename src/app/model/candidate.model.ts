export class Candidate {
    constructor(private _name: string, private _id?: number, private _party?: string){}
    get name() {return this._name}
}