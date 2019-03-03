<?php
require_once("dbconnect.php");

$response = [
        "success" => "",
        "error" => ""
    ];

    if (!$_POST['postId']){
    	$response['error'] = "Ошибка при передаче запроса!";
		echo json_encode( $response );
		exit();
    }

	$result = $mysqli->query("DELETE FROM `instructions` WHERE id='".$_POST['postId']."'");
	if (!$result) {
		$response['error'] = "Ошибка при удалении из БД!";
		echo json_encode( $response );
		exit();
	}
	$response['success'] = "Успех!";
	echo json_encode( $response );
	exit();
?>