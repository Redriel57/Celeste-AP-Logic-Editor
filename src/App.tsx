import React, { useState } from 'react';
import Header from './components/Header';
import Settings from './components/Settings';
import Editor from './components/Editor';

import { State } from './utils/enums';
import Area from './utils/data/Area';
// import settings from './settings.json';

const App = (): JSX.Element => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [state, setState] = useState<State>(State.None);
  const [area, setArea] = useState<Area>(new Area());

  const getComponent = (): JSX.Element => {
    switch (state) {
      case State.Editor:
        return <Editor area={area} />
      case State.Settings:
        return <Settings />
      default:
        return (
          <div className='flex justify-center items-center h-full w-full bg-slate-200 dark:bg-slate-900'>
            <label className="text-slate-900 dark:text-slate-200 text-xl font-extrabold">Create or Open a project</label>
          </div>
        )
    }
  }

  return (
    <div className={`max-h-full max-w-full overflow-hidden select-none ${darkMode && "dark"}`}>
      <div className='h-16 w-full border-b-2 border-slate-500 dark:border-slate-900'>
        <Header setDarkMode={setDarkMode} currentArea={area} darkMode={darkMode} setState={setState} setArea={setArea} />
      </div>
      <div className='h-[calc(100vh-64px)] w-full'>
        {getComponent()}
      </div>
    </div>
  );
}

export default App;
