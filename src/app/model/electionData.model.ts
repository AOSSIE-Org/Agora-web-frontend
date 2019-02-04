import { Deserializable } from './deserializable.model';
import { Ballot } from './ballot.model';


// Model used to collect data when creating and editing elections
export class ElectionData implements Deserializable {

    name: string;
    description: string;
    candidates: string[] = new Array();
    ballotVisibility: string;
    voterListVisibility: boolean;
    startingDate: string;
    endingDate: string;
    isInvite: boolean;
    isRealTime: boolean;
    votingAlgo: string;
    noVacancies = 0;
    ballot: Ballot[] = new Array();

    deserialize(input: any): this {
        Object.assign(this, input);
        this.ballot = input.ballot.map((ballot: Ballot) => new Ballot().deserialize(ballot));
        return this;
    }
}
