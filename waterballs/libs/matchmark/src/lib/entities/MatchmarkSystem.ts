import { Individual, IndividualProps } from './Individual';
import { Strategy } from './strategies/Strategy';

export class MatchmarkSystem {
  private individuals: Individual[];

  //偷個懶 方便我寫測試
  constructor(props: IndividualProps[]) {
    this.individuals = props.map(prop => new Individual(prop));
  }

  match(individual: Individual, strategy: Strategy): Individual {
    if (this.individuals.length <= 1) {
      throw new Error('你很衰 現在沒人可以配對！');
    }

    // 去除自己 能配對的人
    const candidates = this.individuals.filter(i => i.id !== individual.id);
    if (candidates.length === 0) {
      throw new Error('除了你 沒人可以配得上你了');
    }

    return strategy.match(individual, candidates);
  }
}   