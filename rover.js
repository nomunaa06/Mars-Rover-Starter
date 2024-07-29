class Rover {
   constructor(position, mode="NORMAL", generatorWatts =110 ){
      this.position=position;
      this.mode=mode;
      this.generatorWatts=generatorWatts;
   }
   receiveMessage(message){
      this.message=message;
      let response={};
      response.message=message.name;
      response.results =[];
      let commands=message.commands;
         for(let i=0; i<commands.length; i++){
            if(this.mode === 'NORMAL'){
                  if(commands[i].commandType === "MOVE"){
                     this.position = commands[i].value; 
                     let result = {};
                     result.completed = true;
                     response.results.push(result);
                  }
                  else if (commands[i].commandType === "MODE_CHANGE"){
                     this.mode = commands[i].value;
                     let result = {};
                     result.completed = true;
                     response.results.push(result);
                  }
                  else if (commands[i].commandType === "STATUS_CHECK"){
                     let result = {};
                     result.completed = true;
                     result.roverStatus = {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position};
                     response.results.push(result);
                  }
               }
               else {
                  if(commands[i].commandType === "MOVE"){
                     let result = {};
                     result.completed = false;
                     response.results.push(result);
                  }
                  else if (commands[i].commandType === "MODE_CHANGE"){
                     this.mode = commands[i].value;
                     let result = {};
                     result.completed = true;
                     response.results.push(result);
                  }
                  else if (commands[i].commandType === "STATUS_CHECK"){
                     let result = {};
                     result.completed = true;
                     result.roverStatus = {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position};
                     response.results.push(result);
                  }
               }
      }
      return response;
   }
}

module.exports = Rover;