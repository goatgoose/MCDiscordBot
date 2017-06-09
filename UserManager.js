
var fs = require('fs');

function UserManager(verifiedUsersPath) {
    this.verifiedUsersPath = verifiedUsersPath;

    this.verifiedUsers = [];

    var verifiedUsersFile = fs.readFileSync(this.verifiedUsersPath, 'utf8');
    if (verifiedUsersFile.length > 0) {
        this.verifiedUsers = JSON.parse(verifiedUsersFile);
    }

    this.pendingVerifiers = [];
    this.connectedUsers = [];
    this.recentlyDisconnectedUsers = []; // for daytime notifications
}

UserManager.prototype.startVerification = function(verifier) {
    this.pendingVerifiers.push(verifier);
};

UserManager.prototype.finishVerification = function(verifier) {
    if (verifier.user.isVerified()) {
        this.pendingVerifiers.splice(this.pendingVerifiers.indexOf(verifier), 1);
        this.addVerifiedUser(verifier.user);
    }
};

UserManager.prototype.addVerifiedUser = function(user) {
    this.verifiedUsers.push(user);
    fs.writeFile(this.verifiedUsersPath, JSON.stringify(this.verifiedUsers, null, 4), {flag: 'w'}, function(error) {
        console.log("saved file");
    });
};

UserManager.prototype.getPendingVerifierByToken = function(token) {
    for (var i = 0; i < this.pendingVerifiers.length; i++) {
        if (this.pendingVerifiers[i].token == token) {
            return this.pendingVerifiers[i];
        }
    }
    return null;
};

UserManager.prototype.getPendingVerifierByDiscordUser = function(discordUser) {
    for (var i = 0; i < this.pendingVerifiers.length; i++) {
        if (this.pendingVerifiers[i].user.discordUser == discordUser) {
            return this.pendingVerifiers[i];
        }
    }
};

UserManager.prototype.getVerifiedUserByMCUser = function(mcUser) {
    for (var i = 0; i < this.verifiedUsers.length; i++) {
        if (this.verifiedUsers[i].mcUser == mcUser) {
            return this.verifiedUsers[i];
        }
    }
    return null;
};

UserManager.prototype.getVerifiedUserByDiscordUser = function(discordUser) {
    for (var i = 0; i < this.verifiedUsers.length; i++) {
        if (this.verifiedUsers[i].discordUser == discordUser) {
            return this.verifiedUsers[i];
        }
    }
    return null;
};

UserManager.prototype.getMCUserFromDiscordUser = function(discordUser) {
    return null;
};

UserManager.prototype.getDiscordUserFromMCUser = function(mcUser) {
    return null;
};

module.exports = UserManager;