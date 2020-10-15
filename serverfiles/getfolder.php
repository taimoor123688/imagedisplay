<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

        $dirs = array_filter(glob('*'), 'is_dir');

        $i = 0;
        $data= array();

        foreach ($dirs as $value)
        {
            $data[$i] =  $value ;
            $i++;
        }
        echo json_encode($data);
?>
