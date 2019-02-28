var express = require("express");

var router = express.Router();

// Import the model (buger.js) to use its database functions.
var burger = require("../models/burger");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/burgers", function (req, res) {
  burger.insertOne([
    "burger_name"
  ], [
      req.body.burger_name
    ], function (data) {
      // Send back the ID of the new quote
      res.redirect("/");
    });
});

router.put("/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
    devoured: True
  }, condition, function() {
    res.redirect("/");
  });
});


// Export routes for server.js to use.
module.exports = router;