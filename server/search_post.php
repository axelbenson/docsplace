<?php
require_once("dbconnect.php");
$posts = [];
$result = $mysqli->query("SELECT id, category, name, author, picture, short_description, raiting, date, ingredients, num_steps, full_description, hashtags FROM (
SELECT instructions.id, instructions.name,instructions.author, instructions.category, instructions.hashtags, instructions.short_description, instructions.picture, instructions.full_description, instructions.date, instructions.raiting, instructions.ingredients, instructions.num_steps
FROM (instructions INNER JOIN comments ON instructions.id = comments.post_id) INNER JOIN steps ON instructions.id = steps.post_id
WHERE	((MATCH(`comment_text`) AGAINST ('*".$_POST['request']."*' IN BOOLEAN MODE)) OR (MATCH(`name`, `category`, `hashtags`, `short_description`, `full_description`, `ingredients`) AGAINST ('*".$_POST['request']."*' IN BOOLEAN MODE)) OR (MATCH(`title`, `text`) AGAINST ('*".$_POST['request']."*' IN BOOLEAN MODE)))) AS T GROUP BY id, name, author, category, hashtags, short_description, picture, full_description, date, raiting, ingredients, num_steps");

$rows = $result->num_rows;
	for ($i = 0 ; $i < $rows ; ++$i)
	{
		$instruction = $result->fetch_row();
		$posts[] = [
			"post_id" => $instruction[0],
			"category" => $instruction[1],
			"title" => $instruction[2],
			"author" => $instruction[3],
			"picture" => $instruction[4],
			"description" => $instruction[5],
			"raiting" => $instruction[6],
			"date" => $instruction[7]
		];
	}
	header('Content-type: application/json');
	header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Pragma");
	echo json_encode( $posts ); 
?>



