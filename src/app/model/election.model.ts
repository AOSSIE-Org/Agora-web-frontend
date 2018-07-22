import { Optional } from '@angular/core';
import { Ballot } from './ballot.model';
import { Voter } from './voter.model';
import { Winner } from './winner.model';
import { Deserializable } from './deserializable.model';

export class Election implements Deserializable {

    _id: string;
    name: string;
    description: string;
    creatorName: string;
    creatorEmail: string;
    start: string;
    end: string;
    realtimeResult: boolean;
    votingAlgo: string;
    candidates: string[] = new Array();
    ballotVisibility: string;
    voterListVisibility: boolean;
    isInvite: boolean;
    isCompleted: boolean;
    isStarted: boolean;
    createdTime: string;
    adminLink: String;
    inviteCode: string;
    ballots: Ballot[] = new Array();
    voters: Voter[] = new Array();
    winners: Winner[]= new Array();
    isCounted: boolean;
    noVacancies: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        this.candidates = input.candidates.map((candidate: string) => candidate);
        this.ballots = input.ballot.map((ballot: Ballot) => new Ballot().deserialize(ballot));
        this.voters = input.voterList.map((voter: Voter) => new Voter().deserialize(voter));
        this.winners = input.winners.map((winner: Winner) => new Winner().deserialize(winner));
        return this;
    }
}

declare interface Algorithm {
    value: string;
    description: string;
    link: string;
}

export const VOTING_ALGORITHMS: Algorithm[] = [
    {value: "Oklahoma", description: "Oklahoma", link: ""},
    {value: "SAV", description: "Satisfaction Approval Voting", link: ""},
    {value: "Sequential Proportional Approval voting", description: "Sequential Proportional Approval voting", link: ""},
    {value: "SmithSet", description: "SmithSet", link: ""},
    {value: "Approval", description: "Approval", link: ""},
    {value: "Exhaustive ballot", description: "Exhaustive ballot", link: ""},
    {value: "Baldwin", description: "Baldwin", link: ""},
    {value: "Exhaustive ballot with dropoff", description: "Exhaustive ballot with dropoff", link: ""},
    {value: "Uncovered Set", description: "Uncovered Set", link: ""},
    {value: "Copeland", description: "Copeland", link: ""},
    {value: "Minimax Condorcet", description: "Minimax Condorcet", link: ""},
    {value: "Random Ballot", description: "Random Ballot", link: ""},
    {value: "Borda", description: "Borda", link: ""},
    {value: "Kemeny-Young", description: "Kemeny Young", link: ""},
    {value: "Nanson", description: "Nanson", link: ""},
    {value: "Instant Runoff 2-round", description: "Instant Runoff 2-round", link: ""},
    {value: "Contingent Method", description: "Contingent Method", link: ""},
    {value: "Coomb’s", description: "Coomb’s", link: ""},
]