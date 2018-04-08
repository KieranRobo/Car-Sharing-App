$(document).one('pageinit', function () {

    $('#findcontent').one("swipeleft", function () {
        console.log("to activerides");
        $.mobile.changePage("activerides.html");
    });

    $('#findcontent').one("swiperight", function () {
        console.log("to create rides");
        $.mobile.changePage("create-ride.html");
    });

    $('#activecontent').one("swiperight", function () {
        console.log("to findrides");

        $.mobile.changePage("findride.html");
    });
});
