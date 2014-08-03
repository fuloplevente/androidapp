var External = {
    onLogin : function(email,password) {
        $.post({
            url: external.address,
            type: POST,
            dataType: "json",
            data: ""
        }).done(function() {
            
        });
    }
}
external.address = "localhost";