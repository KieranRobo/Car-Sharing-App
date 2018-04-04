$(document).ready(function(){

    $("#submit-new-user").on("click", function () {
        /* Getting input box values */
        var forename = document.getElementById("forename").value;
        var surname = document.getElementById("surname").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        /* Labels */
        var fLabel = document.getElementById("fNameLabel");
        var sLabel = document.getElementById("sNameLabel");
        var emailLabel = document.getElementById("emailLabel");
        var passwordLabel = document.getElementById("passwordLabel");

        var allFieldsCorrect = true;

        /* Checking forename and surname
            Allowing only a-z or A-Z characters
         */
        if(!/[a-zA-Z]+$/.test(forename)) {
            fLabel.style.color = "Red";
            allFieldsCorrect = false;
        }
        else
            fLabel.style.color = "Black";

        if(!/[a-zA-Z]+$/.test(surname)) {
            sLabel.style.color = "Red";
            allFieldsCorrect = false;
        }
        else
            sLabel.style.color = "Black";
        /* TODO: Check email and password */
        if(passwordLabel.value === "" || emailLabel.value === "")
            allFieldsCorrect = false;

        /*Posting to php*/
        if(allFieldsCorrect){
            var newUserData = "forename=" + forename + "&surname=" + surname + "&email=" + email + "&password=" + password;

            $.ajax({
                type: "POST",
                url: "control/register-handler.php",
                data: newUserData,
                success: function (data) {
                    console.log(data);
                }
            });
        }


    });
});