var net = require('net');
var readline = require('readline');
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