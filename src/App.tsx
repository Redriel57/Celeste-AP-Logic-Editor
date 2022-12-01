import React, { useState } from 'react';
import Header from './components/Header';
import Settings from './components/Settings';
import Editor from './components/Editor';
import settings from './settings.json';
import { State } from './utils/types'

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(settings.defaultTheme === "dark");
  const [state, setState] = useState<State>(State.None);

  const getComponent = () => {
    switch (state) {
      case State.Editor:
        return <Editor />
      case State.Settings:
        return <Settings />
      default:
        return (
          <div className='flex justify-center items-center h-full w-full'>
            <label>Create or Open a project</label>
          </div>
        )
    }
  }

  const parseFile = (text: string): void => {

  }

  return (
    <div className={`max-h-full max-w-full overflow-hidden ${darkMode && "dark"}`}>
      <div className='h-1/10'>
        <Header setDarkMode={setDarkMode} darkMode={darkMode} setState={setState} parseFile={parseFile} />
      </div>
      <div className='h-full w-full'>
        {getComponent()}
      </div>
    </div>
  );
}

export default App;
