import React, { useState, useRef, useEffect } from 'react';

import { CanvasProps, Coordinate } from '../utils/interfaces';
import { ToolState } from '../utils/enums';
import Node from '../utils/data/Node';
import Edge from '../utils/data/Edge';

import RoomComponent from './RoomComponent';
import NodeComponent from './NodeComponent';
import EdgeComponent from './EdgeComponent';
import RoomPrompt from './RoomPrompt';

const DRAG_INERTIA: number = 20;
const ZOOM_FACTOR: number = 0.1;

const Canvas = ({ tool, setSelected, selected, currentArea, setContextMenuShown, summonContextMenu }: CanvasProps): JSX.Element => {
  console.log("render Canvas");

  const [scale, setScale] = useState<number>(1);
  // const [{ offsetX, offsetY }, setOffset] = useState<{ offsetX: number; offsetY: number; }>({ offsetX: 0, offsetY: 0 });
  const [{ dragPosX, dragPosY }, setDragPos] = useState<{ dragPosX: number; dragPosY: number; }>({ dragPosX: 0, dragPosY: 0 });
  const [clickPos, setClickPos] = useState<Coordinate>({ x: 0, y: 0 });
  const [overflow, setOverflow] = useState<string>('scroll');
  const [roomPromptShown, setRoomPromptShown] = useState<boolean>(false);

  const divOuterRef = useRef<HTMLDivElement>(null);
  const divInnerRef = useRef<HTMLDivElement>(null);
  const divRoomRef = useRef<HTMLDivElement>(null);
  const divNodeRef = useRef<HTMLDivElement>(null);
  const divEdgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (divRoomRef.current) ;
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

  const onScroll = (event: React.WheelEvent<HTMLDivElement>): void => {
    if (event.deltaY > 0) {
      if (scale === 1) setOverflow('hidden');
      else if (scale > 1) setScale(scale - ZOOM_FACTOR);
    }
    else setScale(scale + ZOOM_FACTOR);
  };

  const onDrag = (event: React.DragEvent<HTMLDivElement>): void => {
    if (tool !== ToolState.None) return;

    if (divOuterRef.current && event.clientX && event.clientY) {
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

  // const resizeToItem = (item: number): void => {

  // };

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    setClickPos({ x: event.pageX, y: event.pageY });

    if (event.detail === 1) {
      setSelected(currentArea.getElementAt({ x: event.pageX, y: event.pageY }));
      setContextMenuShown(false);
      setRoomPromptShown(false);
    }
    else {
      // resizeToItem(0);
      if (tool === ToolState.Room) {
        if (selected) return;
        setSelected(null);
        setRoomPromptShown(true);
      }
    }
  };

  const onRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.preventDefault();
    summonContextMenu({ x: event.pageX, y: event.pageY });
  };

  let keyRoom = 0;
  let keyNode = 0;
  let keyEdge = 0;

  return (
    <div className="w-full h-full" ref={divOuterRef}>
      {roomPromptShown && <div>
        <RoomPrompt currentArea={currentArea} coordinates={{ x: clickPos.x, y: clickPos.y }} closeMenu={() => setRoomPromptShown(false)} />
      </div>}
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
          {currentArea.rooms.map((room) => <RoomComponent key={keyRoom++} room={room} active={tool === ToolState.Room} />)}
        </div>
        <div className='z-30' ref={divNodeRef}>
          {currentArea.getAllNodes().map((node) => <NodeComponent key={keyNode++} node={node} room={currentArea.getRoomByName(node.roomName)} active={tool === ToolState.Node} />)}
        </div>
        <div className='z-20' ref={divEdgeRef}>
          {currentArea.getAllEdges().map((edge) => <EdgeComponent key={keyEdge++} edge={edge} />)}
        </div>
      </div>
    </div>
  );
}

export default Canvas;