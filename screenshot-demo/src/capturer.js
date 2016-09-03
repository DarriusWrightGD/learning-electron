const electron = require('electron');
const path = require('path');
const fs = require('fs');

const {ipcRenderer: ipc, desktopCapturer, screen} = electron;

function getMainSource(desktopCapturer, screen, done){
    const options = {types: ['screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize};
    desktopCapturer.getSources(options, (err, sources)=>{
        if(err) return console.log('Cannot capture screen:', err);

        const isMainSource = source => source.name === 'Entire screen' || source.name === 'Screen 1';
        done(sources.filter(isMainSource)[0]);
    });
}

function onCapture(event, targetPath) {
    console.log("Calling capture");
    getMainSource(desktopCapturer, screen, source =>{
        const png = source.thumbnail.toPng();
        const filePath = path.join(targetPath, `screenshot.png`);
        writeScreenshot(png, filePath);
    })
}

function writeScreenshot(png, filePath){
    fs.writeFile(filePath, png, err => {
        if (err) return console.log(`Failed to write to ${filePath} : ${err}`);
        console.log("Writing the screen shot");
    });
}

ipc.on('capture', onCapture);