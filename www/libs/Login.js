function Login() {
    
    this.stateEnum = { "NONE" : 0 , "DONE" : 1};
    this.STATE_SESSION_NAME = "login_state";
    
    this.init = function() {
        this.loadState();
    };
    
    this.loadState = function() {
        var status = window.Device.getSessionStorage(this.STATE_SESSION_NAME);
        
        // exception: the STATE_SESSION_NAME is not found in the session storage
        if(status === null)
        {
            status = this.stateEnum.NONE;
        }
        
        return status;
    };
    
    this.saveState = function() {
        window.Device.setSessionStorage(this.STATE_SESSION_NAME,this.status);
    };
    
    this.validateStart = function(username,encodedPassword) {
        window.External.getPassword(username,encodedPassword);
        App.inProgress = App.ProgressEnum.NONE;
    };
    
    this.validateStop = function(Message,username,encodedPassword) {
        if(Message.response !== window.External.AJAXEnum.RESPONSE)
        {
            App.Controller({type: App.ControllerInputType.VALIDATION_RESULT, value: false});
            return;
        }
        
        if(Message.data !== encodedPassword)
        {
           App.Controller({type: App.ControllerInputType.VALIDATION_RESULT, value: false});
           window.Menu.loginFailed();
           return;
        }
        
        window.Profile.saveCredentials(username,encodedPassword);
        App.Controller({type: App.ControllerInputType.VALIDATION_RESULT, value: true});
    }
    
    this.registrationStart = function(username,encodedPassword)
    {
        window.External.register(username,encodedPassword);
    }
    
    this.registrationStop = function(Message,username,encodedPassword) {
        if(Message.response !== window.External.AJAXEnum.RESPONSE)
        {
            App.Controller({type: App.ControllerInputType.REGISTRATION_RESULT, value: false});
            return;
        }
        
        App.Controller({type: App.ControllerInputType.REGISTRATION_RESULT, value: Message.data});
    }
    
};