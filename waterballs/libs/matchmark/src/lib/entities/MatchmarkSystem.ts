import { Individual, IndividualProps } from './Individual';
import { DistanceBasedStrategy } from './strategies/DistanceBasedStrategy';
import { Strategy } from './strategies/Strategy';

export class MatchmarkSystem {
  private individuals: Individual[];
  private strategy: Strategy;

  //偷個懶 方便我寫測試
  constructor(props: IndividualProps[]) {
    this.individuals = props.map(prop => new Individual(prop));
    this.strategy = new DistanceBasedStrategy();
  }

  public setStrategy(strategy: Strategy): this {
    this.strategy = strategy;
    return this;
  }

  public match(individual: Individual): Individual {
    if (this.individuals.length <= 1) {
      throw new Error('你很衰 現在沒人可以配對！');
    }

    if (!this.strategy) {
      throw new Error('請先設定配對策略！');
    }

    // 去除自己 能配對的人
    const candidates = this.individuals.filter(i => i.id !== individual.id);
    if (candidates.length === 0) {
      throw new Error('除了你 沒人可以配得上你了');
    }

    return this.strategy.match(individual, candidates);
  }
}