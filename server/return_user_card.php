<?php
	require_once("dbconnect.php");
	$result = $mysqli->query("SELECT id, login, name, avatar, location, raiting, age, email, block_status, su FROM users ORDER BY raiting DESC");
	$users = [];
	$rows = $result->num_rows;
	for ($i = 0 ; $i < $rows ; ++$i)
	{
		$user = $result->fetch_row();
		$users[] = [
			"id" => $user[0],
			"login" => $user[1],
			"name" => $user[2],
			"avatar" => $user[3],
			"location" => $user[4],
			"raiting" => $user[5],
			"age" => $user[6],
			"email" => $user[7],
			"blocked" => $user[8],
			"su" => $user[9]
		];
	}
	header('Content-type: application/json');
	header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Pragma");
	echo json_encode( $users ); 
?>