const Discord = require('discord.js');
const client = new Discord.Client();
var spawn = require('child_process').spawn;

// TODO
// - commands for me only
// - dedicated text channel for cross conversing and server communication logs
// - make some commands available for all (command wrapper?)

var MC_VERSION = "1.12-pre7";
var DO_SEND_TO_CHANNEL = true;

var serverInstance;

function getChannel(channelName) {
    var channels = client.channels.array();
    for (var channel in channels) {
        if (channels[channel].name == channelName) {
            return channels[channel];
        }
    }
    return undefined;
}

function sendToServerChannel(message) {
    if (DO_SEND_TO_CHANNEL) {
        getChannel("server").send(message);
    } else {
        console.log("WOULD SEND TO CHANNEL: " + message);
    }
}

client.on('ready', function() {
    console.log('discord app init');
    process.chdir("mcserver");
    serverInstance = spawn("java", ["-jar", "minecraft_server." + MC_VERSION + ".jar", "nogui"]);

    serverInstance.stdout.on('data', function(stdout) {
        var out = stdout.toString().trim();
        out = out.substring(out.indexOf("]") + 2);
        out = out.substring(out.indexOf("]") + 3);
        console.log(out);

        if (out[0] == "<") { // its a player message
            sendToServerChannel(out);
        } else {
            if (out.includes("Done")) { // the server just started
                sendToServerChannel("@everyone The server was just launched! If you do not wish to receive push notifications for server events, disable notifications for the 'server' channel in Notification Settings at the top left. To talk to players on the server, simply send a message in this channel.")

            } else if (out.includes("Stopping server")) { // the server was stopped
                sendToServerChannel("The server has been stopped.");

            } else if (out.includes("joined the game")) { // a player has joined the game
                sendToServerChannel(out + "!");

            } else if (out.includes("left the game")) { // a player has left the game
                sendToServerChannel(out + ".");
            }
        }
    });

    serverInstance.stderr.on('data', function(stderr) {
        console.log(stderr.toString().trim());
    });

    serverInstance.on('exit', function(exitCode) {
        console.log("server exit with code: " + exitCode.toString().trim());
    });
});

client.on('message', function(message) {
    if (message.channel.name == "server" && message.author.username != "mc-bot") {
        var output = {
            text: "[discord] [" + message.author.username + "] " + message.content
        };
        var toSend = "tellraw @a " + JSON.stringify(output);
        serverInstance.stdin.write(toSend + "\n");
        console.log(toSend);
    }
});

client.login('MzIwMDUzNDIzODI5NDE3OTg3.DBJ43w.U1GaTdH001wtPiUc50HwFzTrvKY');