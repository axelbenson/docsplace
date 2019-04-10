<?php 
require_once("dbconnect.php");

if(isset($_GET['token']) && !empty($_GET['token'])){
 
    $token = $_GET['token'];
 
}else{
 
    exit("<p><strong>Ошибка!</strong> Отсутствует проверочный код.</p>");
 
}
 
 
 
//Проверяем, если существует переменная email в глобальном массиве GET
 
if(isset($_GET['email']) && !empty($_GET['email'])){
 
    $email = $_GET['email'];
 
}else{
 
    exit("<p><strong>Ошибка!</strong> Отсутствует адрес электронной почты.</p>");
 
}

//Делаем запрос на выборке токена из таблицы confirm_users
$query_select_user = $mysqli->query("SELECT `token` FROM `confirm_users` WHERE `email` = '".$email."'");
 
//Если ошибок в запросе нет
if(($row = $query_select_user->fetch_assoc()) != false){
 
 
    //Если такой пользователь существует
    if($query_select_user->num_rows == 1){
 
        //Проверяем совпадает ли token
        if($token == $row['token']){
 
            //Обновляем статус почтового адреса 
			$query_update_user = $mysqli->query("UPDATE `users` SET `email_status` = 1 WHERE `email` = '".$email."'");
			 
			if(!$query_update_user){
			 
			    exit("<p><strong>Ошибка!</strong> Сбой при обновлении статуса пользователя. Код ошибки: ".$mysqli->errno."</p>");
			 
			}else{
			 
			    //Удаляем данные пользователя из временной таблицы confirm_users
			    $query_delete = $mysqli->query("DELETE FROM `confirm_users` WHERE `email` = '".$email."'");
			 
			    if(!$query_delete){
			 
			        exit("<p><strong>Ошибка!</strong> Сбой при удалении данных пользователя из временной таблицы. Код ошибки: ".$mysqli->errno."</p>");
			 
			    }else{
			 		$_SESSION["error_messages"] .= "<label id='error' style='color: blue;'>Почта успешно подтверждена! Теперь Вы можете войти в свой аккаунт.</label>";
                     
	                    //Возвращаем пользователя
	                    header("HTTP/1.1 301 Moved Permanently");
	                    header("Location: http://localhost:4200");
			    }
			}

 
        }else{
            exit("<p><strong>Ошибка!</strong> Неправильный проверочный код.</p>");
        }
 
    }else{
        exit("<p><strong>Ошибка!</strong> Такой пользователь не зарегистрирован </p>");
    }
 
}else{
    exit("<p><strong>Ошибка!</strong> Сбой при выборе пользователя из БД. </p>");
}
 
 
// Завершение запроса выбора пользователя из таблицы users
$query_select_user->close();
 
//Закрываем подключение к БД
$mysqli->close();
 
?>