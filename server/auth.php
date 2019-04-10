<?php
    ini_set('display_errors',0);
    $user = json_decode(file_get_contents('php://input'), true);
    $response = [
        "success" => "",
        "error" => ""
    ];

    $_POST['login'] = $user['login'];
    $_POST['password'] = $user['password'];


/*
    ini_set("log_errors", 1); //включить лог ошибок
    ini_set("error_log", "/tmp/php-error.log"); //расположение лог-файла ошибок
    error_log( "Hello, errors!" ); //записать в лог-файл значение/строку
*/

    //Добавляем файл подключения к БД
    require_once("dbconnect.php");


    /*
        Проверяем была ли отправлена форма, то есть была ли нажата кнопка Войти. Если да, то идём дальше, если нет, значит пользователь зашел на эту страницу напрямую. В этом случае выводим ему сообщение об ошибке.
    */
      //(2) Место для обработки почтового адреса

            //Обрезаем пробелы с начала и с конца строки
            $login = trim($_POST["login"]);
            if(isset($_POST["login"]))
            {

                if(empty($login)){
                    // Сохраняем в сессию сообщение об ошибке. 
                    $response['error'] = "Поле для ввода логина пусто! Повторите попытку!";
                    echo json_encode( $response );
                    exit();
                }
                

            }
            else
            {
                // Сохраняем в сессию сообщение об ошибке. 
                $response['error'] = "Отсутствует поле для ввода логина! Повторите попытку!";
                echo json_encode( $response );

                //Останавливаем скрипт
                exit();
            }

             //(3) Место для обработки пароля
            if(isset($_POST["password"])){

                //Обрезаем пробелы с начала и с конца строки
                $password = trim($_POST["password"]);

                if(!empty($password)){
                    $password = htmlspecialchars($password, ENT_QUOTES);

                    //Шифруем пароль
                    $password = md5($password."top_secret");
                }else{
                    // Сохраняем в сессию сообщение об ошибке. 
                    $response['error'] = "Укажите Ваш пароль!";
                    echo json_encode( $response );

                    //Останавливаем скрипт
                    exit();
                }
                
            }else{
                // Сохраняем в сессию сообщение об ошибке. 
                $response['error'] = "Отсутствует поле для ввода пароля!";
                echo json_encode( $response );

                //Останавливаем скрипт
                exit();
            }

            // (4) Место для составления запроса к БД
            //Запрос в БД на выборке пользователя.
            $result_query_select = $mysqli->query("SELECT * FROM `users` WHERE login = '".$login."' AND password = '".$password."'");

            if(!$result_query_select){
                // Сохраняем в сессию сообщение об ошибке. 
                $response['error'] = "Ошибка запроса на выборке пользователя из БД!";
                echo json_encode( $response );

                //Останавливаем скрипт
                exit();
            }else{

                //Проверяем, если в базе нет пользователя с такими данными, то выводим сообщение об ошибке
                if($result_query_select->num_rows == 1){
                    
                     //Проверяем, подтвержден ли указанный email
                        while(($row = $result_query_select->fetch_assoc()) !=false){
                             
                            //Если email не подтверждён
                            if((int)$row["email_status"] == 0){
                     
                                // Сохраняем в сессию сообщение об ошибке. 
                               $response['error'] = "Вы зарегистрированы, но, Ваш почтовый адрес не подтверждён. Для подтверждения почты перейдите по ссылке из письма, которую получили после регистрации.";
                               echo json_encode( $response );
                     
                                //Останавливаем скрипт
                                exit();
                     
                            }else{
                                //место для добавления данных в сессию
                                // Если введенные данные совпадают с данными из базы, то сохраняем логин и пароль в массив сессий.
                                if((int)$row["block_status"] == 0){

                                    if ((int)$row["su"] == 0) {
                                      $response['success'] = "Success";  
                                    } else {
                                        $response['success'] = "su";
                                    } 

                                     
                                     echo json_encode( $response );
                         
                                    //Останавливаем скрипт
                                    exit();

                                }else {
                                      $response['error'] = "Вы заблокированы(";
                                      echo json_encode( $response );
                                }
                            }
                     
                        }
                }else{
                    
                    // Сохраняем в сессию сообщение об ошибке. 
                    $response['error'] = "Неправильный логин и/или пароль!";
                    echo json_encode( $response );
                    
                    exit();
                }
            }
