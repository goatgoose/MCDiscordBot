
var User = require('./User');

function Verifier() {
    this.user = new User();
    this.token = "";

    this.generateToken();
}

Verifier.prototype.generateToken = function() {
    for (var i = 0; i < 5; i++) {
        this.token += Math.floor((Math.random() * 9)).toString();
    }
};

Verifier.prototype.addMCUser = function(mcUser) {
    if (this.user.mcUser == null) {
        this.user.mcUser = mcUser;
    }
};

Verifier.prototype.addDiscorUser = function(discordUser) {
    if (this.user.discordUser == null) {
        this.user.discordUser = discordUser;
    }
};

module.exports = Verifier;