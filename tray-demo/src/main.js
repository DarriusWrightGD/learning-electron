const electron = require('electron');
const path = require('path');

const {app, Tray, Menu} = electron;

app.on('ready', ()=>{
    const tray = new Tray(path.join('src', 'trayIcon.png'));
    const contextMenu = Menu.buildFromTemplate([
        {label: 'Wow', click: ()=> console.log('wow')},
        {label: 'Awesome', click: ()=> console.log('awesome')}
    ]);

    tray.setContextMenu(contextMenu);
    tray.setToolTip('My great app');
})
