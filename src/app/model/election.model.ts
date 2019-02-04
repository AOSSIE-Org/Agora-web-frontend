import { Optional } from '@angular/core';
import { Ballot, BallotType } from './ballot.model';
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
    winners: Winner[] = new Array();
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
    ballotType: BallotType;
}

export const VOTING_ALGORITHMS: Algorithm[] = [
    {value: 'Oklahoma', description: 'Oklahoma', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'RangeVoting', description: 'RangeVoting', link: '', ballotType: BallotType.ScoreBallot},
    {value: 'RankedPairs', description: 'RankedPairs', link: '', ballotType: BallotType.RankBallot},
    {value: 'SAV', description: 'Satisfaction Approval Voting', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'Sequential Proportional Approval voting', description: 'Sequential Proportional Approval voting', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'SmithSet', description: 'SmithSet', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'Approval', description: 'Approval', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'Exhaustive ballot', description: 'Exhaustive ballot', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'Baldwin', description: 'Baldwin', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'Exhaustive ballot with dropoff', description: 'Exhaustive ballot with dropoff', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'Uncovered Set', description: 'Uncovered Set', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'Copeland', description: 'Copeland', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'Minimax Condorcet', description: 'Minimax Condorcet', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'Random Ballot', description: 'Random Ballot', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'Borda', description: 'Borda', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'Kemeny-Young', description: 'Kemeny Young', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'Nanson', description: 'Nanson', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'Instant Runoff 2-round', description: 'Instant Runoff 2-round', link: '', ballotType: BallotType.PreferenceBallot},
    {value: 'Contingent Method', description: 'Contingent Method', link: '', ballotType: BallotType.PreferenceBallot},
];
