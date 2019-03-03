<?php
require_once("dbconnect.php");
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Pragma");
$result = $mysqli->query("SELECT * FROM likes WHERE post_id='".$_GET['post_id']."' AND author_login ='".$_GET['login']."'");
if ($result->num_rows > 0) {
	echo "true";
} else {
	echo "false";
}
?>