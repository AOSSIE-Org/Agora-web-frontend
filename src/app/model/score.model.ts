export class Score{
    constructor(private _numerator: number, private _denominator: number){}
    get numerator() {return this._numerator}
    get denominator() {return this._denominator}
}