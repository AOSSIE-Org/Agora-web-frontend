import { Deserializable } from './deserializable.model';
import { JwtToken } from './jwtToken.model';

export class User implements Deserializable {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarURL?: string;
    token?: JwtToken;

    deserialize(input: any): this {
        Object.assign(this, input);
        this.token = new JwtToken().deserialize(input.token);
        return this;
    }

    fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}
