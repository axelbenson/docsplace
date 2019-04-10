<?php
    require_once("dbconnect.php");

	$comments_result = $mysqli->query("SELECT comments.*, users.raiting, users.avatar FROM users INNER JOIN comments ON users.login = comments.author_login WHERE comments.post_id='".$_GET['postId']."' ORDER BY comments.id");
	$likes_result = $mysqli->query("SELECT * FROM likes WHERE author_login='".$_GET['login']."'");
	$comments = [];
	$array = [];
	$r = $likes_result->num_rows;
	for ($a  = 0; $a < $r; $a++)
	{
		$like = $likes_result->fetch_row();
		$array[$a] = $like[1];
	}
	$str = "";
	$rows = $comments_result->num_rows;
	for ($i = 0 ; $i < $rows ; ++$i)
	{
		$check = 0;
		$comment = $comments_result->fetch_row();
		
		for ($a  = 0; $a < $r; $a++)
		{
			$str .= $array[$a];
			if ($array[$a] == $comment[0]) {
				$comments [] = [
					"id" => $comment[0],
					"postId" => $comment[1],
					"authorLogin" => $comment[2],
					"commentText" => $comment[3],
					"raiting" => $comment[4],
					"authorRaiting" => $comment[5],
					"authorAvatar" => $comment[6],
					"liked" => 'true'
				];
				$check = 1;
				break; 
			}
		}
		if ($check == 0){
			$comments [] = [
			"id" => $comment[0],
			"postId" => $comment[1],
			"authorLogin" => $comment[2],
			"commentText" => $comment[3],
			"raiting" => $comment[4],
			"authorRaiting" => $comment[5],
			"authorAvatar" => $comment[6],
			"liked" => 'false'
		];
		}
		
	}
	file_put_contents("re.txt", $str);
	header('Content-type: application/json');
	header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Pragma");
	echo json_encode( $comments );
?>