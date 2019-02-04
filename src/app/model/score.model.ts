import { Deserializable } from './deserializable.model';

export class Score implements Deserializable {
    numerator: number;
    denominator: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
