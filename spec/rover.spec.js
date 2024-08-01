const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  test("Test7: constructor sets position and default values for mode and generatorWatts", function(){
    let roverTest = new Rover(12000);
    expect(roverTest.position).toEqual(12000);
    expect(roverTest.mode).toBe('NORMAL');
    expect(roverTest.generatorWatts).toEqual(110);
  });
  
  test("Test8: response returned by receiveMessage contains the name of the message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Testing message name', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual(message.name);
  });

  test("Test9: response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    expect(commands.length).toEqual(response.results.length);
  });

  test("Test10: responds correctly to the status check command", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test status checl command', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toBeTruthy();
    expect(response.results[1].roverStatus).toEqual({ mode: 'LOW_POWER', generatorWatts: 110, position: 98382 });
  });

  test("Test11: responds correctly to the mode change command", function(){
    let commands = [ new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test mode change command', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBeTruthy();
    expect(rover.mode).toEqual('LOW_POWER');
    
  });

  test("Test12: responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 10000)];
    let message = new Message('Test move command on low_power mode', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toBeFalsy();
    expect(rover.position).toEqual(98382);
  });

  test("Test13: responds with the position for the move command", function(){
    let commands = [new Command('MOVE', 30000), new Command('MOVE', 10000)];
    let message = new Message('Test move command', commands);
    let rover = new Rover(100);    
    rover.receiveMessage(message);
    expect(rover.position).toEqual(10000);
  });
});
