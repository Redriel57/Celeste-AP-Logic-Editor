import Node from '../utils/data/Node';
import Room from '../utils/data/Room';
import { useState } from 'react';

const NodeComponent = ({ room, node, active }: { room: Room; node: Node; active: boolean }): JSX.Element => {
  const [moving, setMoving] = useState<boolean>(false);
  const [resizing, setResizing] = useState<boolean>(false);

  const element = document.querySelector<HTMLDivElement>('.resizable');
  const resizers = document.querySelectorAll<HTMLDivElement>('.resizable .resizer');
  if (!element || !resizers) return <div />;

  const minimum_size = 25;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  
  const resize = (e: MouseEvent, currentResizer: HTMLDivElement): void => {
    if (currentResizer.classList.contains('bottom-right')) {
      const width = original_width + (e.pageX - original_mouse_x);
      const height = original_height + (e.pageY - original_mouse_y);
      if (width > minimum_size && room.inBound(parseInt(element.style.left) + width, node.endPos.y)) {
        element.style.width = width + 'px';
      }
      if (height > minimum_size && room.inBound(node.endPos.x, parseInt(element.style.top) + height)) {
        element.style.height = height + 'px';
      }
    }
    else if (currentResizer.classList.contains('bottom-left')) {
      const height = original_height + (e.pageY - original_mouse_y);
      const width = original_width - (e.pageX - original_mouse_x);
      if (height > minimum_size && room.inBound(node.endPos.x, parseInt(element.style.top) + height)) {
        element.style.height = height + 'px';
      }
      const newLeft = original_x + (e.pageX - original_mouse_x);
      if (width > minimum_size && room.inBound(newLeft, node.endPos.y)) {
        element.style.width = width + 'px';
        element.style.left = newLeft + 'px';
      }
    }
    else if (currentResizer.classList.contains('top-right')) {
      const width = original_width + (e.pageX - original_mouse_x);
      const height = original_height - (e.pageY - original_mouse_y);
      if (width > minimum_size && room.inBound(parseInt(element.style.left) + width, node.endPos.y)) {
        element.style.width = width + 'px';
      }
      const newTop = original_y + (e.pageY - original_mouse_y);
      if (height > minimum_size && room.inBound(node.endPos.x, newTop)) {
        element.style.height = height + 'px';
        element.style.top = newTop + 'px';
      }
    }
    else {
      const width = original_width - (e.pageX - original_mouse_x);
      const height = original_height - (e.pageY - original_mouse_y);
      const newLeft = original_x + (e.pageX - original_mouse_x);
      if (width > minimum_size && room.inBound(newLeft, node.endPos.y)) {
        element.style.width = width + 'px';
        element.style.left = newLeft + 'px';
      }
      const newTop = original_y + (e.pageY - original_mouse_y);
      if (height > minimum_size && room.inBound(node.endPos.x, newTop)) {
        element.style.height = height + 'px';
        element.style.top = newTop + 'px';
      }
    }
  }

  const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, currentResizer: HTMLDivElement): void => {
    if (moving) return;
    setResizing(true);
    e.preventDefault()
    original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
    original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
    original_x = element.getBoundingClientRect().left;
    original_y = element.getBoundingClientRect().top;
    original_mouse_x = e.pageX;
    original_mouse_y = e.pageY;
    window.addEventListener('mousemove', (e) => resize(e, currentResizer));
    window.addEventListener('mouseup', () => stopResize(currentResizer));
  }

  const stopResize = (currentResizer: HTMLDivElement): void => {
    setResizing(false);
    window.removeEventListener('mousemove', (e) => resize(e, currentResizer));
    node.pos = { x: parseInt(element.style.left), y: parseInt(element.style.top) };
    node.size = { x: parseInt(element.style.width), y: parseInt(element.style.height) };
    node.endPos = { x: node.pos.x + node.size.x, y: node.pos.y + node.size.y };
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, i: number): void => mouseDown(e, resizers[i]);

  const move = (e: MouseEvent): void => {
    element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'

    element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
  }
  
  const stopMove = (e: MouseEvent): void => {
    setMoving(false);
    window.removeEventListener('mousemove', (e) => move(e));
  }

  const onMouseDownMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (resizing) return;
    setMoving(true);
    window.addEventListener('mousemove', (e) => move(e));
    window.addEventListener('mouseup', (e) => stopMove(e));
  }

  return (
    <div className={`resizable bg-node-color absolute w-[${node.size.x}px] h-[${node.size.y}px] top-[${node.pos.y}px] left-[${node.pos.x}px]`}>
      {active && <div className='w-full h-full border-2 border-white box-border' onMouseDown={(e) => onMouseDownMove(e)}>
        <div className='border-2 border-white h-3 bg-white rounded-lg absolute left-[-6px] top-[-6px] cursor-nw-resize top-left'
          onMouseDown={(e) => onMouseDown(e, 0)}
        ></div>
        <div className='border-2 border-white h-3 bg-white rounded-lg absolute right-[-6px] top-[-6px] cursor-ne-resize top-right'
          onMouseDown={(e) => onMouseDown(e, 1)}
        ></div>
        <div className='border-2 border-white h-3 bg-white rounded-lg absolute left-[-6px] bottom-[-6px] cursor-sw-resize bottom-left'
          onMouseDown={(e) => onMouseDown(e, 2)}
        ></div>
        <div className='border-2 border-white h-3 bg-white rounded-lg absolute right-[-6px] bottom-[-6px] cursor-se-resize bottom-right'
          onMouseDown={(e) => onMouseDown(e, 3)}
        ></div>
      </div>}
    </div>
  );
}

export default NodeComponent;