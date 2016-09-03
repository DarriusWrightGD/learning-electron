const electron = require('electron');
const path = require('path');
//open clipboard failed code 5
const {app, clipboard, globalShortcut, Tray, Menu} = electron;

const STACK_SIZE =  5;
const ITEM_MAX_LENGTH = 20;

function addToStack(item, stack){
    return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0,stack.length-1) : stack);
}

function checkClipboardForChange(clipboard, onChange) {
    let cache = clipboard.readText();
    let latest;
    setInterval(()=>{
        latest= clipboard.readText();
        if(latest !== cache){
            cache = latest;
            onChange(cache);
        }
    })
}

function formatItem(item){
    return item && item.length > ITEM_MAX_LENGTH ? 
        item.substr(0,ITEM_MAX_LENGTH) + '...'
        : item;
}

function formatMenuTemplateForStack(stack){
    return stack.map((s,i)=>{
        return {
            label: `Copy: ${formatItem(s)}`,
            click: ()=> clipboard.writeText(s),
            accelerator: `CommandOrControl+${i+1}`
        }
    })
}

function registerShortcuts(globalShortcut, clipboard, stack) {
    globalShortcut.unregisterAll();
    stack.forEach((item,i)=>{
        globalShortcut.register(`CommandOrControl+${i+1}`, ()=>{
            clipboard.writeText(item);
        });
    });
}

app.on('ready', ()=>{
    let stack = [];
    const tray = new Tray(path.join('src', 'trayIcon.png'));
    tray.setContextMenu(Menu.buildFromTemplate([{label: '<Empty>', enabled: false}]))
    
    checkClipboardForChange(clipboard, text => {
       stack = addToStack(text,stack);
       tray.setContextMenu(Menu.buildFromTemplate(formatMenuTemplateForStack(stack)))
       registerShortcuts(globalShortcut, clipboard, stack)
     });
});


app.on('wiil-quit', ()=>{
    globalShortcut.unregisterAll();
})