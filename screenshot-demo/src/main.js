const electron = require('electron');

const {app, BrowserWindow, globalShortcut} = electron;

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
        width: 900,
        height: 900,
        resizeable:false,
        frame: false
    });

    mainWindow.loadURL(`file://${__dirname}/capture.html`);

    mainWindow.on('close', ()=>{
        mainWindow = null;
    });

    globalShortcut.register('CommandOrControl+Alt+D', ()=>{
        mainWindow.webContents.send('capture', app.getPath('pictures'));
    })
});