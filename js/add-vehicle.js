$(document).ready(function() {
    event.preventDefault();

    /*
    $.ajax({
        type: 'POST',
        url: 'control/login-handler.php',
        success: function (data) {
            if(data === 'already logged in'){
                $.mobile.navigate("findride.html");
            }
        }
    });
    */

    $("#submit-vehicle").on("click", function () {
        /* Getting input box values */
        var registration = document.getElementById("registration").value;
        var model = document.getElementById("model").value;
        var seats = document.getElementById("seats").value;

        /* Labels */
        var regLabel = document.getElementById("regLabel");
        var modelLabel = document.getElementById("modelLabel");
        var seatsLabel = document.getElementById("seatsLabel");


        var success = true;

        if (registration == "") {
            regLabel.style.color = "Red"
            success = false;
        }
        if (model == "") {
            modelLabel.style.color = "Red"
            success = false;
        }

        if (success == true) {

            /*Posting to php*/
            var postData = {
                registration: registration,
                model: model,
                seats: seats
            };

            $.ajax({
                type: "POST",
                url: "control/add-vehicle-handler.php",
                data: postData,
                success: function (data) {
                    console.log(data);
                    $('[data-role=dialog]').dialog("close");
                    $('#add-vehicle-text').html("");
                }
            });
        }

    });
});