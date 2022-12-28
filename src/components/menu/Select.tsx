import { forwardRef, RefAttributes } from "react";
import SelectUnstyled, { SelectUnstyledProps } from "@mui/base/SelectUnstyled"; 
import Popper from "./Popper";


const Select = forwardRef(function Select<TValue extends {}> (props: SelectUnstyledProps<TValue>, ref: React.ForwardedRef<HTMLButtonElement>) {
  const Button = (): JSX.Element => <button className="rounded-xl box-border text-sm leading-normal p-3 text-left min-h-[calc(1.5em + 22px)] min-w-[320px] transition-all ease-in-out duration-150 border-1 border-solid border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-300 after:float-right after:content-['▾'] focus-visible:border-blue-600 focus-visible:outline-2 focus-visible:outline-blue-200 focus-visible:dark:outline-blue-500 after:aria-expanded:content-['▴']"></button>
  const ListBox = (): JSX.Element => <ul className="rounded-xl box-border text-sm mx-0 my-3 overflow-auto p-1 min-w-[320px] outline-0 bg-slate-50 dark:bg-slate-900 border-1 border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 shadow-md shadow-slate-200 dark:shadow-slate-900"></ul>;

  const slots: SelectUnstyledProps<TValue>['slots'] = {
    root: Button,
    listbox: ListBox,
    popper: Popper,
    ...props.slots,
  };

  return <SelectUnstyled {...props} ref={ref} slots={slots} />;
}) as <TValue extends {}>(
  props: SelectUnstyledProps<TValue> & RefAttributes<HTMLButtonElement>,
) => JSX.Element;

export default Select;
