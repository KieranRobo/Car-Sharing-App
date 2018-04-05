var map;
var marker;

var setoffMap, destinationMap;

$(document).ready(function() {
    setoffMap = null;
    destinationMap = null;
    marker = null;

    var setoffLat, setoffLng;
    var destinationLat, destinationLng;
    var rideDestription;

    $("#location-selection").hide();
    $("#confirmation").hide();

    // Go from ride info screen to location selections
    $("#continue").on("click", function () {
        $("#ride-information").hide();
        $("#location-selection").show();

        rideDestription = $("#description").val();
    });

    // Go back from map to initial information screen
    $("#back2").on("click", function () {
        $("#location-selection").hide();
        $("#ride-information").show()
    });

    // Go back from confirmation to map
    $("#back3").on("click", function () {
        $("#confirmation").hide();
        $("#location-selection").show();
    });

    $("#submit-button").on("click", function () {

        if (marker == null) {
            alert("Please select a location before continuing!");
        }
        else
        {
            if (destinationMap == null) {
                $("#instruction-area").html("Finally, select your <strong>destination:</strong>");

                setoffLat = marker.getPosition().lat();
                setoffLng = marker.getPosition().lng();
                destinationMap = initMap();
            } else {
                destinationLat = marker.getPosition().lat();
                destinationLng = marker.getPosition().lng();

                $("#location-selection").hide();

                $("#confirmation-leaving-from").text("LAT: " + setoffLat + " LNG: " + setoffLng);
                $("#confirmation-going-to").text("LAT: " + destinationLat + " LNG: " + destinationLng);
                $("#confirmation-description").text(rideDestription);

                $("#confirmation").show();

                //$("#content-area").html("Added ride information<br> SETOFF: " + setoffCoords + "<br>DEST: " + desintationCoords);
            }
        }

    });

    $("#confirm").on("click", function () {

        // AJAX to create ride
        var postData = {
            setoffLat: setoffLat,
            setoffLng: setoffLng,
            destLat: destinationLat,
            destLng: destinationLng,
            description: rideDestription};

        $.post("control/create-ride-handler.php",
            postData,
            function(response, status) {
            if (response == '1') {
                $("#content-area").html("Successfully added ride. <a href='ajax-example.html'>check</a>");
            } else {
                $("#content-area").html("Error whilst trying to add ride.");
            }
            });

    });
});

this.initMap = function () {


    var search = document.getElementById('search');
    var searchButton = document.getElementById('search_button');

    var uluru = {lat: 55.864304, lng: -4.251686};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: uluru,
        componentRestrictions: {country: 'gb'}
    });


    var searchBox = new google.maps.places.SearchBox(search);

    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        places.forEach(function (place) {
            map.panTo(place.geometry.location);
            map.setZoom(16);

            moveMarker(place.geometry.location);
        });
    });

    if (marker != null) {
        new google.maps.Marker({
            position: marker.getPosition(),
            draggable:true,
            map: map
        });
    }

    map.addListener('click', function (event) {
        moveMarker(event.latLng);
    });

    return map;
};

this.moveMarker = function (coords) {
    if (marker != null) {
        marker.setMap(null);
    }
    marker = new google.maps.Marker({
        position: coords,
        draggable:true,
        map: map
    });
};
