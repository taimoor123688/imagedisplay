<?php 
	require 'config.php';
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


      $user_ID = $_POST['uid'];
      $folderName = $_POST['folderName'];
       $fileName = $_POST['file'];

// echo "dd".$folderName;
$name = $_FILES['file']['name'];
$dirname = "./".$folderName."/";

$target_file = $dirname . basename($_FILES["file"]["name"]);

$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Valid file extensions
$extensions_arr = array("jpg","jpeg","png");

// Check extension
if( in_array($imageFileType,$extensions_arr) ){

    // Upload file
    if(move_uploaded_file($_FILES['file']['tmp_name'],$dirname.''.$name) ){
        // Insert record
        $query = "insert into images(UserID,imgName, path) values('".$user_ID."', '".$name."','".$folderName."' )";

        mysqli_query($con,$query) or die(mysqli_error($con));

        echo json_encode("uploaded successfully");

    }
    else{
        echo json_encode("Failed");

    }

}

  
?>



