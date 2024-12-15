import { Individual } from '../Individual';

export interface Strategy {
  match(individual: Individual, candidates: Individual[], compare?: (bestPair: Individual[]) => Individual): Individual;
}
