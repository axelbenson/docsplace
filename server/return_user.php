<?php
	require_once("dbconnect.php");
	$result = $mysqli->query("SELECT id, login, name, avatar, location, raiting, age, email FROM users WHERE login='".$_GET['login']."' LIMIT 1");
	$laurel_query = $mysqli->query("SELECT count(id) as num FROM `instructions` WHERE author='".$_GET['login']."' LIMIT 1");
	$champion_query = $mysqli->query("SELECT login FROM users ORDER BY raiting DESC LIMIT 1");
	$commentator_query = $mysqli->query("SELECT count(author_login) as Num FROM `comments` WHERE author_login='".$_GET['login']."' LIMIT 1");
	$user = $result->fetch_row();

	$laurel_row = $laurel_query->fetch_row();
	if ($laurel_row[0] > 9) {
		$laurel = 'true';
	} else {
		$laurel = 'false';
	}
	if ($laurel_row[0]) {
		$beginner = 'true';
	} else {
		$beginner = 'false';
	}

	$champion_row = $champion_query->fetch_row();
	if ($champion_row[0] == $_GET['login']) {
		$champion = 'true';
	} else {
		$champion = 'false';
	}

	$commentator_row = $commentator_query->fetch_row();
	if ($commentator_row[0] > 9) {
		$commentator = 'true';
	} else {
		$commentator= 'false';
	}

	if ($user[5] > 49) {
		$star = 'true';
	} else {
		$star = 'false';
	}	

	$users = [
			"id" => $user[0],
			"login" => $user[1],
			"name" => $user[2],
			"avatar" => $user[3],
			"location" => $user[4],
			"raiting" => $user[5],
			"age" => $user[6],
			"email" => $user[7],
			"laurel" => $laurel,
			"commentator" => $commentator,
			"champion" => $champion,
			"star" => $star,
			"beginner" => $beginner
		];
	header('Content-type: application/json');
	header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Pragma");
	echo json_encode( $users );
?>