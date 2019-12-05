<?php

class Database {

// DB Config     
private $db_servername = "localhost";
private $db_username = "root";
private $db_password = "";
private $db_dbname = "givepulse_test";
private $conn;

public function connect(){
    $this->conn = null;

    try {
        $this->conn = new PDO('mysql:host='.$this->db_servername.';dbname='.$this->db_dbname,$this->db_username,$this->db_password);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            die($ex->getMessage());
        }
    return $this->conn;
}

}