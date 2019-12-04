<?php
// Header 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Impact.php';

// GET Impact ID
$id = $_GET['id'];

// Instantiate DB & Connect
$database = new Database();
$db = $database->connect();

// Instantiate Impact Object
$impact = new Impact($db);
$result = $impact->getImpacts($id);
$num = $result->rowCount();

// Check if any impacts
if($num>0){
    // impact array
    $impact_arr = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $impact_item = array(
            'id' => $id,
            'title' => $title,
            'description' => $description,
            'duration_hours' => $duration_hours,
            'latitude' => $latitude,
            'longitude'=> $longitude
        );

        array_push($impact_arr,$impact_item);
    }

    // Turn to JSON
    echo json_encode($impact_arr);

}