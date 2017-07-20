<?php
include "users.php";

//$session_start();

$username = $con->real_escape_string(trim($_POST["Username"]));
$password = $con->real_escape_string(trim($_POST['Password']));

if(user_exists($username) === false){
  echo 0;
}else if(user_active($username) === false){
  echo 2;
}else{
  if(login($username,$password) === true){
    $_SESSION["ID"] = $login;
    echo $login;
    echo 1;
  }else{
    echo 3;
  }
}



?>
