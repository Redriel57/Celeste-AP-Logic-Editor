import { FieldInterface } from '../utils/interfaces';

const Field = ({ defaultChecked, onChange, name }: FieldInterface): JSX.Element => {
  console.log("render Field");
  
  return (
    <div className="flex flex-row flex-nowrap items-center justify-center content-center w-full">
      <input defaultChecked={defaultChecked} onChange={onChange} type="checkbox" />
      <label>{name}</label>
    </div>
  )
}

export default Field;