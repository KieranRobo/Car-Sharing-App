$(document).one('pageinit', function () {

    $('#findcontent').off("swipeleft").one("swipeleft", function () {
        $.mobile.changePage("activerides.html");
    });

    $('#findcontent').off("swiperight").one("swiperight", function () {
        $.mobile.changePage("create-ride.html");
    });

    $('#activecontent').off("swiperight").one("swiperight", function () {
        $.mobile.changePage("findride.html");
    });

    $('#createcontent').off("swipeleft").one("swipeleft" ,function () {
        $.mobile.changePage("findride.html");

    });

    $('.footer').off("click").one("click", function () {
        $.mobile.changePage("account.html", {transition: "slideup"});
    });

    $('#dismissAcc').off("click").one("click", function () {
        //Change to previous page?
        $.mobile.changePage("findride.html", {transition: "slidedown"});

    });
});