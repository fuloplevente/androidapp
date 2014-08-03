/*
 * Universal device interface
 * Easily can be switched to another platform
 * Compatibility requeriments are marked on each platform depending function
 */

var Device = {
    
/*   localStorage
 *   Supported Platforms
 *   Android
 *   BlackBerry WebWorks (OS 6.0 and higher)
 *   iPhone
 *   Windows Phone 7
 *   webOS
 */    
    getLocalStorage: function(key) {
        return $.parseJSON(window.localStorage.getItem(key));
    },
    
    setLocalStorage: function(key,value) {
        window.localStorage.setItem(key,JSON.stringify(value));
    },
    
    getSessionStorage: function(key) {
        return $.parseJSON(window.sessionStorage.getItem(key));
    },
    
    setSessionStorage: function(key,value) {
        window.sessionStorage.setItem(key,JSON.stringify(value));
    },
    
    isOnline: function() {
        if(navigator.connection.type !== Connection.NONE)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}