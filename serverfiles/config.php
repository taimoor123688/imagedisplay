<?php

$con = mysqli_connect("localhost", "root", "", "userdb"); //Connection variable

if(mysqli_connect_errno()) 
{
	echo "Failed to connect: " . mysqli_connect_errno();
}
// else{
 	//echo "connected ";

 //}

?>