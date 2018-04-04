<?php
session_start();
include ("database.php");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $forenameErr = $surnameErr = $passwordErr = $emailErr = "";
    $validInput = true;

    /* Checking forename and surname */
    if (!isset($_POST['forename']) && !empty($_POST['forename'])) {
        $forenameErr .= "f0";
        $validInput = false;
    } else {
        /* If all characters are not letters */
        if (!ctype_alpha($_POST['forename'])) {
            $forenameErr .= "f1";
            $validInput = false;
        }
    }
    if(!isset($_POST['surname']) && !empty($_POST['surname'])) {
        $surnameErr = "s0";
        $validInput = false;
    } else {
        /* If all characters are not letters */
        if (!ctype_alpha($_POST['surname'])) {
            $surnameErr .= "s1";
            $validInput = false;
        }
    }

    /* Checking email */
    if(!isset($_POST['email']) && !empty($_POST['email']))
        $emailErr = "e0";
    else{
        /*Checking if email is already registered*/
        $stmt = $conn->prepare("SELECT email FROM users WHERE email = ?");
        if(!$stmt->bind_param('s', $_POST['email']))
            echo "fail";
        else{
            $stmt->execute();
            if($stmt->bind_result($emails)){
                $stmt->fetch();
                $stmt->close();
                if(!empty($emails)){
                    $emailErr .= "e1";
                    $validInput = false;
                }
            }else{
                echo "fail";
            }

        }
    }
    if(!isset($_POST['password']) && !empty($_POST['password']))
        $passwordErr = "p0";
    //TODO: Check email contains @, decided on password regex

    if(!$validInput)
        echo $forenameErr . $passwordErr . $emailErr . $surnameErr ;
    else{
        $forename = $_POST['forename'];
        $surname = $_POST['surname'];
        $email = $_POST['email'];
        $password = md5($_POST['password']);
        $id = null;

        $stmt = $conn->prepare("INSERT INTO users (id, email, password, forename, surname)
                                       VALUES (?, ?, ?, ?, ?)");
        if(!$stmt->bind_param('sssss', $id,$email, $password, $forename, $surname))
            echo "err";
        else {
            if($stmt->execute()){
                $stmt->close();
                echo "success";
                /* Set session variable */
                $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
                if($stmt->bind_param('s', $email)){
                    $stmt->execute();
                    /* Sucessfully got result */
                    if($stmt->bind_result($id)){
                        $stmt->fetch();
                        $stmt->close();
                        if(!empty($id)){
                            $_SESSION['userID'] = $id;
                        }
                    }
                }else{
                    echo "error preparing";
                }
            }
            else{
                echo "err";
                $stmt->close();

            }

        }

    }
}