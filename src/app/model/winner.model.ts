import { Score } from './score.model';
import { Candidate } from './candidate.model';
import { Deserializable } from './deserializable.model';

export class Winner implements Deserializable {
    candidate: Candidate;
    score: Score;

    deserialize(input: any): this {
        Object.assign(this, input);
        this.candidate = new Candidate().deserialize(input.candidate);
        this.score = new Score().deserialize(input.score);
        return this;
    }
}
