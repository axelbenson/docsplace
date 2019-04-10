<?php
ini_set('display_errors',0);
require 'Cloudinary.php';
require 'Uploader.php';
require 'Api.php';

\Cloudinary::config(array( 
  "cloud_name" => "howtoru", 
  "api_key" => "151133152373374", 
  "api_secret" => "KP5tmtCaYG0ZczYMzjY-ve90uH0" 
));
$response = [
        "success" => "",
        "error" => ""
    ];
require_once('dbconnect.php');
$allowed = array('png', 'jpg', 'gif', 'jpeg');

if (isset($_POST['id'])) {
	if (isset($_POST['name'])) {
		if (isset($_POST['age'])) {
			if (isset($_POST['location'])) {

				if ($_FILES['file']['name']) {

					

					$ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);

					if(!in_array(strtolower($ext), $allowed)) 
					{
					  $uploadfile = "https://res.cloudinary.com/howtoru/image/upload/img/users/default_avatar.png";
					} else {
					                function crop($image, $x_o, $y_o, $w_o, $h_o) {
					                    list($w_i, $h_i, $type) = getimagesize($image);
					                    $types = array("", "gif", "jpeg", "png", "jpg");
					                    $ext = $types[$type];
					                    if ($ext) {
					                      $func = 'imagecreatefrom'.$ext;
					                      $img_i = $func($image);
					                    } else {
					                      return false;
					                    }
					                    if ($x_o + $w_o > $w_i) $w_o = $w_i - $x_o;
					                    if ($y_o + $h_o > $h_i) $h_o = $h_i - $y_o;
					                    $img_o = imagecreatetruecolor($w_o, $h_o);
					                    imagecopy($img_o, $img_i, 0, 0, $x_o, $y_o, $w_o, $h_o);
					                    $func = 'image'.$ext;
					                    return $func($img_o, $image);
					                }   
									$uploaddir = 'img/users/';
					                $mask = rand();
					                $ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
					                $uploadfile = $login ."_".$mask.".".$ext;
					                $size = getimagesize ($_FILES['file']['tmp_name']);
					                if ($size[0] > $size[1]) {
					                    crop($_FILES['file']['tmp_name'], $size[0]/2-$size[1]/2, 0, $size[1], $size[1]);
					                }
					                if ($size[1] > $size[0]) {
					                    crop($_FILES['file']['tmp_name'], 0, 0, $size[0], $size[0]);
					                }

					                \Cloudinary\Uploader::upload($_FILES['file']['tmp_name'], 
					                array("folder" => $uploaddir, "public_id" => $login."_".$mask));
					 }

					  $result = $mysqli->query("UPDATE `users` SET `name`='".$_POST['name']."', `age`='".$age."', `location`='".$location."', `avatar`='https://res.cloudinary.com/howtoru/image/upload/img/users/".$uploadfile."' WHERE id='".$_POST['id']."'");
				} else {
					$result = $mysqli->query("UPDATE `users` SET `name`='".$_POST['name']."', `age`='".$_POST['age']."', `location`='".$_POST['location']."' WHERE id='".$_POST['id']."'");
				}

				if (!$result) {
					$response['error'] = "Ошибка при загрузке в БД!";
				    echo json_encode( $response );
				    exit();
				} else {

						$response['success'] = "Информация изменена успешно!";
						echo json_encode( $response );
						exit();


				}

			} else {
				$response['error'] = "Отсутствует местоположение!";
			    echo json_encode( $response );
			    exit();
			}
		} else {
			$response['error'] = "Отсутствует возраст!";
		    echo json_encode( $response );
		    exit();
		}
	} else {
		$response['error'] = "Отсутствует имя!";
	    echo json_encode( $response );
	    exit();
	}

} else {
	$response['error'] = "Отсутствует ID!";
    echo json_encode( $response );
    exit();
}
?>