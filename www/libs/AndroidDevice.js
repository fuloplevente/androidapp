/*
 * Universal device interface
 * Easily can be switched to another platform
 * Compatibility requeriments are marked on each platform depending function
 */

function Device() {
    
/*   localStorage
 *   Supported Platforms
 *   Android
 *   BlackBerry WebWorks (OS 6.0 and higher)
 *   iPhone
 *   Windows Phone 7
 *   webOS
 */    

    this.getLocalStorage = function(key) {
        if( ! window.localStorage.getItem(key))
        {
            return false;
        }
        return $.parseJSON(window.localStorage.getItem(key));
    };
    
    this.setLocalStorage = function(key,value) {
        window.localStorage.setItem(key,JSON.stringify(value));
    };
    
    this.getSessionStorage = function(key) {
        return $.parseJSON(window.sessionStorage.getItem(key));
    };
    
    this.setSessionStorage = function(key,value) {
        window.sessionStorage.setItem(key,JSON.stringify(value));
    };
    
    this.isOnline = function() {
        //debug in browser mode
        if(App.debug.Mode)
        {
            return App.debug.isOnline;
        }
        
        if( ! navigator.connection.type) return false;
        
        return navigator.connection.type !== Connection.NONE;
    };
    
};