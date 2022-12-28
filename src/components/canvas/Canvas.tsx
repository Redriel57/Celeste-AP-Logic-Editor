import React, { useState, useRef, useEffect } from 'react';
import ClickAwayListener from '@mui/base/ClickAwayListener';

import { CanvasProps, Coordinate } from '../../utils/interfaces';
import { ToolState } from '../../utils/enums';
import Room from '../../utils/data/Room';
import Node from '../../utils/data/Node';
import Edge from '../../utils/data/Edge';

import RoomComponent from './RoomComponent';
import NodeComponent from './NodeComponent';
import EdgeComponent from './EdgeComponent';

import RoomPrompt from '../prompt/RoomPrompt';
import NodePrompt from '../prompt/NodePrompt';
import EdgePrompt from '../prompt/EdgePrompt';
import ContextMenu from './ContextMenu';

const DRAG_INERTIA: number = 20;
const ZOOM_FACTOR: number = 0.1;

const Canvas = ({ tool, setSelected, selected, currentArea }: CanvasProps): JSX.Element => {
  console.log("render Canvas");

  const [scale, setScale] = useState<number>(1);
  // const [{ offsetX, offsetY }, setOffset] = useState<{ offsetX: number; offsetY: number; }>({ offsetX: 0, offsetY: 0 });
  const [{ dragPosX, dragPosY }, setDragPos] = useState<{ dragPosX: number; dragPosY: number; }>({ dragPosX: 0, dragPosY: 0 });
  const [{ contextX, contextY }, setContext] = useState<{ contextX: number; contextY: number; }>({ contextX: 0, contextY: 0 });
  const [clickPos, setClickPos] = useState<Coordinate>({ x: 0, y: 0 });
  const [overflow, setOverflow] = useState<string>('scroll');

  const [roomPromptShown, setRoomPromptShown] = useState<boolean>(false);
  const [nodePromptShown, setNodePromptShown] = useState<boolean>(false);
  const [edgePromptShown, setEdgePromptShown] = useState<boolean>(false);
  const [contextMenuShown, setContextMenuShown] = useState<boolean>(false);

  const [rooms, setRooms] = useState<Room[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const divOuterRef = useRef<HTMLDivElement>(null);
  const divInnerRef = useRef<HTMLDivElement>(null);
  const contextMenu = useRef<HTMLDivElement>(null);
  const divRoomRef = useRef<HTMLDivElement>(null);
  const divNodeRef = useRef<HTMLDivElement>(null);
  const divEdgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRooms(currentArea.rooms);
    setNodes(currentArea.getAllNodes());
    setEdges(currentArea.getAllEdges());
    const { innerHeight, innerWidth } = window;

    const scrollDown = (currentArea.size.y - innerHeight) / 2;
    const scrollLeft = (currentArea.size.x - innerWidth) / 2;

    if (divOuterRef.current) divOuterRef.current.scroll(scrollLeft, scrollDown);
  }, [currentArea]);

  useEffect(() => {
    if (divInnerRef.current) divInnerRef.current.style.scale = `scale(${scale}, ${scale})`;
  }, [scale]);

  useEffect(() => {
    if (divOuterRef.current) divOuterRef.current.style.overflow = overflow;
  }, [overflow]);

  useEffect(() => {
    if (!contextMenu.current) return;

    contextMenu.current.style.top = `${contextX}`;
    contextMenu.current.style.left = `${contextY}`;
  }, [contextX, contextY])

  const summonContextMenu = ({ x, y }: Coordinate): void => {
    console.log("ping");
    setContext({ contextX: x, contextY: y });
    setContextMenuShown(true);
  }

  const onScroll = (event: React.WheelEvent<HTMLDivElement>): void => {
    if (event.deltaY > 0) {
      if (scale === 1) setOverflow('hidden');
      else if (scale > 1) setScale(scale - ZOOM_FACTOR);
    }
    else setScale(scale + ZOOM_FACTOR);
  };

  const onDrag = (event: React.DragEvent<HTMLDivElement>): void => {
    switch (tool) {
      case ToolState.Room:
        // TODO move room arount
      break;
      case ToolState.Node:
        // TODO create room if on room
      break;
      case ToolState.Edge:
        // TODO create edge if from node to node (visual arrow)
      break;
      default:
        if (!divOuterRef.current || !event.clientX || !event.clientY) return;
        const deltaX = (dragPosX - event.clientX) / DRAG_INERTIA;
        const deltaY = (dragPosY - event.clientY) / DRAG_INERTIA;
  
        divOuterRef.current.scrollBy(deltaX, deltaY);
    }
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>): void => {
    const preview = document.createElement('div');
    preview.style.display = 'none';
    event.dataTransfer.setDragImage(preview, 0, 0);

    setDragPos({ dragPosX: event.clientX, dragPosY: event.clientY })
  };

  const onDragEnd = (event: React.DragEvent<HTMLDivElement>): void => {
    const dx = event.pageX - dragPosX;
    const dy = event.pageY - dragPosY;
    switch (tool) {
      case ToolState.Node: {
        if (!selected) return;
        const currentRoom = currentArea.getRoomByName(selected.split(' ')[0]);
        if (!currentRoom) return;

        const name = ""; // TODO POP UP TO NAME NODE

        currentRoom.addNode(new Node(name, dragPosX, dragPosY, dx, dy, currentRoom.name));
        break;
      }
      case ToolState.Edge: {
        const start = currentArea.getElementAt({ x: dragPosX, y: dragPosY })?.split(' ');
        const end = currentArea.getElementAt({ x: event.pageX, y: event.pageY })?.split(' ');
        if (!start || !end) return;

        const currentRoom = currentArea.getRoomByName(start[0]);
        if (!currentRoom) return;

        const startingNode = currentRoom.getNodeByName(start[1]);
        const endingNode = currentRoom.getNodeByName(end[1]);
        if (!startingNode || !endingNode) return;

        const newEdge = new Edge(startingNode, endingNode);

        currentRoom.edges.push(newEdge);
        break;
      }
    }
  }

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    setClickPos({ x: event.pageX, y: event.pageY });

    if (event.detail === 1 || tool !== ToolState.Room || selected) return;
    setSelected(null);
    setRoomPromptShown(true);
  };

  const onRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.preventDefault();
    summonContextMenu({ x: event.pageX, y: event.pageY });
  };

  const addRoom = (room: Room): void => {
    const newList = [...rooms, room];
    currentArea.addRoom(room);
    setRooms(newList);
  };

  const addNode = (node: Node): void => {
    const newList = [...nodes, node];
    currentArea.getRoomByName(node.roomName).addNode(node);
    setNodes(newList);
  };

  const addEdge = (edge: Edge): void => {
    const newList = [...edges, edge];
    currentArea.getRoomByName(edge.roomName).addEdge(edge);
    setEdges(newList);
  };

  let keyRoom = 0;
  let keyNode = 0;
  let keyEdge = 0;

  return (
    <div className="w-full h-full" ref={divOuterRef}>
      <ClickAwayListener onClickAway={() => { setRoomPromptShown(false); setNodePromptShown(false); setEdgePromptShown(false); setContextMenuShown(false); }}>
        <div>
          {contextMenuShown && <ContextMenu anchor={divOuterRef.current} />}
          {roomPromptShown && <div>
            <RoomPrompt currentArea={currentArea} coordinates={{ x: clickPos.x, y: clickPos.y }} closeMenu={() => setRoomPromptShown(false)} addRoom={addRoom} />
          </div>}
          {nodePromptShown && <div>
            <NodePrompt currentArea={currentArea} coordinates={{ x: clickPos.x, y: clickPos.y }} closeMenu={() => setNodePromptShown(false)} addNode={addNode} />
          </div>}
          {edgePromptShown && <div>
            <EdgePrompt currentArea={currentArea} coordinates={{ x: clickPos.x, y: clickPos.y }} closeMenu={() => setEdgePromptShown(false)} addEdge={addEdge} />
          </div>}
        </div>
      </ClickAwayListener>
      <div className='h-full w-full'
        onClick={onClick}
        onContextMenu={onRightClick}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDrag={onDrag}
        onWheel={onScroll}
        ref={divInnerRef}
        draggable
      >
        <div className='z-40' ref={divRoomRef}>
          {rooms.map((room) => <RoomComponent key={keyRoom++} room={room} active={tool === ToolState.Room} selected={selected === room.name} />)}
        </div>
        <div className='z-30' ref={divNodeRef}>
          {nodes.map((node) => <NodeComponent key={keyNode++} node={node} room={currentArea.getRoomByName(node.roomName)} active={tool === ToolState.Node} selected={selected === node.name} />)}
        </div>
        <div className='z-20' ref={divEdgeRef}>
          {edges.map((edge) => <EdgeComponent key={keyEdge++} edge={edge} />)}
        </div>
      </div>
    </div>
  );
}

export default Canvas;