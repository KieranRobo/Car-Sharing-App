<?php
session_start();
include ("database.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if (isset($_POST)) {
        $description = strip_tags($_POST['description']);
        $ride_time = strtotime($_POST['time']);
        $setoff_lat = $_POST['setoffLat'];
        $setoff_lng = $_POST['setoffLng'];
        $dest_lat = $_POST['destLat'];
        $dest_lng = $_POST['destLng'];
        $vehicle = $_POST['vehicle'];

        $create_setoff_location = $conn->query("INSERT INTO `locations` (`longitude`, `latitude`, `address`) VALUES ($setoff_lng, $setoff_lat, '')");
        $setoff_id = $conn->insert_id;

        $create_dest_location = $conn->query("INSERT INTO `locations` (`longitude`, `latitude`, `address`) VALUES ($dest_lng, $dest_lat, '')");
        $dest_id = $conn->insert_id;

        $create_ride = $conn->query("INSERT INTO `rides` (`setoff_location`, `dest_location`, `time`, `vehicle`, `description`) VALUES
                    ($setoff_id, $dest_id, $ride_time, $vehicle, '$description')");
        print "1";
    }
    else
    {
        print "0";
    }

}