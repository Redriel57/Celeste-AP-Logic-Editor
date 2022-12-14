enum State {
  None,
  Editor,
  Settings
}

enum CanvasState {
  Area,
  Room
}

enum ToolState {
  None,
  Room,
  Node,
  Edge
}

enum Difficulty {
  Vanilla
}

enum Tricks {
  WaveDash
}

enum Errors {
  None,
  Duplicate,
  InvalidFormat
}

enum Zoom {
  In,
  Out,
  Reset,
  Fit
}

export { State, CanvasState, ToolState, Difficulty, Tricks, Errors, Zoom };