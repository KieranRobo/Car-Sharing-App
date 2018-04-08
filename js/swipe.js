$(document).on('pageinit', function () {

    $('#findcontent').one("swipeleft", function () {
        $.mobile.changePage("activerides.html");
    });

    $('#findcontent').one("swiperight", function () {
        $.mobile.changePage("create-ride.html");
    });

    $('#activecontent').one("swiperight", function () {
        $.mobile.changePage("findride.html");
    });
});
