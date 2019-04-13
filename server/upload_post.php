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

$date = date('Y-m-d');

if ($_POST['name']!='') {
	if ($_POST['section']!='') {
		if ($_POST['short']!='') {
			if ($_POST['full']!='') {

				$allowed = array('png', 'jpg', 'gif', 'jpeg');

				$ext = pathinfo($_FILES['file0']['name'], PATHINFO_EXTENSION);

				if(!in_array(strtolower($ext), $allowed)) 
				{
				  $uploadfile = "https://res.cloudinary.com/howtoru/image/upload/docsplace/placeholders/".$_POST['section'].".jpg";
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
				    $uploaddir = 'docsplace/pictures/';
				    $ext = pathinfo($_FILES['file0']['name'], PATHINFO_EXTENSION);
				    $file = "https://res.cloudinary.com/howtoru/image/upload/".$uploaddir.$_POST['author']."_".str_replace(" ", "_", $_POST['name']);
				    $uploadfile = $file .".". $ext;
				    $size = getimagesize ($_FILES['file0']['tmp_name']);
				    if ($size[0]/$size[1] > 16/9) {
				    	crop($_FILES['file0']['tmp_name'], $size[0]/2-$size[1]*16/9/2, 0, 16/9*$size[1], $size[1]);
				    }
				    if ($size[0]/$size[1] < 16/9) {
				        crop($_FILES['file0']['tmp_name'], 0, $size[1]/2-$size[0]*9/16/2, $size[0], $size[0]*9/16);
				    }

				    \Cloudinary\Uploader::upload($_FILES['file0']['tmp_name'], 
				    array("folder" => $uploaddir, "public_id" => $_POST['author']."_".str_replace(" ", "_", $_POST['name'])));
				}

				if ($_POST['instruction'] != '') {
					$instruction = $_POST['instruction'];
				} else {
					$instruction = '';
				}

				if ($_POST['videoLink']=='') {
					$result = $mysqli->query("INSERT INTO `instructions` (`name`, `author`, `category`, `hashtags`, `short_description`, `picture`, `full_description`, `instruction`, `date`, `num_steps`) VALUES ('".trim($_POST['name'])."', '".trim($_POST['author'])."', '".$_POST['section']."', '".$_POST['tags']."', '".$_POST['short']."','".$uploadfile."','".$_POST['full']."','".$instruction."','".$date."', '".$_POST['numSteps']."')");
				} else {
					$link = str_replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/", $_POST['videoLink']);
					if ($link == $_POST['videoLink']) {
						$link = str_replace("https://youtu.be/", "https://www.youtube.com/embed/", $_POST['videoLink']);
					}
					if (strpos($link, "embed") == false) {
						$link = '';
					}
					$result = $mysqli->query("INSERT INTO `instructions` (`name`, `author`, `category`, `hashtags`, `short_description`, `picture`, `full_description`, `instruction`, `date`, `num_steps`, `video_link`) VALUES ('".trim($_POST['name'])."', '".trim($_POST['author'])."', '".$_POST['section']."', '".$_POST['tags']."', '".$_POST['short']."','".$uploadfile."','".$_POST['full']."','".$instruction."','".$date."', '".$_POST['numSteps']."', '".$link."')");
				}

				if (!$result) {
					$response['error'] = "Ошибка при загрузке в БД!";
				    echo json_encode( $response );
				    exit();
				} else {

					$result2 = $mysqli->query("SELECT LAST_INSERT_ID()");

					if (!$result2) {
						$response['error'] = "Ошибка при получении ID инструкции!";
					    echo json_encode( $response );
					    exit();
					} else {
						
						$post = $result2->fetch_row();
						$post_id = $post[0];
						for ($a = 1; $a < $_POST['numSteps']+1; $a++)
						{

							$ext = pathinfo($_FILES['file'.$a]['name'], PATHINFO_EXTENSION);
							$pic = '';

							if(in_array(strtolower($ext), $allowed)) 
							{
								$uploaddir = 'docsplace/pictures/';
								\Cloudinary\Uploader::upload($_FILES['file'.$a]['tmp_name'], 
						    	array("folder" => $uploaddir, "public_id" => $_POST['author']."_".str_replace(" ", "_", $_POST['name'])."_".$a));
						    	$pic = "https://res.cloudinary.com/howtoru/image/upload/docsplace/pictures/".$_POST['author']."_".str_replace(" ", "_", $_POST['name'])."_".$a;
							}
							$stepName = $_POST['stepName'.$a];
							$stepDesc = $_POST['stepDesc'.$a];
							$stepVideoLink = $_POST['stepVideoLink'.$a];
							$link = '';

							if ($stepVideoLink != '') {
								$link = str_replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/", $stepVideoLink);
								if ($link == $stepVideoLink) {
									$link = str_replace("https://youtu.be/", "https://www.youtube.com/embed/", $stepVideoLink);
								}
								if (strpos($link, "embed") == false) {
									$link = '';
								}
							} 
							
							if ($stepName && ($stepDesc || $pic || ($link != ''))) {
								if ($link != '') {
									$result = $mysqli->query("INSERT INTO `steps` (`post_id`, `number`, `title`, `text`, `picture`, `video_link`) VALUES ('".$post_id."', '".$a."', '".$stepName."', '".$stepDesc."', '".$pic."', '".$link."')");
								} else {
									$result = $mysqli->query("INSERT INTO `steps` (`post_id`, `number`, `title`, `text`, `picture`) VALUES ('".$post_id."', '".$a."', '".$stepName."', '".$stepDesc."', '".$pic."')");
								}

								if (!$result) {
									$response['error'] = "Ошибка при добавлении шага ".$a." в БД!";
								    echo json_encode( $response );
								    exit();
								}
							}
							

						}

						$response['success'] = "Инструкция добавлена успешно!";
						echo json_encode( $response );
						exit();

					}

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