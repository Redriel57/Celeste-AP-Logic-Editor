import Room from "./Room";
import Node from "./Node";
import Edge from "./Edge";
import { Coordinate } from "../interfaces";
import { Errors } from "../enums";

class Area {
  rooms: Room[];
  size: Coordinate;

  static fromString(json: string): Area | Errors {
    const data = JSON.parse(json);
    if (!data) return Errors.InvalidFormat;

    const newArea = new Area(data.size, data.savePath);

    for (const roomData of data.rooms) {
      const newRoom = Room.fromString(roomData);
      if (newRoom instanceof Room) newArea.addRoom(newRoom);
      else return newRoom;
    }

    return newArea;
  }

  constructor(size: Coordinate = { x: 0, y: 0 }, rooms: Room[] = []) {
    this.rooms = rooms;
    this.size = size;
  }

  addRoom(room: Room): Errors {
    if (this.getRoomByName(room.name)) return Errors.Duplicate;

    this.rooms.push(room);
    return Errors.None;
  }

  getRoomByName(name: string): Room {
    const room = this.rooms.filter((room) => room.name === name);
    return room[0];
  }

  hasRoom(name: string): boolean {
    return this.getRoomByName(name) !== null;
  }

  getElementAt({ x, y }: Coordinate): string | null {
    for (const room of this.rooms) {
      for (const node of room.nodes) {
        if (node.inBound(x, y)) return `${room.name} ${node.name}`;
      }
    }
    return null;
  }

  getAllNodes(): Node[] {
    return this.rooms.reduce<Node[]>((n, r) => n.concat(r.nodes), []);
  }

  getAllEdges(): Edge[] {
    return this.rooms.reduce<Edge[]>((n, r) => n.concat(r.edges), []);
  }

  toJSON(complete: boolean = false): string {
    const obj = complete
      ? { ...this, rooms: this.rooms.map((room: Room) => room.toJSON(true)) }
      : {};
    return JSON.stringify({ value: obj, space: 2 });
  }
}

export default Area;