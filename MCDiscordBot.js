const Discord = require('discord.js');
const client = new Discord.Client();
var spawn = require('child_process').spawn;
var ServerLogLine = require('./ServerLogLine');

// TODO
// - commands for me only
// x dedicated text channel for cross conversing and server communication logs
// - make some commands available for all (command wrapper?)
// - death notifications
// - pin server status
// - add timestamps back
// - new discord to server format
//   - @goatgoose1142: test message
//   - color name with discord color

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
        var logLine = new ServerLogLine(out);

        switch (logLine.logType) {
            case ServerLogLine.LogType.PLAYER_MESSAGE:
                sendToServerChannel("[" + logLine.timestamp + "] " + logLine.content);
                break;
            case ServerLogLine.LogType.SERVER_START:
                sendToServerChannel("@everyone The server was just launched! If you do not wish to receive push notifications for server events, disable notifications for the 'server' channel in Notification Settings at the top left. To talk to players on the server, simply send a message in this channel.")
                break;
            case ServerLogLine.LogType.SERVER_STOP:
                sendToServerChannel("The server has been stopped.");
                break;
            case ServerLogLine.LogType.PLAYER_JOIN:
                sendToServerChannel(logLine.content + "!");
                break;
            case ServerLogLine.LogType.PLAYER_LEAVE:
                sendToServerChannel(logLine.content + ".");
                break;
            case ServerLogLine.LogType.PLAYER_DEATH:
                sendToServerChannel(logLine.content);
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
        var output = ["", {
            text: "@" + message.author.username + ":",
            hoverEvent: {
                action: "show_text",
                value: "From Discord"
            },
            bold: false,
            color: "aqua"
        }, {
            text: " " + message.content
        }];
        var toSend = "tellraw @a " + JSON.stringify(output);
        serverInstance.stdin.write(toSend + "\n");
        console.log(toSend);
    }
});

client.login('MzIwMDUzNDIzODI5NDE3OTg3.DBJ43w.U1GaTdH001wtPiUc50HwFzTrvKY');