<?php
ini_set('display_errors',0);
$response = [
        "success" => "",
        "error" => ""
    ];
require_once('dbconnect.php');
if ($_POST['type'] == 'block') {
	for ($a = 0; $a < $_POST['length']; $a++) {
	if ($_POST['data'.$a] != '9') {	
		$result = $mysqli->query("UPDATE users SET block_status='1' WHERE id='".$_POST['data'.$a]."' ");
		}
	}
	if ($result) {
		$response['success'] = "Успешно!";
		echo json_encode( $response );
		exit();
	} else {
		$response['error'] = "Ошибка при загрузке в БД!";
		echo json_encode( $response );
		exit();
	}

}
if ($_POST['type'] == 'unblock') {
	for ($a = 0; $a < $_POST['length']; $a++) {
	$result = $mysqli->query("UPDATE users SET block_status='0' WHERE id='".$_POST['data'.$a]."' ");
	}
	if ($result) {
		$response['success'] = "Успешно!";
		echo json_encode( $response );
		exit();
	} else {
		$response['error'] = "Ошибка при загрузке в БД!";
		echo json_encode( $response );
		exit();
	}
}

if ($_POST['type'] == 'delete') {
	for ($a = 0; $a < $_POST['length']; $a++) {
		if ($_POST['data'.$a] != '9') {
			$result = $mysqli->query("DELETE FROM users WHERE id='".$_POST['data'.$a]."' ");
		}
		
	}
	if ($result) {
		$response['success'] = "Успешно!";
		echo json_encode( $response );
		exit();
	} else {
		$response['error'] = "Ошибка при загрузке в БД!";
		echo json_encode( $response );
		exit();
	}
}

if ($_POST['type'] == 'su') {
	for ($a = 0; $a < $_POST['length']; $a++) {
	$result = $mysqli->query("UPDATE users SET su='1' WHERE id='".$_POST['data'.$a]."' ");
	}
	if ($result) {
		$response['success'] = "Успешно!";
		echo json_encode( $response );
		exit();
	} else {
		$response['error'] = "Ошибка при загрузке в БД!";
		echo json_encode( $response );
		exit();
	}
}

if ($_POST['type'] == 'notsu') {
	for ($a = 0; $a < $_POST['length']; $a++) {
	$result = $mysqli->query("UPDATE users SET su='0' WHERE id='".$_POST['data'.$a]."' ");
	}
	if ($result) {
		$response['success'] = "Успешно!";
		echo json_encode( $response );
		exit();
	} else {
		$response['error'] = "Ошибка при загрузке в БД!";
		echo json_encode( $response );
		exit();
	}
}

?>