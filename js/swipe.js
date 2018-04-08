$(document).one('pageinit', function () {

    $('#findcontent').off("swipeleft").one("swipeleft", function () {
        console.log("active");
        $.mobile.changePage("activerides.html");
    });

    $('#findcontent').off("swiperight").one("swiperight", function () {
        console.log("create");
        $.mobile.changePage("create-ride.html");
    });

    $('#activecontent').off("swiperight").one("swiperight", function () {
        console.log("find right");
        $.mobile.changePage("findride.html");
    });

    $('#createcontent').off("swipeleft").one("swipeleft" ,function () {
        console.log("find left");
        $.mobile.changePage("findride.html");

    });

    $('.footer').off("click").one("click", function () {
        console.log("acc");
        $.mobile.changePage("account.html", {transition: "slideup"});
    });

    $('#dismissAcc').off("click").one("click", function () {
        //Change to previous page?
        $.mobile.changePage("findride.html", {transition: "slidedown"});

    });
});