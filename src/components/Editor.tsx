import { useState } from 'react';
import Tool from './Tool';
import Canvas from './Canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faLocationDot, faTicket, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

const icons = { 
  left: (<FontAwesomeIcon icon={faArrowLeft} />),
  right: (<FontAwesomeIcon icon={faArrowRight} />),
  node: (<FontAwesomeIcon icon={faLocationDot} />),
  room: (<FontAwesomeIcon icon={faTicket} />),
  edge: (<FontAwesomeIcon icon={faArrowRightToBracket} />)
};

const Editor = (): JSX.Element => {
  const [sideOpen, setSideOpen] = useState<boolean>(true);

  const buttons = [
    { func: () => 0, icon: icons.room, tooltip: "New Room" },
    { func: () => 0, icon: icons.node, tooltip: "New Node" },
    { func: () => 0, icon: icons.edge, tooltip: "New Edge" },
  ]

  let key = 0;

  return (
    <div className="h-full w-full flex flex-row flex-nowrap">
      <div className={`bg-slate-300 dark:bg-slate-800 ${sideOpen ? "w-48" : "w-24"} h-full border-r-2 border-slate-500 dark:border-slate-800 flex flex-col flex-nowrap items-start`}>
        <div className='w-full h-64 flex flex-col flex-nowrap justify-between p-4'>
          {buttons.map(({func, icon, tooltip}) => <Tool key={key++} func={func} icon={icon} tooltip={tooltip} sideOpen={sideOpen} />)}
        </div>
        <div className='w-full h-[calc(100vh-300px)] border-y-2 border-slate-500 dark:border-slate-800'>

        </div>
        <div className='w-full h-20 p-4'>
          <button
            className='h-12 w-12 flex justify-center bg-slate-800 dark:bg-slate-300 text-slate-300 dark:text-slate-800 rounded-lg items-center'
            onClick={() => setSideOpen(!sideOpen)}>{sideOpen ? icons.left : icons.right}</button>
        </div>
      </div>
      <div className={`bg-slate-100 dark:bg-slate-900 ${sideOpen ? "w-[calc(100vw-192px)]" : "w-[calc(100vw-96px)]"} h-full`}>
        <Canvas />
      </div>
    </div>
  )
}

export default Editor;