<?php
	require_once("dbconnect.php");
	$result = $mysqli->query("SELECT id, category, name, author, picture, short_description, raiting, `date`, `full_description`, `ingredients`, `num_steps`, `video_link` FROM instructions WHERE id='".$_GET['id']."' LIMIT 1");
	$rows = $result->num_rows;
	$instruction = $result->fetch_row();
	$post = [
			"post_id" => $instruction[0],
			"category" => $instruction[1],
			"title" => $instruction[2],
			"author" => $instruction[3],
			"picture" => $instruction[4],
			"description" => $instruction[5],
			"raiting" => $instruction[6],
			"date" => $instruction[7],
			"fullDescription" => $instruction[8],
			"ingredients" => $instruction[9],
			"numSteps" => $instruction[10],
			"videoLink" => $instruction[11]
	];

	header('Content-type: application/json');
	header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Pragma");
	echo json_encode( $post ); 
?>