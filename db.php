<?php
$host = 'localhost';
$user = 'root';
$password = "";
$dbname = "user_management"; //nama database yang telah dibuat
$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error)
    die("Connection failed: $conn->connect_error");