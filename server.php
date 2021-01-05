<?php
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    if(isset($_GET['action']) && $_GET['action'] == "structure") {
        $dir_content = scandir("./Content");
        die (json_encode($dir_content));
    }

    if(isset($_GET['action']) && $_GET['action'] == "get_content") {
        $directory = "./Content/" . $_GET['directory'];
        $dir_content = scandir($directory);
        die (print_r([
            'answer' => $dir_content,
            'path' => $directory
        ]));
    }

    if(isset($_GET['action']) && $_GET['action'] == "get_all_files") {
        $directory = "./Content/" . $_GET['directory'];
        die('Вернуть все файлы');
    }

    if(isset($_GET['action']) && $_GET['action'] == "get_file") {
        $directory = "./Content/" . $_GET['directory'];
        die('Вернуть определенный файл');
    }
}
die('not enter');
