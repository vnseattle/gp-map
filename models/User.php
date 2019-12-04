<?php
 class User{
    // Table config 
    private $conn;

    // User Properties
    public $id;
    public $first_name;
    public $last_name;
    public $city;
    public $state;
    public $latitude;
    public $longitude;
    public $zip;

    // constructor
    public function __construct($db){
        $this->conn = $db;
    }
    
    // Get user 
    public function getUser($id){
        // Query 
        $sql = "SELECT * FROM users where id='".$id."'";
        // Prepare statment 
        $stmt = $this->conn->prepare($sql);
        // Execute 
        $stmt->execute();
        
        return $stmt;

    }

 }