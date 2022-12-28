const MenuSection = ({ children, label }: { children: React.ReactNode; label: string; }): JSX.Element => {
  return (
    <li className="list-none pl-2" >
      <span className="block pt-3 pr-0 pb-1 pl-3">{label}</span>
      <ul>{children}</ul>
    </li>
  );
}

export default MenuSection;