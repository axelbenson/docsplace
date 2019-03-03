<?php
    $server = "localhost"; 
    $username = "benson"; 
    $password = "aezakmi"; 
    $database = "howto";
    $mysqli = new mysqli($server, $username, $password, $database);
    if (mysqli_connect_errno()) { 
        echo "<label id='error'>Ошибка подключения к БД.Описание ошибки: ".mysqli_connect_error()."</label>";
        exit(); 
    }
    $mysqli->set_charset('utf8');   
    $mysqli->query("SET NAMES 'utf8';");
    $mysqli->query("SET CHARACTER SET 'utf8';");
    $mysqli->query("SET SESSION collation_connection = 'utf8_general_ci';");
    $address_site = "http://howto.ru";
?>