const Discord = require('discord.js');
const client = new Discord.Client();
var spawn = require('child_process').spawn;

var MC_VERSION = "1.12-pre7";

var serverInstance;

client.on('ready', function() {
    console.log('discord app init');
    process.chdir("mcserver");
    serverInstance = spawn("java", ["-jar", "minecraft_server." + MC_VERSION + ".jar", "nogui"]);

    serverInstance.stdout.on('data', function(stdout) {
        console.log(stdout.toString().trim());
    });

    serverInstance.stderr.on('data', function(stderr) {
        console.log(stderr.toString().trim());
    });

    serverInstance.on('exit', function(exitCode) {
        console.log("server exit with code: " + exitCode.toString().trim());
    });
});

client.on('message', function(message) {
    var output = {
        text: "[discord] [" + message.author.username + "] " + message.content
    };
    var send = "tellraw @a " + JSON.stringify(output);
    serverInstance.stdin.write(send + "\n");
    console.log(send);
});

client.login('MzIwMDUzNDIzODI5NDE3OTg3.DBJ43w.U1GaTdH001wtPiUc50HwFzTrvKY');