enum State {
  None = "None",
  Editor = "Editor",
  Settings = "Settings"
}

enum CanvasState {
  Area = "Area",
  Room = "Room"
}

enum ToolState {
  None = "None",
  Room = "Room",
  Node = "Node",
  Edge = "Edge"
}

enum Difficulty {
  None = "None",
  Room = "Room",
  Node = "Node",
  Edge = "Edge"
}

interface HeaderInterface {
  setDarkMode: (darkMode: boolean) => void;
  darkMode: boolean;
  setState: (state: State) => void;
  parseFile: (text: string) => void;
  setArea: (area: Area) => void;
}

interface SettingsJSON {
  defaultTheme: string;
}

interface FieldInterface {
  onChange: () => void;
  name: string;
  defaultChecked: boolean;
}

interface ToolInterface {
  func: () => void;
  icon: JSX.Element;
  tooltip: string;
  sideOpen: boolean;
  toggled: boolean;
}

interface CanvasProps {
  tool: ToolState;
  setSelected: (item: string | null) => void;
  selected: string | null;
  currentArea: Area;
  setContextMenuShown: (isShown: boolean) => void;
  summonContextMenu: (x: number, y: number) => void;
}

interface ComponentDataInterface {
  selected: string | null;
}

class LogicCondition {
  difficulty: Difficulty;

  constructor(difficulty: Difficulty) {
    this.difficulty = difficulty;
  }
}

class CanvasItem {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

class LocatedItem extends CanvasItem {
  pos: { x: number, y: number };
  size: { x: number, y: number };
  endPos: { x: number, y: number };

  constructor(name: string, id: number, x: number, y: number, width: number, height: number) {
    super(name, id);
    this.pos = { x: x, y: y };
    this.size = { x: width, y: height };
    this.endPos = { x: x + width, y: y + width };
  }
}

class Edge {
  origin: Node;
  target: Node;
  undirected: boolean;
  requirement: Array<LogicCondition>;

  constructor(origin: Node, target: Node) {
    this.origin = origin;
    this.target = target;
    this.undirected = false;
    this.requirement = [];
  }
}

class Node extends LocatedItem {
  isStart: boolean;
  isSpawnpoint: boolean;
  roomID: number;

  constructor(name: string, id: number, x: number, y: number, width: number, height: number, roomID: number) {
    super(name, id, x, y, width, height);
    this.isStart = false;
    this.isSpawnpoint = false;
    this.roomID = roomID;
  }
}

class Room extends LocatedItem {
  imgPath: string | null;
  nodes: Array<Node>;
  edges: Array<Edge>;
  __removedNodeID: Array<number>;

  constructor(name: string, id: number, x: number, y: number, width: number, height: number, imgPath: string | null = null) {
    super(name, id, x, y, width, height);
    this.nodes = [];
    this.edges = [];
    this.imgPath = imgPath;
    this.__removedNodeID = [];
  }

  newNodeID(): number {
    if (this.__removedNodeID.length !== 0) return this.__removedNodeID.pop() ?? 0;
    return this.nodes.length === 0 ? 0 : this.nodes[this.nodes.length-1].id + 1;
  }

  removeNode(node: Node): void {
    const index = this.nodes.indexOf(node);
    if (index === -1) return;
    this.nodes.splice(index, 1);

    const brokenEdges = this.edges.filter((e) => e.origin === node || e.target === node);
    for (const e of brokenEdges) this.edges.splice(this.edges.indexOf(e), 1);

    this.__removedNodeID.push(node.id);
  }

  getNodeByID(id: number): Node | null {
    const node = this.nodes.filter((node) => node.id === id);
    if (node.length === 0) return null;
    return node[0];
  }

  inBound(x: number, y: number) {
    const checkX = x >= this.pos.x && x <= this.endPos.x;
    const checkY = y >= this.pos.y && y <= this.endPos.y;
    return checkX && checkY;
  }
}

class Area {
  name: string | null;
  saved: boolean;
  rooms: Array<Room>;
  size: { x: number, y: number };

  constructor(name: string | null = null, size: {x: number, y: number} = {x: 0, y: 0}) {
    this.name = name;
    this.saved = false;
    this.rooms = [];
    this.size = size;
  }

  newRoomID(): number {
    return this.rooms.length === 0 ? 0 : this.rooms[this.rooms.length-1].id + 1;
  }

  getRoomByID(id: number): Room {
    const room = this.rooms.filter((room) => room.id === id);
    return room[0];
  }

  getAllNodes(): Node[] {
    return this.rooms.reduce<Node[]>((n, r) => n.concat(r.nodes), []);
  }

  getAllEdges(): Edge[] {
    return this.rooms.reduce<Edge[]>((n, r) => n.concat(r.edges), []);
  }
}

export { State, CanvasState, ToolState, Area, Room, Node, Edge, LogicCondition as Condition };
export type { HeaderInterface, SettingsJSON, FieldInterface, ToolInterface, CanvasProps, ComponentDataInterface };