//Model used to collect data when creatin and editing elections
export class ElectionData {
    constructor(
        private _name: string,
        private _description: string,
        private _candidates: string[],
        private _ballotVisibility: string,
        private _voterListVisibility: boolean,
        private _startingDate: Date,
        private _endingDate: Date,
        private _isInvite: boolean,
        private _isRealTime: boolean,
        private _votingAlgo: string,
        private _noVacancies: number
    ){}

    get name() {return this._name}
    get description() {return this._description}
    get startinDate() {return this._startingDate}
    get endingDate() {return this._endingDate}
    get isRealTime() {return this._isRealTime}
    get votingAlgo() {return this._votingAlgo}
    get candidates() {return this._candidates}
    get ballotVisibility() {return this._ballotVisibility}
    get voterListVisibility() {return this._voterListVisibility}
    get isInvite() {return this._isInvite}
    get noVacancies() {return this._noVacancies} 
}