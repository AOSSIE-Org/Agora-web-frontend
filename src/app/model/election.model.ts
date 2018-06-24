import { Optional } from '@angular/core';
import { Ballot } from './ballot.model';
import { Voter } from './voter.model';
import { Winner } from './winner.model';

export class Election {
    constructor(
        private _name: string,
        private _description: string,
        private _creatorName: string,
        private _creatorEmail: string,
        private _start: Date,
        private _end: Date,
        private _reailtimeResult: boolean,
        private _votingAlgo: string,
        private _candidates: string[],
        private _ballotVisibility: string,
        private _voterListVisibility: boolean,
        private _isInvite: boolean,
        private _isCompleted: boolean,
        private _isStarted: boolean,
        private _createdTime: Date,
        private _adminLink: String,
        private _inviteCode: string,
        private _ballots: Ballot[],
        private _voters: Voter[],
        private _winners: Winner[],
        private _isCounted: boolean,
        private _noVacancies: number,
        private _id?: string
    ){}

    get id()  {return this._id}
    get name() {return this._name}
    get description() {return this._description}
    get creatorName() {return this._creatorName}
    get creatorEmail() {return this._creatorEmail}
    get start() {return this._start}
    get end() {return this._end}
    get realtimeResult() {return this._reailtimeResult}
    get votingAlgo() {return this._votingAlgo}
    get candidate() {return this._candidates}
    get ballotVisibility() {return this._ballotVisibility}
    get voterListVisibility() {return this._voterListVisibility}
    get isInvite() {return this._isInvite}
    get isCompleted() {return this._isCompleted}
    get isStarted() {return this._isStarted}
    get createdTime() {return this._createdTime}
    get adminLink() {return this._adminLink}
    get invitecode() {return this._inviteCode}
    get ballots() {return this._ballots}
    get voters() {return this._voters}
    get winners() {return this._winners}
    get isCounted() {return this._isCounted}
    get noVacancies() {return this._noVacancies} 
}