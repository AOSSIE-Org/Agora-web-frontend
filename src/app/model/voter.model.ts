import { Deserializable } from './deserializable.model';

export class Voter implements Deserializable {
    name: string;
    email: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
