<?php
	require_once("dbconnect.php");
	$result = $mysqli->query("SELECT hashtags FROM instructions ORDER BY RAND()");
 	$response = [];
	$string = "";
	$rows = $result->num_rows;
	for ($i = 0 ; $i < $rows ; ++$i)
	{
		$tag_line = $result->fetch_row();
		$string .= $tag_line[0];
		$string .= ",";
	}
	$tags = explode(",", $string);
	$tags = array_unique($tags);
	$tags = array_values($tags);
	
	for ($i = 0 ; $i < 30 ; ++$i)
	{
		$response[] = [
			"text" => $tags[$i],
			"weight" => rand(1,10)
		];
	}
	header('Content-type: application/json');
	header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Pragma");
	echo json_encode( $response ); 
?>