import { ToolInterface } from '../utils/interfaces';

const Tool = ({ func, icon, tooltip, sideOpen, toggled }: ToolInterface): JSX.Element => {

  return (
    <div className='flex flex-row flex-nowrap justify-between items-center'>
      <button
        className={`h-12 w-12 flex justify-center bg-slate-900 dark:bg-slate-300 text-slate-300 dark:text-slate-900 ${toggled && 'border-4'} border-slate-200 dark:border-slate-500 rounded-lg items-center`}
        onClick={func}>{icon}</button>
      {sideOpen && <label className="text-slate-900 dark:text-slate-200">{tooltip}</label>}
    </div>
  )
};

export default Tool;