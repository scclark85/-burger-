$(function () {
    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#brug").val().trim(),
            devoured: 0 
        };
        $.ajax("/api/burgers", {
            type: "POST",
            url: "/api/burgers",
            data: newBurger
        }).then(function (data) {
            console.log("boogers")
            location.reload();
        });
    });

    $(".eatburger").on("click", function (event) {
        event.preventDefault();
        console.log("click click");

        // var devouredBurger = {
        //     name: $("#name").val().trim(),
        //     devoured: $("[name=devoured]:checked").val().trim()
        // };

        var id = $(this).data("id");
        var newDevoured = $(this).data("devoured");
        var newDevouredState = {
            devoured: newDevoured
        };

        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(function () {
            console.log("Burger devoured");
            location.reload();
        });
    });

});