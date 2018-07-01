import { Deserializable } from "./deserializable.model";

export class Ballot implements Deserializable {

    voteBallot: string;
    voterEmail: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}