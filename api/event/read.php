<?php
// Header 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Event.php';

// GET Event locaiton 
$lat = '0';
$lng = '0';
$dis = '0';
$date = '0';

if(!empty($_GET['lat'])){
    $lat = $_GET['lat'];
}

if(!empty($_GET['lng'])){
    $lng = $_GET['lng'];
}

if(!empty($_GET['dis'])){
    $dis = $_GET['dis'];
}

if(!empty($_GET['date'])){
    $date = $_GET['date'];
}


// Instantiate DB & Connect
$database = new Database();
$db = $database->connect();

// Instantiate event Object
$event = new Event($db);
$result = $event->getEvents($lat,$lng,$dis,$date);
$num = $result->rowCount();

// Check if any event
if($num>0){
    // event array
    $event_arr = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $event_item = array(
            'id' => $id,
            'title' => $title,
            'start_date_time' => substr($start_date_time,0,16),
            'end_date_time' => substr($end_date_time,0,16),
            'latitude' => $latitude,
            'longitude'=> $longitude,
            'distance' => substr(round($distance,1),0,3)
        );

        array_push($event_arr,$event_item);
    }

    // Turn to JSON
    echo json_encode($event_arr);

}