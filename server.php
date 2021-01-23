<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';
include 'server-config.php';

// CORS disabled
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    if(isset($_GET['action']) && $_GET['action'] == "structure") {
        $dir_content = scandir("./content");
        $response = [];
        foreach($dir_content as $category) {
            $current_response['category'] = $category;
            if ($category !== '..' && $category !== '.') {
                $category_content = scandir("./content/" . $category);
                $current_response['category_content'] = $category_content;
            }
            $response[] = $current_response;
        }
        die (json_encode($response));
    }

    if(isset($_GET['action']) && $_GET['action'] == "get_file_names") {
        $response = [];
        $directory = "./content/" . $_GET['directory'];
        $files_there = scandir($directory);
        foreach($files_there as $file) {
            if ($file !== '.' && $file !== '..') {
                $step['path'] = HOST . $directory . '/' . $file;
                $step['name'] = $file;
                $response[] = $step;
            }
        }
        die(json_encode($response));
    }
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {

    if(isset($_GET['action']) && $_GET['action'] == "order") {
        $json = file_get_contents('php://input');
        $data = json_decode($json);

        $mail = new PHPMailer;
        try {
            //Server settings
            $mail->CharSet = 'UTF-8';
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
            $mail->isSMTP();                                            // Send using SMTP
            $mail->Host = 'smtp.yandex.com';
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->SMTPSecure = 'tls'; 
            $mail->Port = 587;
            $mail->Username = 'osipovm33rus@yandex.ru';
            $mail->Password = '345125Daxanavar';                             // SMTP password
        
            //Recipients
            $mail->setFrom('osipovm33rus@yandex.ru', 'Mailer');
            $mail->addAddress('osipovm777rus@gmail.com', 'Joe User');     // Add a recipient
        
            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Here is the subject';
            $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
        
            $mail->send();
            die('Message has been sent');
        } catch (Exception $e) {
            die("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
        }
    }
}
die('not enter');
