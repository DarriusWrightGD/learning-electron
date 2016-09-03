module.exports = function countdown(tick) {
    let count = 10;
    tick(count);
    let timer = setInterval(()=>{
        tick(count--);
        if(count < 0){
            clearInterval(timer);
        }
    }, 1000);
};