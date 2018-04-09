<?php
include ("database.php");

if (isset($_GET['data']) && $_GET['data'] == "rides") {
    $rides = $conn->query("SELECT * FROM `rides`");

    $rows = array();
    while ($r = $rides->fetch_array()) {
        $rows[] = $r;
    }
    print json_encode($rows);
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['locationID']) && $_POST['locationID'] != ''){
        $stmt = $conn->prepare("SELECT address FROM locations WHERE id = ?");
        $stmt->bind_param("s", $_POST['locationID']);
        $stmt->execute();
        $stmt->bind_result($id);
        $stmt->fetch();
        $stmt->close();
        echo $id;
    }

    if(isset($_POST['vehicleID']) && $_POST['vehicleID'] != ''){
        $stmt = $conn->prepare("SELECT seats FROM vehicles WHERE id = ?");
        $stmt->bind_param("s", $_POST['vehicleID']);
        $stmt->execute();
        $stmt->bind_result($seatsTotal);
        $stmt->fetch();
        $stmt->close();

        $stmt = $conn->prepare("SELECT id FROM passengers WHERE id = ?");
        $stmt->bind_param("s", $_POST['vehicleID']);
        $stmt->execute();
        $stmt->store_result();
        $num = $stmt->num_rows;
        $stmt->close();

        echo $seatsTotal-$num;
    }
}