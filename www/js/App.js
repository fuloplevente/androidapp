var App = {
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
        $.getScript("js/libs/jquery-mobile/jquery.mobile.js");
        $.getScript("js/Menu.js");
        $.getScript("js/Profile.js");
        $.ajaxSetup({async:true});
    },
    
    initCss: function() {
        $("head").append('<link type="text/css" rel="stylesheet" href="css/style.mobile.css" />');
    },
    
    onDeviceReady: function() {
        App.initJs();
        App.initCss();
        
        Menu.init();
        Login.init();
        
        App.Controller();
    },
    
    Controller: function() {
        
        if( ! Device.isOnline())
        {
            Menu.offline();
            return;
        }
        
        if(Login.status === Login.stateEnum.NONE)
        {
            Menu.login();
            return;
        }
        
    }
};