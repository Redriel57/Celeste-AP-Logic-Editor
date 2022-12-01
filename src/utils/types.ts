enum State {
  None = "None",
  Editor = "Editor",
  Settings = "Settings"
}

interface HeaderInterface {
  setDarkMode: (darkMode: boolean) => void;
  darkMode: boolean;
  setState: (state: State) => void;
  parseFile: (text: string) => void;
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
}

export { State };
export type { HeaderInterface, SettingsJSON, FieldInterface, ToolInterface };