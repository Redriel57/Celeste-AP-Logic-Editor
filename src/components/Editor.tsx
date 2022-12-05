import { useState, useRef } from 'react';
import { faArrowLeft, faArrowRight, faLocationDot, faTicket, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Tool from './Tool';
import Canvas from './Canvas';
import ComponentData from './ComponentData';
import ContextMenu from './ContextMenu';

import { Coordinate } from '../utils/interfaces';
import { ToolState } from '../utils/enums';
import Area from '../utils/data/Area';

const icons = { 
  left: (<FontAwesomeIcon icon={faArrowLeft} />),
  right: (<FontAwesomeIcon icon={faArrowRight} />),
  node: (<FontAwesomeIcon icon={faLocationDot} />),
  room: (<FontAwesomeIcon icon={faTicket} />),
  edge: (<FontAwesomeIcon icon={faArrowRightToBracket} />)
};

const Editor = ({ area }: { area: Area }): JSX.Element => {
  const [sideOpen, setSideOpen] = useState<boolean>(true);
  // Canvas Data
  const [tool, setTool] = useState<ToolState>(ToolState.None);
  const [selected, setSelected] = useState<string | null>(null);
  const [contextMenuShown, setContextMenuShown] = useState<boolean>(false);

  const contextMenu = useRef<HTMLDivElement>(null);

  const setToolHandler = (newToolState: ToolState): void => {
    setTool(tool === newToolState ? ToolState.None : newToolState);
  }

  const summonContextMenu = ({ x, y }: Coordinate): void => {
    console.log("ping");
    if (contextMenu.current) {
      contextMenu.current.style.top = `${x}`;
      contextMenu.current.style.left = `${y}`;
      setContextMenuShown(true);
    }
  }

  const buttons = [
    { func: () => setToolHandler(ToolState.Room), icon: icons.room, tooltip: "New Room", toggled: tool === ToolState.Room },
    { func: () => setToolHandler(ToolState.Node), icon: icons.node, tooltip: "New Node", toggled: tool === ToolState.Node },
    { func: () => setToolHandler(ToolState.Edge), icon: icons.edge, tooltip: "New Edge", toggled: tool === ToolState.Edge },
  ]

  let key = 0;

  return (
    <div className="h-full w-full flex flex-row flex-nowrap -z-10">
      {contextMenuShown && (
        <div className={`-z-20 absolute h-96 w-48 top-0 left-0 bg-slate-100 dark:bg-slate-800 rounded-sm border-2 border-slate-200 dark:border-slate-900`} ref={contextMenu}>
          <ContextMenu />
        </div>)
      }
      <div className={`bg-slate-300 dark:bg-slate-800 ${sideOpen ? "w-48" : "w-24"} h-full border-r-2 border-slate-500 dark:border-slate-800 flex flex-col flex-nowrap items-start`}>
        <div className='w-full h-64 flex flex-col flex-nowrap justify-between p-4'>
          {buttons.map(({func, icon, tooltip, toggled}) => <Tool key={key++} func={func} icon={icon} tooltip={tooltip} sideOpen={sideOpen} toggled={toggled} />)}
        </div>
        <div className='w-full h-[calc(100vh-300px)] border-y-2 bg-slate-300 dark:bg-slate-800 border-slate-400 dark:border-slate-900'>
          <ComponentData selected={selected} />
        </div>
        <div className='w-full h-20 p-4'>
          <button
            className='h-12 w-12 flex justify-center bg-slate-800 dark:bg-slate-300 text-slate-300 dark:text-slate-800 rounded-lg items-center'
            onClick={() => setSideOpen(!sideOpen)}>{sideOpen ? icons.left : icons.right}</button>
        </div>
      </div>
      <div className={`z-50 bg-slate-100 dark:bg-slate-900 ${sideOpen ? "w-[calc(100vw-192px)]" : "w-[calc(100vw-96px)]"} h-full`}>
        <Canvas currentArea={area} tool={tool} setSelected={setSelected} selected={selected} setContextMenuShown={setContextMenuShown} summonContextMenu={summonContextMenu}/>
      </div>
    </div>
  )
}

export default Editor;