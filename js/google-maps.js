var map;
var marker;

this.initMap = function() {
     marker = null;

    var uluru = {lat: 55.864304, lng: -4.251686};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: uluru
    });

    map.addListener('click', function(event) {
        mapPress(event);
    });
};

this.mapPress = function(event) {
    if (marker != null) {
        marker.setMap(null);
    }
    marker = new google.maps.Marker({
        position: event.latLng,
        map: map
    });
};


