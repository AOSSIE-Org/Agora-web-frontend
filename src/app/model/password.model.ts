import { Deserializable } from './deserializable.model';

export class PasswordData implements Deserializable {
    password: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
