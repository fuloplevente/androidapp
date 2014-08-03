var Profile = {
    
    stateEnum : { "NOT_REGISTERED" : 0 , "REGISTERED" : 1, "UNKNOWN" : 2},
    status : Profile.stateEnum.UNKNOWN,
    localName: "profile",
    
    init: function() {
        Profile.loadState();
    },
    
    loadState: function() {
        Profile.status = Device.getLocalStorage(Profile.localName);
        
        if(Profile.status === null)
        {
            Profile.status = Profile.stateEnum.UNKNOWN;
        }
    },
    
    saveState: function() {
        Device.setLocalStorage(Profile.localName,Profile.status);
    },
}