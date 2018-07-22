import { Optional } from "@angular/core";
import { Deserializable } from "./deserializable.model";

export class User implements Deserializable {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarURL?: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    fullName() {
        return this.firstName + " " + this.lastName;
    }
}