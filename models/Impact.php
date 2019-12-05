<?php
 class Impact{
    // Table config 
    private $conn;

    // Impact Properties
    public $id;
    public $title;
    public $checkin_at;
    public $duration_hours;
    public $latitude;
    public $longitude;

    // constructor
    public function __construct($db){
        $this->conn = $db;
    }
    
    // Get Impacts 
    public function getImpacts($uid){
        // Query 
        $sql = "SELECT * FROM `impacts` 
        INNER JOIN events ON impacts.event_id = events.id 
        where user_id=".$uid."";
    
        // Prepare statment 
        $stmt = $this->conn->prepare($sql);
        // Execute 
        $stmt->execute();
        
        return $stmt;

    }

 }