var Progress = require('./progress');

//////////////////////////////////////////////

var progress = new Progress();

progress.on('progress', function(inEvent){
    console.log(inEvent.percent*100, "% completed");
});
progress.on('start', function(inEvent){
    console.log("started");
});
progress.on('end', function(inEvent){
    console.log("done");
});
progress.start();

