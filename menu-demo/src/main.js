const electron = require('electron');

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

app.on('ready', ()=>{
    new BrowserWindow();


    const name = electron.app.getName();
    const template = [
        {
            label: 'File',
            submenu: [{
                label:`About ${name}`,
                click: ()=>{
                    console.log('Clicked About');
                },
                role:'about'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                click: ()=>{
                    app.quit();
                },
                accelerator: 'Ctrl+Q'
            }]
        }
    ]

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});