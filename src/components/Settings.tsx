// import { useState } from 'react';
// import { SettingsJSON } from '../utils/types';
// import { writeFile } from 'fs';
// import Field from './Field';

// import settings from '../settings.json';

const Settings = (): JSX.Element => {
  /*const [defaultTheme, setDefaultTheme] = useState<string>(settings.defaultTheme);

  const updateSettingsJSON = (): void => {
    const newSettings: SettingsJSON = { defaultTheme };
    writeFile('../settings.json', JSON.stringify(newSettings), (err) => {
      if (err) throw err;
      console.log("updated settings");
    });
  }*/

  return (
    <div className='w-full h-full justify-center content-center bg-slate-300 dark:bg-slate-600'>
      {/*<div className="flex flex-col flex-nowrap items-center justify-center w-1/2 h-full">
        <div className="flex flex-col flex-nowrap items-stretch justify-center w-full content-center">
          <Field name="Default Dark Theme" onChange={() => setDefaultTheme(defaultTheme === 'dark' ? 'light' : 'dark')} defaultChecked={defaultTheme === "dark"} />
        </div>
        <button disabled={true} onClick={() => updateSettingsJSON()}>Save Changes</button>
      </div>*/}
    </div>
  );
}

export default Settings;