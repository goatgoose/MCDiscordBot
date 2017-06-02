
function ServerLogLine(rawLine) {
    this.timestamp = rawLine.substring(1, rawLine.indexOf("]"));
    rawLine = rawLine.substring(this.timestamp.length + 4); // end of bracket + whitespace + first thread bracket

    this.thread = rawLine.substring(0, rawLine.indexOf("/"));
    rawLine = rawLine.substring(this.thread.length + 1); // + slash

    this.priority = rawLine.substring(0, rawLine.indexOf("]"));
    rawLine = rawLine.substring(this.priority.length + 3); // + bracket + colon + whitespace

    this.content = rawLine;

    if (this.content[0] == "<") { // its a player message
        this.logType = ServerLogLine.LogType.PLAYER_MESSAGE;
    } else {
        if (this.content.includes("Done")) { // the server just started
            this.logType = ServerLogLine.LogType.SERVER_START;
        } else if (this.content.includes("Stopping server")) { // the server was stopped
            this.logType = ServerLogLine.LogType.SERVER_STOP;
        } else if (this.content.includes("joined the game")) { // a player has joined the game
            this.logType = ServerLogLine.LogType.PLAYER_JOIN;
        } else if (this.content.includes("left the game")) { // a player has left the game
            this.logType = ServerLogLine.LogType.PLAYER_LEAVE;

        // http://minecraft.gamepedia.com/Health#Death_messages
        } else if ( this.content.includes("was") ||
                    this.content.includes("hugged a cactus") ||
                    this.content.includes("walked into a") ||
                    this.content.includes("drowned") ||
                    this.content.includes("experienced kinetic energy") ||
                    this.content.includes("removed an elytra while flying") ||
                    this.content.includes("blew up") ||
                    this.content.includes("hit the ground") ||
                    this.content.includes("fell") ||
                    this.content.includes("went up in flames") ||
                    this.content.includes("burned to death") ||
                    this.content.includes("walked into a fire") ||
                    this.content.includes("went off with") ||
                    this.content.includes("tried to") ||
                    this.content.includes("discovered") ||
                    this.content.includes("got finished off") ||
                    this.content.includes("starved") ||
                    this.content.includes("suffocated") ||
                    this.content.includes("has been demolished") ||
                    this.content.includes("withered")) {
            this.logType = ServerLogLine.LogType.PLAYER_DEATH;
        }
    }
}

ServerLogLine.LogType = {
    PLAYER_MESSAGE: 0,
    SERVER_START: 1,
    SERVER_STOP: 2,
    PLAYER_JOIN: 3,
    PLAYER_LEAVE: 4,
    PLAYER_DEATH: 5
};

module.exports = ServerLogLine;