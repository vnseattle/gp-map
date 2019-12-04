<?php

class Database {

// DB Config     
private $ms_servername = "localhost";
private $ms_username = "root";
private $ms_password = "";
private $ms_dbname = "givepulse_test";
private $conn;

public function connect(){
    $this->conn = null;

    try {
        $this->conn = new PDO('mysql:host='.$this->ms_servername.';dbname='.$this->ms_dbname,$this->ms_username,$this->ms_password);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            die($ex->getMessage());
        }
    return $this->conn;
}

}