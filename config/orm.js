// Import MySQL connection.
var connection = require("../config/connection");



// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Veggie Burger => 'Veggie Burger')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Veggie Burger'} => ["name='Veggie Burger'"]
            // e.g. {devoured: true} => ["devoured=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    // An example of objColVals would be {name: Veggie Burger, devoured: true}
    updateOne: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    
};

// Export the orm object for the model (cat.js).
module.exports = orm;

// creates the methods that will execute the necessary MySQL commands in the controllers
// var orm = {
//     selectAll: function (tableInput, cb) {
//         var queryString = "SELECT * FROM ??;";
//         connection.query(queryString, [tableInput], function (err, res) {
//             if (err) {
//                 throw err;
//             }
//             cb(res);
//         })
//     },

//     insertOne: function (table, cols, vals, cb) {

//         var queryString = "INSERT INTO ?? (??) VALUES (?)";
//         console.log(queryString);

//         connection.query(queryString, [table, cols, vals], function (err, res) {
//             if (err) {
//                 throw err;
//             }
//             cb(res);
//         })

//     },

//     updateOne: function (table, objColVals, cb) {
//         var queryString = "UPDATE ?? SET ? WHERE ?";
//         console.log(queryString);

//         const query = connection.query(queryString, [table, objColVals, condition], function (err, res) {
//             console.log(query.sql);
//             if (err) {
//                 throw err;
//             }
//             cb(res);
//         })
//     },
// }

// module.exports = orm;