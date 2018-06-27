import { Deserializable } from "./deserializable.model";

export class JwtToken implements Deserializable {
    token: string;
    expiresOn: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}