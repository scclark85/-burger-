$(function () {
    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#addburger").val().trim(),

        };

        // sends the POST request.
        $.ajax("api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
        });
    });

    $(".eatburger").on("click", function (event) {
        event.preventDefault();

        var devouredBurger = {
            name: $("#name").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };

        // var id = $(this).data("id");
        // var devouredState = {
        //     devoured: 1
        // };

        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredBurger
        }).then(function () {
            console.log("Burger devoured");
            location.reload();
        });
    });

});