
function User() {
    this.mcUser = null;
    this.discordUser = null;
}

User.prototype.isVerified = function() {
    return this.mcUser != null && this.discordUser != null;
};

module.exports = User;