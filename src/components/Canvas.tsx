import { CanvasProps, ToolState, Node, Edge } from '../utils/types';
import React, { useState, useRef, useEffect } from 'react';
import RoomComponent from './RoomComponent';
import NodeComponent from './NodeComponent';
import EdgeComponent from './EdgeComponent';

const DRAG_INERTIA: number = 20;
const ZOOM_FACTOR: number = 0.1;

const Canvas = (canvasProps: CanvasProps): JSX.Element => {
  const { tool, setSelected, selected, currentArea, setContextMenuShown, summonContextMenu } = canvasProps;
  const [scale, setScale] = useState<number>(1);
  const [{ dragPosX, dragPosY }, setDragPos] = useState<{ dragPosX: number; dragPosY: number }>({ dragPosX: 0, dragPosY: 0 });
  const [overflow, setOverflow] = useState<string>('scroll');

  const divOuterRef = useRef<HTMLDivElement>(null);
  const divInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        const currentRoom = currentArea.getRoomByID(parseInt(selected.split(' ')[0]));
        if (!currentRoom) return;

        const id = currentRoom.newNodeID();
        const newNode = new Node(`node_${id}`, id, dragPosX, dragPosY, dx, dy, currentRoom.id);
        currentRoom.nodes.push(newNode);
        break;
      }
      case ToolState.Edge: {
        const start = getElementAt(dragPosX, dragPosY)?.split(' ');
        const end = getElementAt(event.pageX, event.pageY)?.split(' ');
        if (!start || !end) return;

        const currentRoom = currentArea.getRoomByID(parseInt(start[0]));
        if (!currentRoom) return;

        const startingNode = currentRoom.getNodeByID(parseInt(start[1]));
        const endingNode = currentRoom.getNodeByID(parseInt(end[1]));
        if (!startingNode || !endingNode) return;

        const newEdge = new Edge(startingNode, endingNode);

        currentRoom.edges.push(newEdge);
        break;
      }
    }
  }

  const resizeToItem = (item: number): void => {

  };

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (event.detail === 1) {
      setSelected(getElementAt(event.pageX, event.pageY));
      setContextMenuShown(false);
    }
    else {
      resizeToItem(0);
      setSelected("");
    }
  };

  const onRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.preventDefault();
    summonContextMenu(event.pageX, event.pageY);
  };

  const getElementAt = (x: number, y: number): string | null => {
    // const list = currentArea.rooms.map((room: Room) => {
    //   const nodes = room.nodes.map((node: Node) => [`${room.id} ${node.id}`, [node.pos, node.pos.x + node.size.x, node.pos.y + node.size.y]]);
    //   return nodes;
    // }).reduce((total, amount) => total.concat(amount), []);



    return null;
  }

  let keyRoom = 0;
  let keyNode = 0;
  let keyEdge = 0;

  return (
    <div ref={divOuterRef}>
      <div className="select-none"
        onClick={onClick}
        onContextMenu={onRightClick}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDrag={onDrag}
        onWheel={onScroll}
        ref={divInnerRef}
        draggable
      >
        {currentArea.rooms.map((room) => <RoomComponent key={keyRoom++} room={room} />)}
        {currentArea.getAllNodes().map((node) => <NodeComponent key={keyNode++} node={node} room={currentArea.getRoomByID(node.roomID)} active={tool === ToolState.Node} />)}
        {currentArea.getAllEdges().map((edge) => <EdgeComponent key={keyEdge++} edge={edge} />)}
      </div>
    </div>
  );
}

export default Canvas;