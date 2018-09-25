//The net module provides an asynchronous network API for 
//creating stream-based TCP or IPC servers and clients
var net = require('net');
//The readline module provides an interface for reading 
//data from a Readable stream (such as process.stdin) one line at a time.
var readline = require('readline');
var colors = require('colors');
const rl = readline.createInterface({
	input: process.stdin, //input = keyboard
	output: process.stdout //output = terminal
});
var client = new net.Socket(); //Create a new socket object from the net module

//Emitted when a socket connection is successfully established
client.connect(5000, '127.0.0.1', function() {
	console.log('Client id = [' + client.localAddress + " : " + client.localPort + ']');
});

//Emitted when data is received. 
client.on('data', function(data) {
	console.log('Received a message!!!' + "\n>>\n" + data + "<<");
	getUinput();
});

//Emitted once the socket is fully closed
client.on('close', function() {
	console.log('Connection closed');
});

//Emitted when an error occurs. The 'close' event will be called directly following this event.
client.on('error', function () {
	console.log(colors.red("\nInternal Error 500\nTerminating...\n") + "<<<");
	process.exit();
});

//Initially called from the very first moment of the connection
function getUinput(){
	//A prompt shows up in the user and we set a callback
	//with the user's input as argument
	rl.question('>>>', function(answer) {
		if(String(answer) === 'q'){//quit on q
			client.destroy();//close the socket	  
			rl.close();//close the stream from readline
		}
		else{
			client.write(String(answer));//user input is sent to the other side of the socket
			getUinput();//recursive call to this function, so the user can send again a message
		}
	});
}