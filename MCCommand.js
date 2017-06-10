
var COMMAND_SIGNAL = "#";

function MCCommand(user, content) {
    this.user = user;
    this.content = content;

    var contentArray = content.split(" ");

    for (var i = 0; i < contentArray.length; i++) {
        contentArray[i] = contentArray[i].toLowerCase();
    }

    this.title = contentArray.shift();
    this.title = this.title.substring(COMMAND_SIGNAL.length);

    this.args = contentArray;
}

MCCommand.COMMAND_SIGNAL = COMMAND_SIGNAL;

module.exports = MCCommand;