var net = require('net');
var readline = require('readline');
var colors = require('colors'); 
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
var client = new net.Socket();

client.connect(5000, '127.0.0.1', function() {
	console.log('Client id = [' + client.localAddress + " : " + client.localPort + ']');
});

client.on('data', function(data) {
	console.log('Received a message!!!' + "\n>>\n" + data + "<<");
	getUinput();
});

client.on('close', function() {
	console.log('Connection closed');
});

client.on('error', function () {
	console.log(colors.red("\nInternal Error 500\nTerminating...\n") + "<<<");
	process.exit();
});

function getUinput(){
	rl.question('>>>', function(answer) {
		// TODO: Log the answer in a database
		if(String(answer) === 'q'){
			client.destroy();	  
			rl.close();
		}
		else{
			client.write(String(answer));
			getUinput();
		}
	});
}