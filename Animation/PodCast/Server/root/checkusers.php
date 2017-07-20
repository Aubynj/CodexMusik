<?php
include "Database/dbConfig.php";



$check = "SELECT * FROM `Users` WHERE Username = `Username`";
$result = $con->query($check);

if($result->num_rows > 0){
  while($row = $result->fetch_assoc()){
    echo "";
    echo "".$row["Username"].",";
    echo " ";

  }
}


 ?>
