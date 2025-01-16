<?php

// File: index.php

error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Include database connection
include 'Db.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        // Ambil data JSON yang dikirim dari frontend
        $user = json_decode(file_get_contents('php://input'));

        // Validasi dan hashing password
        $hashedPassword = password_hash($user->password, PASSWORD_DEFAULT);

        // Query untuk memasukkan data pengguna baru
        $sql = "INSERT INTO users (Nama_Depan, Nama_Belakang, Email, Password, created_at)
VALUES (:Nama_Depan, :Nama_Belakang, :Email, :Password, :created_at)";

        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':Nama_Depan', $user->Nama_Depan);
        $stmt->bindParam(':Nama_Belakang', $user->Nama_Belakang);
        $stmt->bindParam(':Email', $user->Email);
        $stmt->bindParam(':Password', $hashedPassword); // Simpan password yang sudah di-hash
        $stmt->bindParam(':created_at', $created_at);

        // Eksekusi query
        if ($stmt->execute()) {
            echo json_encode(['status' => 1, 'message' => 'User registered successfully']);
        } else {
            echo json_encode(['status' => 0, 'message' => 'Failed to register user']);
        }
        break;

    default:
        echo json_encode(['status' => 0, 'message' => 'Method not allowed']);
        break;
}