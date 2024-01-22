
const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI || "mongodb+srv://appuser:AppData2022@cluster0.aga82.mongodb.net/tombook";
console.log("Db:", Db);
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            // Verify we got a good "db" object
            if (db) {
                _db = db.db("employees");
                console.log("Successfully connected to MongoDB.");
            }
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    },
};