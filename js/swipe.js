$(document).one('pageinit', function () {

    $('#findcontent').one("swipeleft", function () {
        $.mobile.changePage("activerides.html");
    });

    $('#findcontent').one("swiperight", function () {
        $.mobile.changePage("create-ride.html");
    });

    $('#activecontent').one("swiperight", function () {
        $.mobile.changePage("findride.html");
    });

    $('#createcontent').one("swipeleft" ,function () {
        $.mobile.changePage("findride.html");

    });

    $('.footer').one("click", function () {
        $.mobile.changePage("account.html", {transition: "slideup"});
    });

    $('#dismissAcc').one("click", function () {
        //Change to previous page?
        $.mobile.changePage("findride.html", {transition: "slidedown"});

    });
});