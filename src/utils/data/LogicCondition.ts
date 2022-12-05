import { Difficulty, Errors } from "../enums";

class LogicCondition {
  difficulty: Difficulty;
  minDash: number = 0;


  static fromString(json: string): LogicCondition | Errors {
    const data = JSON.parse(json);
    if (!data) return Errors.InvalidFormat;

    return new LogicCondition(data.difficulty);
  }

  constructor(difficulty: Difficulty) {
    this.difficulty = difficulty;
  }

  toJSON(): string {
    return JSON.stringify({ value: this, space: 2 });
  }
}

export { LogicCondition  }