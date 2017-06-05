
var COMMAND_SIGNAL = "#";

function MCCommand(rawLine) {
    this.rawLine = rawLine;
    var rawLineArray = rawLine.split(" ");

    this.user = rawLineArray.shift();
    this.user = this.user.substring(1, this.user.length - 1); // remove < >

    for (var i = 0; i < rawLineArray.length; i++) {
        rawLineArray[i] = rawLineArray[i].toLowerCase();
    }

    this.title = rawLineArray.shift();
    this.title = this.title.substring(COMMAND_SIGNAL.length);

    this.args = rawLineArray;
}

MCCommand.COMMAND_SIGNAL = COMMAND_SIGNAL;

module.exports = MCCommand;