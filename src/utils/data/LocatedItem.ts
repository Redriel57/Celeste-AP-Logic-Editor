import { Coordinate } from "../interfaces";

class LocatedItem {
  name: string;
  pos: Coordinate;
  size: Coordinate;
  endPos: Coordinate;

  constructor(name: string, x: number, y: number, width: number, height: number) {
    this.name = name;
    this.pos = { x: x, y: y };
    this.size = { x: width, y: height };
    this.endPos = { x: x + width, y: y + width };
  }

  inBound(x: number, y: number) {
    const checkX = x >= this.pos.x && x <= this.endPos.x;
    const checkY = y >= this.pos.y && y <= this.endPos.y;
    return checkX && checkY;
  }
}

export default LocatedItem;