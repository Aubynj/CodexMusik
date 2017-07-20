<?php

include "Database/dbConfig.php";
include "users.php";

global $con;



//$post_data = file_get_contents("php://input");
//$data = json_decode($post_data);

$fullname = $con->real_escape_string(trim($_POST["FullName"]));
$username = $con->real_escape_string(trim($_POST["Username"]));
$password = $con->real_escape_string(trim($_POST['Password']));
$email =  strtolower($con->real_escape_string(trim($_POST["Email"])));

//Considering the password hashing

$options = array(
  'cost' => 12
);

$hash = password_hash($password, PASSWORD_BCRYPT,$options);

$querry = "INSERT INTO Users(`Name`, `Username`, `Password`, `Email`) VALUES('$fullname','$username','$hash','$email')";


if(email_exist($email) === TRUE){
  echo 2;
  exit();
};

if($con->query($querry) === TRUE){
    echo 1;
}else{
  echo 0;
}

?>
