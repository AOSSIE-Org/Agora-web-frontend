import { Score } from './score.model';
import { Candidate } from './candidate.model';
export class Winner {
    constructor(private _candidate: Candidate, private _score: Score){}
    get candidate() {return this._candidate}
    get score() {return this._score}
}