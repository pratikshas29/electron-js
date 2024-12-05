const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      enableRemoteModule: true
    }
  });

  // Load the index.html from a url in dev mode or the local file in production
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    // Open the DevTools in development mode.
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load from the build directory
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'))
      .catch(err => {
        console.error('Failed to load index.html:', err);
        // Try alternative path
        mainWindow.loadFile(path.join(process.resourcesPath, 'build', 'index.html'))
          .catch(err2 => {
            console.error('Failed to load alternative path:', err2);
          });
      });
  }

  // Log loading errors
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', {
      errorCode,
      errorDescription,
      currentDirectory: __dirname,
      resourcesPath: process.resourcesPath
    });
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  // Log any uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
