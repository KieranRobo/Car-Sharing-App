$(document).one("pageinit" , function () {
    $.getJSON("control/ajax-handler.php?data=rides", function(data){

            // $("#ride-data").append("ID: " + data[i].id + "<br>");
            // $("#ride-data").append("Description: " + data[i].description + "<br>");
            //
            // $("#ride-data").append("<br>");
        for(var i=0; i<data.length; i++){
            var seats = 0;
            var time = data[i]['time'];
            var from = data[i]['from_lat'] + ", " + data[i]['from_lng'];
            var to = data[i]['to_lat'] + data[i]['to_lng'];
            $('#active-rides-table').find('tbody').append("<tr><td>" + time + "</td><td id='from"+i+"'></td><td id='to"+i+"'></td><td>" + seats + "</td></tr>");
        }
        for(var i=0; i<data.length; i++) {
            geocodeLatLng(data[i], i);
            geocodeLatLngTo(parseFloat(data[i]['to_lat']), parseFloat(data[i]['to_lng']), i);
        }

    });

    /*
    $.ajax({
        url: "control/ajax-handler.php?data=rides",
        type: "POST",
        beforeSend: function () {
        },
        success: function (result) {
            //$("#ride-data").html(result);
            parseJSON(result);
        }
    }).error(function () {
        alert("wrong");
    });
    */
});

function geocodeLatLng(data, i) {
    setTimeout(function () {
        var geocoder = new google.maps.Geocoder;
        var latlng = {lat: parseFloat(data['from_lat']), lng: parseFloat(data['from_lng'])};
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    $('#from'+i).append(results[0].formatted_address);

                }
            }else
            if(status === "OVER_QUERY_LIMIT"){
            }

        });
    }, i*2000);

}

function geocodeLatLngTo(lat, lng, i) {
    setTimeout(function () {
        var geocoder = new google.maps.Geocoder;
        var latlng = {lat: lat, lng: lng};
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    $('#to'+i).append(results[0].formatted_address);
                }
            }else{
                if(status === "OVER_QUERY_LIMIT"){
                    setTimeout(function () {
                        geocodeLatLngTo(lat, lng, i);
                    }, 2000);
                }

            }
        });
    }, i*2000);

}





