<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $dirs = array_filter(glob('*'), 'is_dir');
    $i = 1;

    foreach ($dirs as $value)
    {
        $i++;
    }


    $cur = getcwd();
    if(mkdir ($cur."/folder".$i, 0777))
    {
       // echo "successfully";
        $j = 0;
        $data= array();

        $dirs = array_filter(glob('*'), 'is_dir');

        foreach ($dirs as $value)
        {
            $data[$j] = $value ;
            $j++;
        }
        echo json_encode($data);
    }
    else{
        echo json_encode ($data);
    }


    



?>
