import { Individual } from '../../Individual';
import { CompaireDecorator } from './CompaireDecorator';

export class RevertDecorator extends CompaireDecorator {
    compare(bestPair: Individual[]): Individual {
        return bestPair[bestPair.length - 1];
    }
}
