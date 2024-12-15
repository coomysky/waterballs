import { Individual } from '../../Individual';
import { CompaireDecorator } from './CompaireDecorator';

export class RevertDecorator extends CompaireDecorator {
    compare(bestPair: Individual[]): Individual {
        // 選擇排序最後一個
        return bestPair[bestPair.length - 1];
    }
}
