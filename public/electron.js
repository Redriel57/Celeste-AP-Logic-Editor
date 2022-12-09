const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const devTools = require('electron-devtools-installer');

const createWindow = () => {
  
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  browserWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);

  if (isDev) browserWindow.webContents.openDevTools({ mode: "detach" });
}

app.whenReady().then(() => {
  createWindow()

  if (isDev) {
    devTools.default(devTools.REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((error) => console.log(`An error occurred: , ${error}`));
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

if (require("electron-squirrel-startup")) {
  app.quit();
}