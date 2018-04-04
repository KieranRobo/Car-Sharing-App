var map;
var marker;

var setoffMap, destinationMap;
var setoffCoords, desintationCoords;

$(document).ready(function() {
    setoffMap = null;
    destinationMap = null;
    marker = null;

    $("#submit-button").on("click", function () {

        if (marker == null) {
            alert("Please select a location before continuing!");
        }
        else
        {
            if (destinationMap == null) {
                $("#instruction-area").html("Finally, select your <strong>destination:</strong>");

                setoffCoords = marker.getPosition().lat();
                destinationMap = initMap();
            } else {
                desintationCoords = marker.getPosition().lat();
                $("#content-area").html("Added ride information<br> SETOFF: " + setoffCoords + "<br>DEST: " + desintationCoords);
            }

        }

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
        map: map
    });
};
