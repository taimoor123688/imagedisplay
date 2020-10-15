<?php

    require 'config.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $User_ID = $_POST['uid'];
    $folderName = $_POST['folderName'];


    $email_chk = mysqli_query($con, "SELECT imgName FROM images WHERE path='$folderName' and UserID='$User_ID' ");
    $data= array();

    if(mysqli_num_rows($email_chk) >=1){
        
        $dirname = "./".$folderName."/";

        $imageTypes = '{*.jpg,*.JPG,*.jpeg,*.JPEG,*.png,*.PNG,*.gif,*.GIF}';

        $images = glob($dirname . $imageTypes, GLOB_BRACE);


        $i=0;
        foreach($images as $image) {
            $image = substr($image, 2);
            $data[$i] =  $image ;
            $i++;
        }
        echo json_encode($data);  
    }
    else{
        echo json_encode($data);

    }





?>
