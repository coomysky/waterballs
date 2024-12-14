export type Gender = 'MALE' | 'FEMALE';

export interface Coord {
  x: number;
  y: number;
}

export interface IndividualProps {
  id: number;
  gender: Gender;
  age: number;
  intro: string;
  habits: string[];
  coord: Coord;
}

export class Individual implements IndividualProps {
  private _id: number;
  private _gender: Gender;
  private _age: number;
  private _intro: string;
  private _habits: string[];
  private _coord: Coord;

  constructor(props: IndividualProps) {
    
    if (props.id <= 0) {
      throw new Error('ID must be a positive number');
    }
    if (props.gender !== 'MALE' && props.gender !== 'FEMALE') {
      throw new Error('Gender must be either "MALE" or "FEMALE"');
    }
    if (props.age < 18) {
      throw new Error('超過18再來吧');
    }
    if (props.intro.length > 200) {
      throw new Error('介紹簡潔有力一點, 0-200 就好');
    }
    if (props.habits.some(habit => habit.length > 10)) {
      throw new Error('每個興趣不能超過10個字');
    }
    if (props.coord.x === undefined || props.coord.y === undefined) {
      throw new Error('座標的 x 和 y 都需要有值');
    }

    this._id = props.id;
    this._gender = props.gender;
    this._age = props.age;
    this._intro = props.intro;
    this._habits = props.habits.filter(habit => habit.trim() !== '');
    this._coord = props.coord;
  }

  get id(): number {
    return this._id;
  }

  get gender(): Gender {
    return this._gender;
  }

  get age(): number {
    return this._age;
  }

  get intro(): string {
    return this._intro;
  }

  get habits(): string[] {
    return [...this._habits];
  }

  get coord(): Coord {
    return { ...this._coord };
  }
}