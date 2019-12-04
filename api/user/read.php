<?php
// Header 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/User.php';

// GET User ID
$id = $_GET['id'];

// Instantiate DB & Connect
$database = new Database();
$db = $database->connect();

// Instantiate User Object
$user = new User($db);
$result = $user->getUser($id);
$num = $result->rowCount();

// Check if any user
if($num>0){
    // User array
    $user_arr = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $user_item = array(
            'id' => $id,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'city' => $city,
            'state' => $state,
            'latitude' => $latitude,
            'longitude'=> $longitude,
            'zip' => $zip
        );

        array_push($user_arr,$user_item);
    }

    // Turn to JSON
    echo json_encode($user_arr);

}