import React, { useRef } from 'react';
import { /*FileTree,*/ HeaderInterface } from '../utils/interfaces';
import Area from '../utils/data/Area';
import { State } from '../utils/enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faUpload, faFile, faBars, faFloppyDisk, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
// import FileManager from '../utils/FileManager';

const icons = { 
  dark: (<FontAwesomeIcon icon={faMoon} />),
  light: (<FontAwesomeIcon icon={faSun} />),
  export: (<FontAwesomeIcon icon={faUpload} />),
  load: (<FontAwesomeIcon icon={faFolderOpen} />),
  new: (<FontAwesomeIcon icon={faFile} />),
  settings: (<FontAwesomeIcon icon={faBars} />),
  save: (<FontAwesomeIcon icon={faFloppyDisk} />)
};

const Header = ({ setDarkMode, darkMode, setState, setArea, currentArea }: HeaderInterface): JSX.Element => {
  console.log("render Header");

  const fileInput = useRef<HTMLInputElement>(null);
  
  const openFile = (file: File | null): void => {
    if (file === null) return;
    file.text().then(text => {
      const newArea = Area.fromString(text);
      
      if (newArea instanceof Area) setArea(newArea);
    });
  }



  const headerButtons = [
    {func: () => setDarkMode(!darkMode), icon: darkMode ? icons.light : icons.dark},
    {func: () => {
      setState(State.Editor);
      setArea(new Area());
    }, icon: icons.new},
    {func: () => fileInput.current?.click(), icon: icons.load},
    {func: async () => {
      // const jsonFile = new File([new Blob([currentArea.toJSON(true)], {type: "json"})], "data.json");
      // const folder: FileTree[] = await Promise.all(currentArea.rooms.map(async (room) => {
      //   return { name: room.name, content: await room.getImageFile() };
      // }));
      
      // const tree: FileTree[] = [{name: "data.json", content: jsonFile}, {name: "img", content: folder}];

      // FileManager.saveAsZip(tree, "Save CAPLE project", [{ name: "Celeste Archipelago Logic Project", extensions: ["caple"] }]);
    }, icon: icons.save},
    {func: () => {
      // const file = new Blob([currentArea.toJSON()], {type: "json"});
      // FileManager.saveAs(file, "Export CAPLE project", [{ name: "Celeste Archipelago Logic File", extensions: ["json"] }])      
    }, icon: icons.export},
    {func: () => setState(State.Settings), icon: icons.settings}
  ];

  let buttonKey = 0;

  return (
    <div className="bg-slate-400 dark:bg-slate-800 flex flex-row flex-nowrap w-full h-full">
      <div className='border-slate-500 dark:border-slate-900 flex flex-row flex-nowrap w-96 items-center justify-around h-full border-r-2'>
        {headerButtons.map(({func, icon}) => 
          <button key={buttonKey++}
            className='h-12 w-12 flex justify-center p-4 bg-slate-900 dark:bg-slate-300 text-slate-300 dark:text-slate-900 rounded-md items-center'
            onClick={func}>{icon}</button>
        )}
        <input className="hidden" accept=".caple" type="file" ref={fileInput} onChange={(e) => openFile(e.target.files?.item(0) ?? null)} />
      </div>
      <div className='w-1/2'>
        {/* Logic Bar */}
      </div>
    </div>
  );
}


export default Header;