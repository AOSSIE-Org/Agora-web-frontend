import { Deserializable } from './deserializable.model';

export class BallotData implements Deserializable {
    ballotInput: string;
    passCode: string;
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
