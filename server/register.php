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
        $age = trim($_POST["age"]);
        $location = trim($_POST["location"]);   
            
            if(isset($_POST["name"])){

                $name = trim($_POST["name"]);

                if(!empty($name)){

                    $name = htmlspecialchars($name, ENT_QUOTES);
                }else{

                   $response['error'] = "Укажите Ваше имя! Повторите попытку!";
                   echo json_encode( $response );
                    exit();
                }

                
            }else{
                
                $response['error'] = "Отсутствует поле с именем! Повторите попытку!";
                echo json_encode( $response );
                exit();
            }

            
            if(isset($_POST["login"])){

                $login = trim($_POST["login"]);

                if(!empty($login)){

                    $login = htmlspecialchars($login, ENT_QUOTES);
                }else{
 
                    $response['error'] = "Укажите Ваш логин! Повторите попытку!";
                    echo json_encode( $response );
                    exit();
                }

                
            }else{

                $response['error'] = "Отсутствует поле с логином! Повторите попытку!";
                echo json_encode( $response );
                exit();
            }

            
            if(isset($_POST["email"])){

                $email = trim($_POST["email"]);

                if(!empty($email)){


                    $email = htmlspecialchars($email, ENT_QUOTES);
                    $reg_email = "/^[a-z0-9][a-z0-9\._-]*[a-z0-9]*@([a-z0-9]+([a-z0-9-]*[a-z0-9]+)*\.)+[a-z]+/i";

                    if( !preg_match($reg_email, $email)){

                        $response['error'] = "Вы ввели неправильный email! Повторите попытку!";
                        echo json_encode( $response );
                        exit();
                    }

                    $result_query = $mysqli->query("SELECT `email` FROM `users` WHERE `email`='".$email."' OR `login`='".$login."'");

                    if($result_query->num_rows > 0){

                        if(($row = $result_query->fetch_assoc()) != false){
                            
                                $response['error'] = "Пользователь с таким почтовым адресом или логином уже зарегистрирован! Повторите попытку!";
                                echo json_encode( $response );
                                exit();
                            
                        }else{
                            // Сохраняем в сессию сообщение об ошибке. 
                           $response['error'] = "Ошибка в запросе к БД! Повторите попытку!";
                           echo json_encode( $response );
                           exit();
                        }
                        $result_query->close();
                        exit();
                    }
                    $result_query->close();
                }else{

                    $response['error'] = "Укажите Ваш email! Повторите попытку!";
                    echo json_encode( $response );
                    exit();
                }

            }else{

                $response['error'] = "Отсутствует поле для ввода Email! Повторите попытку!";
                echo json_encode( $response );
                exit();
            }

            
            if(isset($_POST["password"])){

                $password = trim($_POST["password"]);

                if(isset($_POST["confirm_password"])){

                    $confirm_password = trim($_POST["confirm_password"]);
                 
                    if($confirm_password != $password){

                    $response['error'] = "Пароли не совпадают! Повторите попытку!"; 
                    echo json_encode( $response );   
                    exit();
                        }
                     
                    }else{
                        // Сохраняем в сессию сообщение об ошибке. 
                       $response['error'] = "Отсутствует поле для повторения пароля! Повторите попытку!";
                       echo json_encode( $response );   
                        exit();
                    }

                if(!empty($password)){
                    $password = htmlspecialchars($password, ENT_QUOTES);

                    $password = md5($password."top_secret"); 
                }else{
                    $response['error'] = "Укажите Ваш пароль! Повторите попытку!";
                    echo json_encode( $response );
                    exit();
                }

            }else{

                $response['error'] = "Отсутствует поле для ввода пароля! Повторите попытку!";
                echo json_encode( $response );
                exit();
            }

            $allowed = array('png', 'jpg', 'gif', 'jpeg');

            $ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);

            if(!in_array(strtolower($ext), $allowed)) {
                $uploadfile = "default_avatar.png";
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
                $ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
                $uploadfile = $login .".". $ext;
                $size = getimagesize ($_FILES['file']['tmp_name']);
                if ($size[0] > $size[1]) {
                    crop($_FILES['file']['tmp_name'], $size[0]/2-$size[1]/2, 0, $size[1], $size[1]);
                }
                if ($size[1] > $size[0]) {
                    crop($_FILES['file']['tmp_name'], 0, 0, $size[0], $size[0]);
                }

                \Cloudinary\Uploader::upload($_FILES['file']['tmp_name'], 
                array("folder" => $uploaddir, "public_id" => $login));
                
            }

            

            $result_query_insert = $mysqli->query("INSERT INTO `users` (login, name, email, password, age, location, avatar) VALUES ('".$login."', '".$name."', '".$email."', '".$password."', '".$age."','".$location."','https://res.cloudinary.com/howtoru/image/upload/img/users/".$uploadfile."')");


            if(!$result_query_insert){

                $response['error'] = "Ошибка запроса на добавления пользователя в БД! Повторите попытку!";
                echo json_encode( $response );
                exit();
            }else{

                $token=md5($email.time());
                $query_insert_confirm = $mysqli->query("INSERT INTO `confirm_users` (email, token, date_registration) VALUES ('".$email."', '".$token."', NOW()) ");
                 
                if(!$query_insert_confirm){

                    $response['error'] = "Ошибка запроса на добавления пользователя в БД!";
                    echo json_encode( $response );
                    exit();
                }else{
                 
                    $subject = "Подтверждение почты на сайте HowTo";
                    $subject = "=?utf-8?B?".base64_encode($subject)."?=";
                 
                    //Составляем тело сообщения
                    $message = 'Здравствуйте! <br/> <br/> Сегодня, '.date("d.m.Y", time()).', этот E-Mail был использован при регистрации на сайте HowTo. Если это были Вы, то, пожалуйста, перейдите по этой ссылке и войдите в свой аккаунт: <a href="'.$address_site.'/activation.php?token='.$token.'&email='.$email.'">'.$address_site.'/activation/'.$token.'</a> <br/> <br/> Если это были не Вы, то просто игнорируйте это письмо.';
                     
                    $headers = "FROM: $email_admin\r\nReply-to: $email_admin\r\nContent-type: text/html; charset=utf-8\r\n";
                     
                    if(mail($email, $subject, $message, $headers)){
                       $response['success'] = "Регистрация прошла успешно! Теперь необходимо подтвердить введенный адрес электронной почты. Для этого, перейдите по ссылке, указанной в сообщении, которое отправлено на Вашу почту.";
                       echo json_encode( $response );
                        exit();
                 
                    }else{
                        $response['error'] = "Ошибка при отправлении письма с сылкой подтверждения, на почту ".$email;
                        echo json_encode( $response );
                    }
                 
                    // Завершение запроса добавления пользователя в таблицу users
                    $result_query_insert->close();
                 
                    // Завершение запроса добавления пользователя в таблицу confirm_users
                    $query_insert_confirm->close();
                }
            }

            //Закрываем подключение к БД
            $mysqli->close();
            
            exit();  
?>