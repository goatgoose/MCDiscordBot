
var COMMAND_SIGNAL = "#";

function DiscordCommand(rawLine) {
    rawLine = rawLine.toLowerCase();
    this.rawLine = rawLine;
    var rawLineArray = rawLine.split(" ");

    this.title = rawLineArray.shift();
    this.title = this.title.substring(COMMAND_SIGNAL.length);

    this.args = rawLineArray;
}
DiscordCommand.COMMAND_SIGNAL = COMMAND_SIGNAL;

module.exports = DiscordCommand;