import MenuItemUnstyled, { MenuItemUnstyledProps } from "@mui/base/MenuItemUnstyled";
import { ForwardedRef, forwardRef } from "react";


const MenuItem = forwardRef(function MenuItem(props: MenuItemUnstyledProps, ref: ForwardedRef<HTMLLIElement>) {
  return (<MenuItemUnstyled
    {...props}
    ref={ref}
    slotProps={{
      root: { className: "p-2 list-none rounded-sm cursor-default select-none last-of-type:border-b-0 focus-visible:outline-3 focus-visible:outline-slate-200 focus-visible:dark:outline-slate-600 focus-visible:bg-slate-100 focus-visible:dark:bg-slate-800 focus-visible:dark:text-slate-300 focus-visible:text-slate-900 disabled:dark:text-slate-700 disabled:text-slate-400 hover:bg-slate-900 hover:dark:bg-slate-300" }
    }}
  />);
});

export default MenuItem;