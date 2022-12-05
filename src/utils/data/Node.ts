import Room from './Room';
import LocatedItem from './LocatedItem';
import { Errors } from '../enums';

class Node extends LocatedItem {
  isStart: boolean;
  isSpawnpoint: boolean;
  roomName: string;

  static fromString(json: string, room: Room): Node | Errors {
    const data = JSON.parse(json);
    if (!data) return Errors.InvalidFormat;

    return new Node(data.name, data.pos.x, data.pos.y, data.size.x, data.size.y, room.name);
  }

  constructor(name: string, x: number, y: number, width: number, height: number, roomName: string) {
    super(name, x, y, width, height);
    this.isStart = false;
    this.isSpawnpoint = false;
    this.roomName = roomName;
  }

  toJSON(): string {
    return JSON.stringify({ value: this, space: 2 });
  }
}

export default Node;