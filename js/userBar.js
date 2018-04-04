
$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'userBar.php',
        success: function (data) {
            if(data !== ""){
               $('#userBar').append('<p>' + data + '</p> <button id="logout">Logout</button>');
               $('#logout').on("click", logout);
            }
            else {
                $('#userBar').append('Email : <input id="email" type="text"/> Password: <input id="password" type="password"> <button id="login">Login</button>');
                $('#login').on("click",  login);
            }
        }

    });


});



var logout = function () {
    $.ajax({
        type: 'POST',
        url: 'control/login-handler.php',
        data: "&logout=",
        success: function (data) {
            console.log(data);
            if(data === "success")
                location.reload();
        }
    })
};

var login = function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if(email === "" || password === "")
        $('#userBar').append("Missing Details");
    else{
        var data = "email=" + email + "&password=" + password;
        $.ajax({
            type: 'POST',
            url: 'control/login-handler.php',
            data: data,
            success: function (data) {
                if(data === "success")
                    location.reload();
                else
                    console.log(data);
            }
        });
    }
};