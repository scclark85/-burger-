// Import MySQL connection.
var connection = require("../config/connection");

// creates the methods that will execute the necessary MySQL commands in the controllers
var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM ??;";
        connection.query(queryString, [tableInput], function (err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        })
    },

    insertOne: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO (??) VALUES (?)";
        console.log(queryString);

        connection.query(queryString, [table, cols, vals], function (err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        })

    },

    updateOne: function (table, objColVals, cb) {
        var queryString = "UPDATE ?? SET ? WHERE ?";
        console.log(queryString);

        const query = connection.query(queryString, [table, objColVals, condition], function (err, res) {
            console.log(query.sql);
            if (err) {
                throw err;
            }
            cb(res);
        })
    },
}

module.exports = orm;