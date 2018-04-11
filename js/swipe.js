$(document).one('pageinit', function () {
    console.log("ayy");
    $('#findcontent').off("swipeleft").one("swipeleft", function () {
        $.mobile.changePage("myrides.html");
    });

    $('#findcontent').off("swiperight").one("swiperight", function () {
        $.mobile.changePage("create-ride.html");
    });

    $('#my-rides-contentgi').off("swiperight").one("swiperight", function () {
        $.mobile.changePage("findride.html");
    });

    $('#createcontent').off("swipeleft").one("swipeleft" ,function () {
        $.mobile.changePage("findride.html");

    });

    $('.footer').off("click").one("click", function () {
        $.mobile.changePage("account.html", {transition: "slideup"});
    });

    $('#dismissAcc').off("click").one("click", function () {
       history.back();
    });
});