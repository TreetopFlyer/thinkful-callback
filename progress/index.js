var Emitter = require('../emitter');

function Progress(){
    Emitter.call(this);
    this.progIndex = 0;
    this.progInterval = 10;
    this.progMax = 100;
    
    this.timeTimer = false;
    this.timeDelay = 100;
    this.timeDeviation = 50;
}

Progress.prototype = Object.create(Emitter.prototype);

Progress.prototype.timeUpdate = function(){
    var delay;
    var context;
    
    delay = this.timeDelay + this.timeDeviation * (Math.random()*2 - 1);
    context = this;
    this.timeTimer = setTimeout(function(){context.timeDone.call(context);}, delay);
};

Progress.prototype.timeDone = function()
{
    this.progIndex++;

    if(this.progIndex % this.progInterval === 0){
        this.emit('progress', {percent:this.percent()});
    }
    
    if(this.progIndex >= this.progMax){
        this.progIndex = this.progMax;
        this.emit('end', {percent:this.percent()});
        
        this.stop();
        return;
    }
    
    this.timeUpdate();
};

Progress.prototype.percent = function(){return this.progIndex/this.progMax;};
Progress.prototype.start = function(){
    this.progIndex = 0;
    this.emit('start', {percent:this.percent()});
    this.timeUpdate();
};
Progress.prototype.stop = function(){
    clearTimeout(this.timeTimer);
};

module.exports = Progress;