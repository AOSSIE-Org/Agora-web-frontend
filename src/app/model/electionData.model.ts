import { Deserializable } from "./deserializable.model";

//Model used to collect data when creatin and editing elections
export class ElectionData implements Deserializable {

    name: string;
    description: string;
    candidates: string[];
    ballotVisibility: string;
    voterListVisibility: boolean;
    startingDate: Date;
    endingDate: Date;
    isInvite: boolean;
    isRealTime: boolean;
    votingAlgo: string;
    noVacancies: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}