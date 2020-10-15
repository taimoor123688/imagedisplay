<?php
    require 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

   $del_img =$_POST['iname']  ;

   $str_img = explode("/",$del_img);

   $str_img = $str_img[count($str_img)- 1];

   $sql = "DELETE FROM images WHERE imgName ='$str_img' ";
    $result  = mysqli_query($con, $sql);
    if($result){
        unlink($del_img);
        echo json_encode( "deleted Image");
    }
    else{
        echo json_encode("Cannot delete Image");
    }

?>
