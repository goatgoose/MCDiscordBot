
function UserManager(verifiedUsersPath) {
    this.verifiedUsersPath = verifiedUsersPath;
    this.verifiedUsers = [];
    this.pendingVerifiers = [];
    this.serverConnectedUsers = [];

    this.updateVerifiedUsers();
}

UserManager.prototype.updateVerifiedUsers = function() {
    // read from disk and load to verifiedUsers
};

UserManager.prototype.getPendingVerifierByMCUser = function(mcUser) {
    for (var i = 0; i < this.pendingVerifiers.length; i++) {
        if (this.pendingVerifiers[i].mcUser == mcUser) {
            return this.pendingVerifiers[i];
        }
    }
    return null;
};

UserManager.prototype.getPendingVerifierByDiscordUser = function(discordUser) {
    for (var i = 0; i < this.pendingVerifiers.length; i++) {
        if (this.pendingVerifiers[i].discordUser == discordUser) {
            return this.pendingVerifiers[i];
        }
    }
    return null;
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