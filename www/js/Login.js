var Login = {
    
    stateEnum : { "NONE" : 0 , "DONE" : 1},
    status : Login.stateEnum.NONE,
    sessionName : "loginState",
    
    init: function() {
        Login.loadState();
    },
    
    loadState: function() {
        Login.status = Device.getSessionStorage(Login.sessionName);
        
        if(Login.status === null)
        {
            Login.status = Login.stateEnum.NONE;
        }
    },
    
    saveState: function() {
        Device.setSessionStorage(Login.sessionName,Login.status);
    },
    
    
}