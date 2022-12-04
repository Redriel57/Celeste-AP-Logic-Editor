import { ComponentDataInterface } from '../utils/types';

const ComponentData = ({ selected }: ComponentDataInterface): JSX.Element => {

  const getData = (selected: string): JSX.Element => {
    return <div />
  }

  return (
    <div className="h-full w-full">
      {selected ? getData(selected) : <div />}
    </div>
  );
}

export default ComponentData;