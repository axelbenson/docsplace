 $(document).ready(function(){
            "use strict";

            $('input[name=login]').on({
              keydown: function(e) {
                if (e.which === 32)
                  return false;
              }
            });

            var pattern = /^[a-z0-9][a-z0-9\._-]*[a-z0-9]*@([a-z0-9]+([a-z0-9-]*[a-z0-9]+)*\.)+[a-z]+/i;
            var login_pattern = /^[a-z0-9][a-z0-9\_-]*[a-z0-9]/;
            var mail = $('input[name=email]');
            var confirm_err = document.getElementById('confirm_err');
            var submit_bt = document.getElementById('submit_bt');
            var login = $('input[name=login]');
            login.blur(function(){
               if(login.val() != ''){

                    if(login.val().search(login_pattern) == 0){
                   
                        login_err.style.display = 'none';
                        login_err.innerHTML = "";

                    }else{
                    
                        login_err.innerHTML = "Неправильный логин.";
                        login_err.style.display = 'block';

                    }
                } 
            });
            mail.blur(function(){
                if(mail.val() != ''){

                    if(mail.val().search(pattern) == 0){
                   
                        email_err.style.display = 'none';
                        email_err.innerHTML = "";

                    }else{
                    
                        email_err.innerHTML = "Неправильный Email.";
                        email_err.style.display = 'block';

                    }
                }else{
                    email_err.innerHTML = "Введите Ваш email.";
                    email_err.style.display = 'block';
                }
            });

            var password = $('input[name=password]');
            var confirm_password = $('input[name=confirm_password]');   

            function check(){
            if(password.val() != ''){
 
            if(password.val().length < 6){
                password_err.innerHTML = "Минимальная длина пароля 6 символов.";
                password_err.style.display = 'block';     
            }else{ 
                if(password.val() !== confirm_password.val()){
                    confirm_err.innerHTML = "Пароли не совпадают.";
                    password_err.style.display = 'block';
     
                }else{
                    confirm_err.innerHTML = "";
                    confirm_err.style.display = 'none';
                }
  
                password_err.innerHTML = "";
            }
     
        }else{
            password_err.innerHTML = "Введите пароль.";
            password_err.style.display = 'block';
        }
    }
            password.blur(check);
            confirm_password.blur(check);


            });