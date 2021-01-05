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

    if(isset($_GET['action']) && $_GET['action'] == "get_content") {
        $directory = "./content/" . $_GET['directory'];
        $dir_content = scandir($directory);
        die (print_r([
            'answer' => $dir_content,
            'path' => $directory
        ]));
    }

    if(isset($_GET['action']) && $_GET['action'] == "get_all_files") {
        $directory = "./content/" . $_GET['directory'];
        die('Вернуть все файлы');
    }

    if(isset($_GET['action']) && $_GET['action'] == "get_file") {
        $directory = "./content/" . $_GET['directory'];
        die('Вернуть определенный файл');
    }
}
die('not enter');
