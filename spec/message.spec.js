const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    test("Test4: throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Error! Name is required.'));
    });

    test("Test5: constructor sets name", function(){
        let messageNameTest = new Message("TestTestTestTest");
        expect(messageNameTest.name).toEqual("TestTestTestTest");
    });
    
    test("Test6: contains a commands array passed into the constructor as the 2nd argument", function(){
        let commands = [new Command('MODE_CHANGE', 1220), new Command('STATUS_CHECK')];
        let testObj = new Message("TestTestTestTest", commands);
        expect(testObj.commands[0].value).toEqual(1220);
        expect(testObj.commands).toBeInstanceOf(Array);

    });
     
});
