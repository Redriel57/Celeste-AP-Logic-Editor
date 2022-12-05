import { Errors } from '../enums';
import { LogicCondition } from './LogicCondition';
import Node from './Node';

class Edge {
  originName: string;
  targetName: string;
  roomName: string;
  undirected: boolean;
  requirements: Array<LogicCondition> = [];

  static fromString(json: string): Edge | Errors {
    const data = JSON.parse(json);
    if (!data) return Errors.InvalidFormat;

    const newEdge = new Edge(data.origin, data.target, data.undirected);

    for (const reqData of data.requirements) {
      const newReq = LogicCondition.fromString(reqData);
      if (newReq instanceof LogicCondition) newEdge.requirements.push(newReq);
      else return newReq;
    }

    return newEdge
  }

  constructor(origin: Node, target: Node, undirected: boolean = false) {
    this.originName = origin.name;
    this.targetName = target.name;
    this.roomName = target.roomName;
    this.undirected = undirected;
  }

  toJSON(): string {
    return JSON.stringify({ value: this, space: 2 });
  }
}

export default Edge;