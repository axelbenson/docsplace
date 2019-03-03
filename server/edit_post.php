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

if (isset($_POST['name'])) {
	if (isset($_POST['section'])) {
		if (isset($_POST['short'])) {
			if (isset($_POST['full'])) {

				$link = str_replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/", $_POST['videoLink']);
					if ($link == $_POST['videoLink']) {
						$link = str_replace("https://youtu.be/", "https://www.youtube.com/embed/", $_POST['videoLink']);
					}
					if (strpos($link, "embed") == false) {
						$link = '';
					}

				if ($_FILES['file0']['name']) {


					

					$ext = pathinfo($_FILES['file0']['name'], PATHINFO_EXTENSION);

					if(!in_array(strtolower($ext), $allowed)) 
					{
					  $uploadfile = "https://res.cloudinary.com/howtoru/image/upload/img/pictures/default.jpg";
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
					    $uploaddir = 'img/pictures/';
					    $ext = pathinfo($_FILES['file0']['name'], PATHINFO_EXTENSION);
					    $file = "https://res.cloudinary.com/howtoru/image/upload/".$uploaddir.$_POST['author']."_".str_replace(" ", "_", $_POST['name']);
					    $mask = rand();
					    $uploadfile = $file."_". $mask .".". $ext;
					    $size = getimagesize ($_FILES['file0']['tmp_name']);
					    if ($size[0]/$size[1] > 16/9) {
					    	crop($_FILES['file0']['tmp_name'], $size[0]/2-$size[1]*16/9/2, 0, 16/9*$size[1], $size[1]);
					    }
					    if ($size[0]/$size[1] < 16/9) {
					        crop($_FILES['file0']['tmp_name'], 0, $size[1]/2-$size[0]*9/16/2, $size[0], $size[0]*9/16);
					    }

					    \Cloudinary\Uploader::upload($_FILES['file0']['tmp_name'], 
					    array("folder" => $uploaddir, "public_id" => $_POST['author']."_".str_replace(" ", "_", $_POST['name'])."_".$mask));
					 }

					 $result = $mysqli->query("UPDATE instructions SET `name`='".trim($_POST['name'])."', `category`='".$_POST['section']."', `short_description`='".trim($_POST['short'])."', `full_description`='".(trim($_POST['full']))."', `ingredients`='".($_POST['needed'])."', `picture`='".$uploadfile."', `video_link`='".$link."' WHERE id='".$_POST['postId']."'");
				} else {
					$result = $mysqli->query("UPDATE instructions SET `name`='".trim($_POST['name'])."', `category`='".$_POST['section']."', `short_description`='".trim($_POST['short'])."', `full_description`='".(trim($_POST['full']))."', `ingredients`='".($_POST['needed'])."', `video_link`='".$link."' WHERE id='".$_POST['postId']."'");
				}


				

				if (!$result) {
					$response['error'] = "Ошибка при загрузке в БД!";
				    echo json_encode( $response );
				    exit();
				} else {

						for ($a = 1; $a < $_POST['numSteps']+1; $a++)
						{
							$stepName = $_POST['stepName'.$a];
							$stepDesc = $_POST['stepDesc'.$a];

							$ext = pathinfo($_FILES['file'.$a]['name'], PATHINFO_EXTENSION);
							$pic = '';

							if(in_array(strtolower($ext), $allowed)) 
							{
								$mask = rand();
								$uploaddir = 'img/pictures/';
								\Cloudinary\Uploader::upload($_FILES['file'.$a]['tmp_name'], 
						    	array("folder" => $uploaddir, "public_id" => $_POST['author']."_".str_replace(" ", "_", $_POST['name'])."_".$a."_".$mask));
						    	$pic = "https://res.cloudinary.com/howtoru/image/upload/img/pictures/".$_POST['author']."_".str_replace(" ", "_", $_POST['name'])."_".$a."_".$mask;
						    	
								$result = $mysqli->query("UPDATE `steps` SET `title`='".$stepName."', `text`='".($stepDesc)."', `picture`='".$pic."' WHERE id='".$_POST['stepId'.$a]."'");
							} else {

								$result = $mysqli->query("UPDATE `steps` SET `title`='".$stepName."', `text`='".($stepDesc)."' WHERE id='".$_POST['stepId'.$a]."'");

							}
							
							if (!$result) {
								$response['error'] = "Ошибка при добавлении шага ".$a." в БД!";
							    echo json_encode( $response );
							    exit();
							}

						}

						$response['success'] = "Инструкция изменена успешно!";
						echo json_encode( $response );
						exit();


				}

			} else {
				$response['error'] = "Введите полное описание!";
			    echo json_encode( $response );
			    exit();
			}
		} else {
			$response['error'] = "Введите краткое описание!";
		    echo json_encode( $response );
		    exit();
		}
	} else {
		$response['error'] = "Выберите раздел!";
	    echo json_encode( $response );
	    exit();
	}

} else {
	$response['error'] = "Отсутствует название инструкции!";
    echo json_encode( $response );
    exit();
}
?>