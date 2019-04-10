<?php
require_once("dbconnect.php");

if ($_POST['type'] == 'like'){

	$result = $mysqli->query("UPDATE comments, users SET comments.raiting=comments.raiting+1, users.raiting=users.raiting+1 WHERE comments.id='".$_POST['id']."' AND users.login='".$_POST['author']."'");
	$result2 = $mysqli->query("INSERT INTO likes (`post_id`, `author_login`, `value`) VALUES ('".$_POST['id']."', '".$_POST['login']."', '1')");

}
if ($_POST['type'] == 'dislike'){

	$result = $mysqli->query("UPDATE comments, users SET comments.raiting=comments.raiting-1, users.raiting=users.raiting-1 WHERE comments.id='".$_POST['id']."' AND users.login='".$_POST['author']."'");
	$result2 = $mysqli->query("DELETE FROM likes WHERE `post_id`='".$_POST['id']."' AND `author_login`='".$_POST['login']."'");

}
?>