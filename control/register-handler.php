<?php
include ("database.php");
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $fornameErr = "";
    $surnameErr = "";
    $passwordErr = "";
    $emailErr = "";
    if(!isset($_POST['forename']))
        $fornameErr = "Forename empty";
    if(!isset($_POST['surname']))
        $surnameErr = "Surname empty";
    if(!isset($_POST['email']))
        $emailErr = "Email empty";
    if(!isset($_POST['password']))
        $passwordErr = "Password empty";
    if($fornameErr != "" || $passwordErr != "" || $emailErr != "" || $surnameErr != "")
        echo $fornameErr . $passwordErr . $emailErr . $surnameErr ;
    else
        echo "success";
}