const exec = require('child_process').exec;
const fs = require('fs');
const os = require('os');

function isDir(dir){
    try {
        return fs.lstatSync(dir).isDirectory();
    } catch(e){
        return false;
    }
}

function checkGitStatus(dir) {
    exec('git status', {
      cwd: dir  
    }, (err, stdout, stderr) =>{
        console.log("err", err);
        console.log("stdout", stdout);
        console.log("stderr", stderr);

        if(err) return setStatus('unknown');

        if(/nothing to commit/.test(stdout)) return setStatus('clean');

        return setStatus('dirty');
    })
}

function formatDir(dir) {
    return /^~/.test(dir) ? os.homedir() + dir.substr(1).trim() : dir.trim();
}

function removeStatus(){
    const element = document.getElementById('status');
    element.classList.remove('unknown', 'clean', 'dirty');
    return element;
}

function setStatus(status) {
    const element = removeStatus();
    element.classList.add(status);
}

let timer;

document.getElementById('input').addEventListener('keyup', event => {
    removeStatus();
    clearTimeout(timer);
    timer = setTimeout(_ => {
        const dir = event.target.value;
        if(isDir(dir)){
            checkGitStatus(dir);
        }
    }, 500)
});