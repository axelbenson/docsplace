<?php
require_once("dbconnect.php");
$result = $mysqli->query("UPDATE instructions, users SET instructions.raiting=instructions.raiting +".$_POST['value'].", users.raiting=users.raiting +".$_POST['value']." WHERE instructions.id='".$_POST['post_id']."' AND users.login='".$_POST['author']."'");
$result2 = $mysqli->query("INSERT INTO likes (`post_id`, `author_login`, `value`) VALUES ('".$_POST['post_id']."', '".$_POST['login']."', '".$_POST['value']."')");
?>