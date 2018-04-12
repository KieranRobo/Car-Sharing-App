

$(document).one("pageinit" , function () {
    $.getJSON("control/ajax-handler.php?data=rides", function(data){
        for(var i=0; i<data.length; i++){
            $('#active-rides-table').find('tbody').append("<tr onclick='+showInfo("+data[i]['id']+");' id='row"+i+"'><td id='time"+i+"'></td>" +
                                                                "<td id='from"+i+"'>" +
                                                                "</td><td id='to"+i+"'>" +
                                                                "</td><td id='seats"+i+"'></td></tr>");
            $('#time' + i).append(data[i]['time']);
            updateFrom(data[i]['setoff_location'], i);
            updateTo(data[i]['dest_location'], i);
            updateSeatsLeft(data[i]['vehicle'], i);
            if(i%2 === 0)
                $('#row'+i).css('background-color', '#d3d3d3');



        }
        $('#active-rides-table').table("refresh");


    });
});

function showInfo(rideId) {
    window.console.log('ride-details.html?id='+rideId);
    $.mobile.changePage('ride-details.html?id='+rideId, 'pop', true, true);
}

function updateSeatsLeft(vehicleID, tableRow) {
    $.ajax({
        url: 'control/ajax-handler.php',
        type: 'POST',
        data: "vehicleID="+vehicleID,
        success: function (data) {
            $('#seats' + tableRow).append(data);
        }
    });
}

function updateFrom(locationID, tableRow) {
    $.ajax({
        url: 'control/ajax-handler.php',
        type: 'POST',
        data: "locationID="+locationID,
        success: function (data) {
            $('#from' + tableRow).append(data);
        }
    });
}

function updateTo(locationID, tableRow) {
    $.ajax({
        url: 'control/ajax-handler.php',
        type: 'POST',
        data: "locationID="+locationID,
        success: function (data) {
            $('#to' + tableRow).append(data);
        }
    });
}






