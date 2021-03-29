const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.produtos = require("./produto.js")(mongoose);
// db.role = require("./role.js")(mongoose);
db.user = require("./user.js")(mongoose);

// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;