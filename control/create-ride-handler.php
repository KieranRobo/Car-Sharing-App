<?php
session_start();
include ("database.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if (isset($_POST)) {
        $description = strip_tags($_POST['description']);
        $ride_time = $_POST['time'];
        $setoff_lat = $_POST['setoffLat'];
        $setoff_lng = $_POST['setoffLng'];
        $dest_lat = $_POST['destLat'];
        $dest_lng = $_POST['destLng'];


        $create_ride = $conn->query("INSERT INTO `rides` (`from_lat`, `from_lng`, `to_lat`, `to_lng`, `time`, `vehicle`, `description`) VALUES
                    ($setoff_lat, $setoff_lng, $dest_lat, $dest_lng, $ride_time, 1, '$description')");

        print "1";

    }
    else
    {
        print "0";
    }

}