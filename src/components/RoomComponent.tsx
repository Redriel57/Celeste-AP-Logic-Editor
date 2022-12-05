import React, { useState, useRef } from 'react';
import Room from '../utils/data/Room';
import { Coordinate } from "../utils/interfaces";

const RoomComponent = ({ room, active }: { room: Room; active: boolean; }): JSX.Element => {
  const [moving, setMoving] = useState<boolean>(false);
  const [startMove, setStartMove] = useState<Coordinate>({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState<Coordinate>({ x: 0, y: 0 });

  const movableRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (!moving || !movableRef.current) return;

    movableRef.current.style.left = startPos.x + (event.pageX - startMove.x) + 'px';
    movableRef.current.style.top = startPos.y + (event.pageY - startMove.y) + 'px';
  }

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (!movableRef.current) return;

    setMoving(true);
    setStartMove({ x: event.pageX, y: event.pageY });
    setStartPos({ x: parseInt(movableRef.current.style.left), y: parseInt(movableRef.current.style.top) });
  }

  return (
    <div className={`resizable bg-node-color absolute top-[${room.pos.y}px] left-[${room.pos.x}px]`}>
      {active && <div className='w-full h-full border-2 border-white box-border'
        ref={movableRef}
        onMouseDown={(e) => onMouseDown(e)}
        onMouseMove={(e) => onMouseMove(e)}
        onMouseUp={() => setMoving(false)}
      ></div>}
    </div>
  )
}

export default RoomComponent;