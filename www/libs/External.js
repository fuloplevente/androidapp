function External() {
    
    //AJAXEnum could be used for AJAX response decoding (100,101,404...)
    this.AJAXEnum = {"NO_RESPONSE" : 0, "RESPONSE" : 1};
    this.RegistrationEnum = {"USERNAME_RESERVED" : 0, "REGISTRATION_DONE" : 1};
    this.GETPASSWORD_ADDRESS = "http://localhost/androidserver/getpassword.php";
    this.REGISTER_ADDRESS = "http://localhost/androidserver/register.php";
    
    this.register = function(username,encodedPassword) {
        var result;
        $.ajax({
            url: this.REGISTER_ADDRESS,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            data: {username : username,encodedPassword : encodedPassword}
        }).error(function(xhr, status, error) {
            if(App.debugMode)
            {
                console.log(err.Message);
            }
            result =  { 
                        response: window.External.AJAXEnum.NO_RESPONSE,
                        data: null
                      };
            Login.registrationStop(result,username,encodedPassword);
        }).success(function(data) {
            result =  { 
                        response: window.External.AJAXEnum.RESPONSE,
                        data: data
                      };
            Login.registrationStop(result,username,encodedPassword);
        });
    }
    
    this.getPassword = function(username,encodedPassword) {
        var result;
        $.ajax({
            url: this.GETPASSWORD_ADDRESS,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            data: username
        }).error(function(xhr, status, error) {
            if(App.debugMode)
            {
                console.log(err.Message);
            }
            result =  { 
                        response: window.External.AJAXEnum.NO_RESPONSE,
                        data: null
                      };
            Login.validateStop(result,username,encodedPassword);
        }).success(function(data) {
            result =  { 
                        response: window.External.AJAXEnum.RESPONSE,
                        data: data
                      };
            Login.validateStop(result,username,encodedPassword);
        });
    };
    
};