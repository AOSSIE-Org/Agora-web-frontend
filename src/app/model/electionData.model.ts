import { Deserializable } from "./deserializable.model";

//Model used to collect data when creating and editing elections
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
    noVacancies: number = 0;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}