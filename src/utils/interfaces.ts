import Area from "./data/Area";
import { State, ToolState, Difficulty } from './enums';

interface Coordinate {
  x: number;
  y: number;
}

interface HeaderInterface {
  setDarkMode: (darkMode: boolean) => void;
  darkMode: boolean;
  setState: (state: State) => void;
  setArea: (area: Area) => void;
  currentArea: Area;
}

interface SettingsJSON {
  defaultTheme: string;
}

interface FieldInterface {
  onChange: () => void;
  name: string;
  defaultChecked: boolean;
}

interface ToolInterface {
  func: () => void;
  icon: JSX.Element;
  tooltip: string;
  sideOpen: boolean;
  toggled: boolean;
}

interface CanvasProps {
  tool: ToolState;
  setSelected: (item: string | null) => void;
  selected: string | null;
  currentArea: Area;
}

interface ComponentDataInterface {
  selected: string | null;
}

interface FileTree {
  name: string;
  content: File | FileTree[];
}

interface SubMenuData {
  subMenuName: string;
  fields: FieldData[];
}

interface FieldData {
  name: string;
  enabled: boolean;
  onClick: () => void;
}

export type { HeaderInterface, SettingsJSON, FieldInterface, ToolInterface, CanvasProps, ComponentDataInterface, Coordinate, Difficulty, FileTree, SubMenuData };