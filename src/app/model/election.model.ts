import { Optional } from '@angular/core';
import { Ballot } from './ballot.model';
import { Voter } from './voter.model';
import { Winner } from './winner.model';
import { Deserializable } from './deserializable.model';

export class Election implements Deserializable {

    name: string;
    description: string;
    creatorName: string;
    creatorEmail: string;
    start: Date;
    end: Date;
    reailtimeResult: boolean;
    votingAlgo: string;
    candidates: string[];
    ballotVisibility: string;
    voterListVisibility: boolean;
    isInvite: boolean;
    isCompleted: boolean;
    isStarted: boolean;
    createdTime: Date;
    adminLink: String;
    inviteCode: string;
    ballots: Ballot[];
    voters: Voter[];
    winners: Winner[];
    isCounted: boolean;
    noVacancies: number;
    id?: string;


    deserialize(input: any): this {
        Object.assign(this, input);
        this.ballots = input.ballots.map((ballot: Ballot) => new Ballot().deserialize(ballot));
        this.voters = input.voters.map((voter: Voter) => new Voter().deserialize(voter));
        this.winners = input.winners.map((winner: Winner) => new Winner().deserialize(winner));
        return this;
    }
}