function Menu() {
    
    this.offline = function() {
        
    };
    
    this.online = function() {
        
    };
    
    this.login = function() {
        if( ! $("#login").html())
        {
            $.ajaxSetup({async:false});
            $("#login").load("view/login/login.html");
            $("#LoginButton").click(function(event){
                window.Login.validateStart(
                        $("#username").val(),
                        Profile.encodePassword($("#password").val())
                        );
            });
            $("#RegisterButton").click(function(){
                window.Login.registrationStart(
                        $("#username").val(),
                        Profile.encodePassword($("#password").val())
                        );
            });
            $.ajaxSetup({async:true});
        }
    };
    
    this.loginFailed = function() {
        alert("Login failed! Wrong username or password.");
    };
    
    this.hide = function() {
        $("#login").remove();
    };
};