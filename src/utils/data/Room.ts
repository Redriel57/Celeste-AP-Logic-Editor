import LocatedItem from "./LocatedItem";
import Node from './Node';
import Edge from './Edge';
import { Errors } from "../enums";

class Room extends LocatedItem {
  imgPath: HTMLImageElement;
  nodes: Array<Node>;
  edges: Array<Edge>;

  static fromString(json: string): Room | Errors {
    const data = JSON.parse(json);
    if (!data) return Errors.InvalidFormat;

    const newRoom = new Room(data.name, data.pos.x, data.pos.y, data.size.x, data.size.y, data.imgPath);

    for (const nodeData of data.nodes) {
      const newNode = Node.fromString(nodeData, newRoom);
      if (newNode instanceof Node) newRoom.addNode(newNode);
      else return newNode;
    }
    for (const edgeData of data.edges) {
      const newEdge = Edge.fromString(edgeData);
      if (newEdge instanceof Edge) newRoom.addEdge(newEdge);
      else return newEdge;
    }

    return newRoom;
  }

  constructor(name: string, x: number, y: number, width: number, height: number, imgPath: HTMLImageElement) {
    super(name, x, y, width, height);
    this.nodes = [];
    this.edges = [];
    this.imgPath = imgPath;
  }

  addNode(node: Node): Errors {
    if (this.getNodeByName(node.name)) return Errors.Duplicate;
    
    this.nodes.push(node);
    return Errors.None;
  }

  removeNode(node: Node): void {
    const index = this.nodes.indexOf(node);
    if (index === -1) return;
    this.nodes.splice(index, 1);

    const brokenEdges = this.edges.filter((e) => e.originName === node.name || e.targetName === node.name);
    for (const e of brokenEdges) this.edges.splice(this.edges.indexOf(e), 1);
  }

  addEdge(edge: Edge): Errors {
    if (this.getEdge(edge.originName, edge.targetName)) return Errors.Duplicate;
    
    this.edges.push(edge);
    return Errors.None;
  }

  removeEdge(edge: Edge): void {
    const index = this.edges.indexOf(edge);
    if (index === -1) return;
    this.nodes.splice(index, 1);
  }

  getNodeByName(name: string): Node | null {
    const node = this.nodes.filter((node) => node.name === name);

    if (node.length === 0) return null;
    return node[0];
  }

  hasNode(name: string): boolean {
    const node = this.nodes.filter((node) => node.name === name);

    return node.length !== 0;
  }

  getEdge(origin: string, target: string): Edge | null {
    const edge = this.edges.filter((edge) => edge.originName === origin && edge.targetName === target);
    
    if (edge.length === 0) return null;
    return edge[0];
  }

  hasEdge(origin: string, target: string): boolean {
    const edge = this.edges.filter((edge) => edge.originName === origin && edge.targetName === target);
    
    return edge.length !== 0;
  }

  toJSON(): string {
    const obj = { ...this, edges: this.edges.map((edge: Edge) => edge.toJSON()), nodes: this.nodes.map((node: Node) => node.toJSON()) };
    return JSON.stringify({ value: obj, space: 2 })
  }
}

export default Room;