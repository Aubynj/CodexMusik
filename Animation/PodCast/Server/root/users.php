<?php

include "Database/dbConfig.php";
global $username;
global $email;
global $email_code;
global $pword;

global $to, $subject, $body, $headers;


function email($to, $subject,$body){
  mail($to, $subject, $body,'From: codexmusic@');
}



function user_exists($username){
  global $con;

  $qry = "SELECT * FROM `Users` WHERE `Username` = '$username'";

    $result = $con->query($qry);
    $row = $result->num_rows;
    if($row > 0){
      return true;
    }else{
    }
    return false;

}

function user_active($username){
  global $con;

  $qry = "SELECT * FROM `Users` WHERE `Username`= '$username' AND `activate` = 1";

    $result = $con->query($qry);
    if($row = $result->num_rows > 0){
      return true;

    }else{
      return false;
    }


}

//Getting the exact field from a user ID

function user_id_from_username($username){
  global $con;

  $qry = "SELECT `ID` FROM `Users` WHERE `Username`= '$username'";

  $result = $con->query($qry);
  if($row = $result->num_rows > 0){
    if($row = $result->fetch_assoc()){
      $id = $row["ID"];
      return $id;
    }

  }else{
    return false;
  }

}

//Getting login information from a single row of user ID
//Without checking whole Database for username and password

function login($username, $pword){
  global $con;
  global $password;

  $user_id = user_id_from_username($username);
  //echo "User id is:",$user_id;
  $qry = "SELECT * FROM `Users` WHERE `Username`= '$username' AND `ID`= '$user_id'";

  $result = $con->query($qry);
  if($row = $result->num_rows > 0){

    if($row = $result->fetch_assoc()){
      if (password_verify($pword, $row['Password'])) {
        return true;
      } else {
        return false;
      }



    }


 }else{
   return false;

 }
}


function email_exist($email){
  global $con;

  $qry = ("SELECT * FROM `Users` WHERE `Email` = '$email' ");

  $result = $con->query($qry);
  $row = $result->num_rows;

  if($row > 0){
    return true;
  }else{
    return false;
  }
}


?>
