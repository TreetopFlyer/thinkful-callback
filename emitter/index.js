function Emitter(){
    this.listeners = {};
}
Emitter.prototype.constructor = Emitter;
Emitter.prototype.on = function(inType, inCallback){
    var type;
    
    type = this.listeners[inType];
    if(!type){
        type = this.listeners[inType] = [];
    }
    
    type.push(inCallback);
};
Emitter.prototype.emit = function(inType, inObject){
    var type;
    var i;
    
    type = this.listeners[inType];
    if(type){
        for(i=0; i<type.length; i++){
            type[i](inObject);
        } 
    }
};
Emitter.prototype.clear = function(inType, inCallback){
    var type;
    var i;
    
    type = this.listeners[inType];
    if(type){
        for(i=0; i<type.length; i++){
            if(type[i] === inCallback){
                type.splice(i, 1);
            }
        }
    }
};

module.exports = Emitter;