import React, { useRef } from 'react';
import { State, HeaderInterface } from '../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faUpload, faFile, faBars, faFloppyDisk, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

const icons = { 
  dark: (<FontAwesomeIcon icon={faMoon} />),
  light: (<FontAwesomeIcon icon={faSun} />),
  export: (<FontAwesomeIcon icon={faUpload} />),
  load: (<FontAwesomeIcon icon={faFolderOpen} />),
  new: (<FontAwesomeIcon icon={faFile} />),
  bars: (<FontAwesomeIcon icon={faBars} />),
  save: (<FontAwesomeIcon icon={faFloppyDisk} />)
};

const Header = ({ setDarkMode, darkMode, setState, parseFile }: HeaderInterface): JSX.Element => {
  const fileInput = useRef<HTMLInputElement>(null);
  
  const openFile = (file: File | null): void => {
    if (file === null) return;
    file.text().then(text => parseFile(text));
  }

  const buttonStyle = 'h-2/3 p-4 aspect-square bg-slate-900 dark:bg-slate-300 text-slate-300 dark:text-slate-900 rounded-md items-center';
  return (
    <div className="bg-slate-400 dark:bg-slate-800 flex flex-row flex-nowrap w-full h-full">
      <div className='border-slate-500 dark:border-slate-900 flex flex-row flex-nowrap w-1/3 items-center justify-around h-full border-r-2'>
        <button className={buttonStyle} onClick={() => setDarkMode(!darkMode)}>{darkMode ? icons.light : icons.dark}</button>
        <button className={buttonStyle} onClick={() => 0}>{icons.new}</button>
        <button className={buttonStyle} onClick={() => fileInput.current?.click()}>{icons.load}</button>
        <button className={buttonStyle} onClick={() => 0}>{icons.save}</button>
        <button className={buttonStyle} onClick={() => 0}>{icons.export}</button>
        <button className={buttonStyle} onClick={() => setState(State.Settings)}>{icons.bars}</button>
        <input className="hidden" accept=".apclogic" type="file" ref={fileInput} onChange={(e) => openFile(e.target.files?.item(0) ?? null)} />
      </div>
      <div className='w-1/2'>

      </div>
    </div>
  );
}


export default Header;