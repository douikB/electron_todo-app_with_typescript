const {app, BrowserWindow} = require("electron");
const path = require("path");

function createWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            contextIsolated: true,
        },
    });

    if (process.env.ELECTRON_START_URL) {
        win.loadURL(process.env.ELECTRON_START_URL);
    } else {
        win.loadfile(path.join(__dirname, "../build/index.html"));
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") app.quit();
});