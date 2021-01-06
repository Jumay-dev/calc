<?php
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    
    header('Access-Control-Allow-Origin: *');

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
                $step['path'] = 'http://calc:81/' . $directory . '/' . $file;
                $step['name'] = $file;
                $response[] = $step;
            }
        }
        die(json_encode($response));
    }
}
die('not enter');
