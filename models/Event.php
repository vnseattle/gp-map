<?php
 class Event{
    // Table config 
    private $conn;
    private $table= 'event';

    // Event Properties
    public $id;
    public $title;
    public $latitude;
    public $longitude;
    public $start_date_time;
    public $end_date_time;
    public $distance;

    // constructor
    public function __construct($db){
        $this->conn = $db;
    }
    
    // Get Events 
    public function getEvents($curr_lat,$curr_lng,$dis,$date){
        // Query 
        $sql = "SELECT id,title,start_date_time,end_date_time,latitude,longitude,
        ( 3959 * acos( cos( radians('".$curr_lat."') ) * cos( radians( latitude ) ) 
        * cos( radians( longitude ) - radians('".$curr_lng."') ) + sin( radians('".$curr_lat."') ) 
        * sin( radians( latitude ) ) ) ) AS distance FROM events WHERE `start_date_time`>'".$date." 0:0:01' AND `end_date_time` < '".$date."23:59:59' HAVING distance < '".$dis."' ORDER BY distance  LIMIT 120";

        // Prepare statment 
        $stmt = $this->conn->prepare($sql);
        // Execute 
        $stmt->execute();
        
        return $stmt;

    }

 }