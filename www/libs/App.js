var App = {
    
    debug : {Mode : true, isOnline: true},
    ProgressEnum : {"NONE" : 0, "VALIDATION" : 1, "REGISTRATION" : 2},
    inProgress : 0,
    ControllerInputType : {"VALIDATION_RESULT" : 1, "REGISTRATION_RESULT" : 2},
    
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    
    // Bind Event Listeners
    bindEvents: function() {
        
        //Deviceready event
        window.isphone = false;
        if(document.URL.indexOf("http://") === -1 
            && document.URL.indexOf("https://") === -1) {
            window.isphone = true;
        }
        if( window.isphone ) {
            document.addEventListener("deviceready", this.onDeviceReady, false);
        } else {
            this.onDeviceReady();
        }
        
        //Mobileinit event
        $( document ).bind( 'mobileinit', this.onLoading);
        
        //Network connection event
        document.addEventListener("online", this.onOnline, false);
    },
    
    initJs: function() {
        $.ajaxSetup({async:false});
        $.getScript("libs/jquery.mobile/jquery.mobile-1.4.3.js");
        $.getScript("libs/Profile.js");
        $.getScript("libs/Menu.js");
        $.getScript("libs/Login.js");
        $.getScript("libs/AndroidDevice.js");
        $.getScript("libs/External.js");
        $.ajaxSetup({async:true});
        
        //define global classes
        window.Login = new Login();
        window.External = new External();
        window.Profile = new Profile();
        window.Menu = new Menu();
        window.Device = new Device();
        
    },
    
    initCss: function() {
        $("head").append('<link type="text/css" rel="stylesheet" href="libs/jquery.mobile/jquery.mobile-1.4.3.css" />');
    },
    
    initHtml: function() {
        $("#menu").load("view/menu/menu.html");
    },
    
    onDeviceReady: function() {
        this.initHtml();
        this.initJs();
        this.initCss();
        
        $.mobile.allowCrossDomainPages = true;
        $.support.cors = true;
        
        this.inProgress = this.ProgressEnum.VALIDATION;
        this.Controller();
    },
    
    Controller: function(input) {
        
        //parameter as default
        if (typeof input === "undefined" || input === null) { 
            input = {"type" : null,"value" : null};
        }
        
        var credentials = window.Profile.loadCredentials();
        
        if( ! window.Device.isOnline() )
        {
            window.Menu.offline();
            if(credentials.encodedPassword)
            {
                window.Menu.login();
                return;
            }
            else
            {
                alert("Please go online!");
            }
            
            return;
        }
        
        window.Menu.online();
        
        
        if(input.type === this.ControllerInputType.REGISTRATION_RESULT)
        {
            if( input.value === External.RegistrationEnum.REGISTRATION_DONE)
            {
                alert("Registration done!");
                Menu.triggerLogin();
                return;
            }
            
            if( input.value === External.RegistrationEnum.USERNAME_RESERVED)
            {
                alert("Registration failed! Username already taken.");
                return;
            }
            
            alert("Registraion failed!");
            return;
        }
        
        if( ! credentials.encodedPassword)
        {
            window.Menu.login();
            return;
        }
        
        if(this.inProgress === this.ProgressEnum.VALIDATION)
        {
            window.Login.validateStart(credentials.username,credentials.encodedPassword);
            return;
        }
        
        if(input.type === this.ControllerInputType.VALIDATION_RESULT)
        {
            if(input.value)
            {
                alert("Logged in!");
                window.Menu.hide();
            }
        }
        
    }
};