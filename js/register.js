$(document).ready(function () {

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

        /*Posting to php*/
        var newUserData = "forename=" + forename + "&surname=" + surname + "&email=" + email + "&password=" + password;
        $.ajax({
            type: "POST",
            url: "control/register-handler.php",
            data: newUserData,
            success: function (data) {
                if (data === "success") {
                    window.location.replace("https://devweb2017.cis.strath.ac.uk/~xsb15119/car-sharing/index.php");
                }
                else {
                    for(var i=0; i<data.length; i+=2){
                        var code = data.charAt(i+1);
                        var field = data.charAt(i);
                        switch (code) {
                            case '0':
                                switch (field) {
                                    case 'e':
                                        if (emailLabel.innerText.search('Cannot be empty') === -1)
                                            emailLabel.append("Cannot be empty.");
                                        emailLabel.style.color = "Red";
                                        break;
                                    case 'f':
                                        fLabel.style.color = "Red";
                                        if (fLabel.innerText.search('Cannot be empty') === -1)
                                            fLabel.append("Cannot be empty.");
                                        break;
                                    case 's':
                                        sLabel.style.color = "Red";
                                        if (sLabel.innerText.search('Cannot be empty') === -1)
                                            sLabel.append("Cannot be empty.");
                                        break;
                                    case 'p':
                                        passwordLabel.style.color = "Red";
                                        break;
                                }
                                break;
                            case '1':
                                switch (field) {
                                    case 'e':
                                        emailLabel.style.color = "Red";
                                        if (emailLabel.innerText.search(' Email already in use.') === -1)
                                            emailLabel.append(" Email already in use.");
                                        break;
                                    case 'f':
                                        fLabel.style.color = "Red";
                                        if (fLabel.innerText.search(' Contains non-letters') === -1)
                                            fLabel.append(" Contains non-letters.");
                                        break;
                                    case 's':
                                        sLabel.style.color = "Red";
                                        if (sLabel.innerText.search(' Contains non-letters') === -1)
                                            emailLabel.append(" Contains non-letters.");

                                }
                                break;
                            case '2':
                                emailLabel.style.color = "Red";
                                if (emailLabel.innerText.search(' Not a valid email.') === -1)
                                    emailLabel.append(' Not a valid email.');
                                break;
                        }
                    }



                }

            }
        });


    });
});