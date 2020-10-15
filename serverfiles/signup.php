
<?php

include 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


      $Password = $_POST["userPassword"];

    $Email = $_POST["userEmail"];


      if($Password=="" || $Email==""  )
      {

        echo json_encode("Some Fields are left empty");

      }
      else
      {
        $email_chk = mysqli_query($con, "SELECT Email FROM users WHERE Email='$Email' ");

        if(mysqli_num_rows($email_chk) >=1){

          echo json_encode("User Already Exists");

        }
        else
        {
            $sql = "INSERT INTO users (Email, Password )
            VALUES ( '$Email', '$Password');";


          if (mysqli_query($con, $sql))
          {
              echo json_encode ("true");

          }
          else{
              echo json_encode("Error: Debugging PHP " . $sql . "<br>" . mysqli_error($con));
          }

        }
      }


?>
