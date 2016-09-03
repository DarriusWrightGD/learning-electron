const electron = require('electron');
const countdown = require('./countdown');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

let main
const windows = [];

app.on('ready', ()=>{
    [1,2,3].forEach(()=>{
        window = new BrowserWindow({
            height: 400,
            width: 400
        });

        window.loadURL(`file://${__dirname}/countdown.html`);

        window.on('closed', ()=>{
            window = null;
        });

        windows.push(window)
    });
    
});

ipc.on('countdown-start', ()=>{
    countdown(count => {
        windows.forEach((window)=>{
            window.webContents.send('countdown', count);
        });
    });
})