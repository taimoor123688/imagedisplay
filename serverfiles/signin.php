<?php
  include 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


    $Email = $_POST["userEmail"];
    $Password = $_POST["userPassword"];
	$toReturn = array();
      
    if($Email !="" || $Password!="")
    {
      
      $result = mysqli_query($con, "SELECT UserID FROM users WHERE Email='$Email' and Password='$Password' ");
         
      if(mysqli_num_rows($result) == 1)
	  {
		$row=mysqli_fetch_assoc( $result );
        $userid=$row['UserID'];
		
		$toReturn = ["error" => "false", "user-id" => $userid];		
						
	  }
      else
	  {
			$toReturn = ["error" => "true", "error-message" => "Incorrect Email or Password"];		

      }

	
	} 
	else{
			$toReturn = ["error" => "true", "error-message" => "Feilds are empty"];		
	}
	
    echo json_encode($toReturn);

/*
    echo json_encode($_POST['userEmail']);

*/
?>
