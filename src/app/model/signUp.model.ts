import { Deserializable } from './deserializable.model';

export class SignUp implements Deserializable {

    identifier: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
