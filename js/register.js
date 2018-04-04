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
        //TODO: Check email contains @, decided on password regex
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
                    if(data === "success"){
                        window.location.replace("https://devweb2017.cis.strath.ac.uk/~xsb15119/car-sharing/index.php");
                    }
                    else {
                        var code = data.charAt(1);
                        var field = data.charAt(0);
                       switch (code){
                           case '0':
                               switch (field){
                                   case 'e':
                                       emailLabel.style.color = "Red";
                                       emailLabel.append("Cannot be empty.");
                                       break;
                                   case 'f':
                                       fLabel.style.color = "Red";
                                       fLabel.append("Cannot be empty.");
                                       break;
                                   case 's':
                                       sLabel.style.color = "Red";
                                       sLabel.append("Cannot be empty.");
                                       break;
                                   case 'p':
                                       passwordLabel.style.color = "Red";
                                       break;
                               }
                               break;
                           case '1':
                               switch (field){
                                   case 'e':
                                       emailLabel.style.color = "Red";
                                       if(emailLabel.innerText.search(' Email already in use.') === -1)
                                           emailLabel.append(" Email already in use.");
                                       break;
                                   case 'f':
                                       fLabel.style.color = "Red";
                                       if(fLabel.innerText.search(' Contains non-letters') === -1)
                                         fLabel.append(" Contains non-letters.");
                                       break;
                                   case 's':
                                       sLabel.style.color = "Red";
                                       if(sLabel.innerText.search(' Contains non-letters') === -1)
                                           emailLabel.append(" Contains non-letters.");

                               }
                       }

                    }

                }
            });
        }

    });
});