function Profile() {
    
    this.stateEnum = { "NOT_REGISTERED" : 0 , "REGISTERED" : 1, "UNKNOWN" : 2};
    this.status = this.stateEnum.UNKNOWN;
    /*
     * "Local name" means the key value of the local storage
     */
    this.PROFILE_STATE_LOCAL_NAME = "profile_state";
    this.USERNAME_LOCAL_NAME = "profile_username";
    this.PASSWORD_LOCAL_NAME = "profile_encodedpassword";
    
    this.init = function() {
        this.loadState();
    };
    
    this.loadState = function() {
        this.status = window.Device.getLocalStorage(this.PROFILE_STATE_LOCAL_NAME);
        
        if(this.status === null)
        {
            this.status = this.stateEnum.UNKNOWN;
        }
    };
    
    this.saveState = function() {
        window.Device.setLocalStorage(this.PROFILE_STATE_LOCAL_NAME,this.status);
    };
    
    this.saveCredentials = function(username,encodedPassword) {
        window.Device.setLocalStorage(this.USERNAME_LOCAL_NAME,username);
        window.Device.setLocalStorage(this.PASSWORD_LOCAL_NAME,encodedPassword);
    };
    
    this.loadCredentials = function() {
        var username = window.Device.getLocalStorage(this.USERNAME_LOCAL_NAME);
        var encodedPassword = window.Device.getLocalStorage(this.PASSWORD_LOCAL_NAME);
        return {
            username: username,
            encodedPassword: encodedPassword
        };
    };
    
    this.validateCredentials = function(username,encodedPassword) {
        
        if(window.Device.getLocalStorage(this.USERNAME_LOCAL_NAME) !== username){
            return false;
        }
        
        if(window.Device.getLocalStorage(this.PASSWORD_LOCAL_NAME) !== encodedPassword){
            return false;
        }
        
        return true;
    };
    
    this.encodePassword = function(password) {
        //return $.md5(password);
        return password;
    };
};