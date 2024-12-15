import { Individual } from '../../Individual';
import { Strategy } from '../Strategy';

export abstract class CompaireDecorator implements Strategy {
    protected next: Strategy;
    
    constructor(next: Strategy) {
        this.next = next;
    }

    abstract compare(bestPair: Individual[]): Individual;

    match(individual: Individual, candidates: Individual[]): Individual {
        return this.next.match(individual, candidates, this.compare.bind(this));
    }
}
