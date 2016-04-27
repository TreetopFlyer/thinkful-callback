
function Progress(){

    this.progIndex = 0;
    this.progInterval = 10;
    this.progMax = 100;
    
    this.timeTimer = false;
    this.timeDelay = 300;
    this.timeDeviation = 250;
}

Progress.prototype.timeUpdate = function(){
    var delay;
    delay = this.timeDelay + this.timeDeviation * (Math.random()*2 - 1);
    var context = this;
    this.timeTimer = setTimeout(function(){context.timeDone.call(context);}, delay);
};

Progress.prototype.timeDone = function()
{
    this.progIndex++;

    if(this.progIndex % this.progInterval === 0){
        this.onProgress(this.percent());
    }
    
    if(this.progIndex >= this.progMax){
        this.progIndex = this.progMax;
        this.onEnd(this.percent());
        this.stop();
        return;
    }
    
    this.timeUpdate();
};

Progress.prototype.percent = function(){return this.progIndex/this.progMax;};

Progress.prototype.onStart = function(inPercent){};
Progress.prototype.onProgress = function(inPercent){};
Progress.prototype.onEnd = function(inPercent){};

Progress.prototype.start = function(){
    this.progIndex = 0;
    this.onStart(this.percent());
    this.timeUpdate();
};
Progress.prototype.stop = function(){
    clearTimeout(this.timeTimer);
};

//////////////////////////////////////////////

var progress = new Progress();
progress.onProgress = function(inPerc){
    console.log(inPerc*100, "% completed");
};
progress.onStart = function(inPerc){
    console.log("started");
};
progress.onEnd = function(inPerc){
    console.log("done");
};
progress.start();
