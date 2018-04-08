<?php
include ("database.php");

if ($_GET['data'] == "rides") {

    $rides = $conn->query("SELECT * FROM `rides`");

    $rows = array();
    while ($r = $rides->fetch_array()) {
        $rows[] = $r;
    }
    print json_encode($rows);
}
