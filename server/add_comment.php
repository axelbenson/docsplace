<?php
require_once("dbconnect.php");
$result = $mysqli->query("INSERT INTO comments (`post_id`, `author_login`, `comment_text`) VALUES ('".$_POST['postId']."', '".$_POST['login']."', '".$_POST['text']."')");

?>