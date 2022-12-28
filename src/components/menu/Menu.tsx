import { forwardRef, ForwardedRef } from 'react';
import MenuUnstyled, { MenuUnstyledProps } from '@mui/base/MenuUnstyled';
import Popper from './Popper';
import { SubMenuData } from '../../utils/interfaces';
import MenuSection from './MenuSection';
import MenuItem from './MenuItem';

const Menu = forwardRef(function Menu(props: MenuUnstyledProps, ref: ForwardedRef<HTMLUListElement>) {
  return (<MenuUnstyled
    {...props}
    ref={ref}
    slots={{root: Popper}}
    slotProps={{
      listbox: { className: `text-sm box-border p-1 overflow-auto outline-none bg-slate-100 dark:bg-slate-800 border-solid border-1 shadow-md border-slate-200 dark:border-slate-700 text-black dark:text-white`}
    }}
  />);
});

const createMenu = (anchor: HTMLDivElement | null, data: SubMenuData[]): JSX.Element => {
  return (<Menu
    anchorEl={anchor}
    open={!!anchor}
  >
    {data.map(({ subMenuName, fields}) =>
      <MenuSection label={subMenuName}>{
        fields.map(({ onClick, name, enabled }) =>
          <MenuItem disabled={!enabled} onClick={() => onClick()}>{name}</MenuItem>
        )
      }</MenuSection>
    )}
  </Menu>)
}

export default createMenu;
export { Menu };
