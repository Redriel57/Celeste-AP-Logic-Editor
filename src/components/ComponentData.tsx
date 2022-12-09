import { ComponentDataInterface } from '../utils/interfaces';

const ComponentData = ({ selected }: ComponentDataInterface): JSX.Element => {
  console.log("render ComponentData");

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