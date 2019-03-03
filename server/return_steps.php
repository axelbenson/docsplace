<?php
	require_once("dbconnect.php");
	$result = $mysqli->query("SELECT * FROM steps WHERE post_id='".$_GET['postId']."' LIMIT ".$_GET['numSteps']);
	$steps = [];
	for ($a = 0; $a < $_GET['numSteps']; $a++)
	{
		$step = $result->fetch_row();
		$steps[] = [
			"id" => $step[0],
			"post_id" => $step[1],
			"number" => $step[2],
			"title" => $step[3],
			"text" => $step[4],
			"picture" => $step[5]
	];
	}
	

	header('Content-type: application/json');
	header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Pragma");
	echo json_encode( $steps ); 
?>