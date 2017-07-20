<?php
include "Database/dbConfig.php";



$check = "SELECT * FROM `Users` WHERE Email = `Email`";
$result = $con->query($check);

if($result->num_rows > 0){
  while($row = $result->fetch_assoc()){
    echo "";
    echo "".$row["Email"].",";
    echo " ";

  }
}


 ?>
