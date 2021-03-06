/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        
        //Deviceready event
        window.isphone = false;
        if(document.URL.indexOf("http://") === -1 
            && document.URL.indexOf("https://") === -1) {
            window.isphone = true;
        }
        if( window.isphone ) {
            alert("phone detected");
            document.addEventListener("deviceready", this.onDeviceReady, false);
        } else {
            this.onDeviceReady();
        }
        
        //Mobileinit event
        $( document ).bind( 'mobileinit', this.onLoading);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        app.initMmenu();
    },
    
    onLoading: function() {
        $.mobile.loading( 'show', {});
    },
    
    initMmenu: function (){
        $(function() {
            $('#menu').mmenu({
                    onClick: {
                            preventDefault: true
                    }
            }, {
                    offCanvas: {
                            pageSelector: 'div[data-role="page"]:first'
                    }
            });

            $('#menu a').on(
                    'click',
                    function()
                    {
                            var _t = this;
                            $('#menu').one(
                                    'closed.mm',
                                    function()
                                    {
                                            $.mobile.changePage( _t.href, {
                                                    transition: 'fade',
                                                    reverse: true
                                            });
                                    }
                            );
                    }
            );
        });

        $(document).on(
            'pageshow',
            function( e, ui )
            {
                    $('#menu').trigger( 'setPage', [ $(e.target) ] );
                    $('#menu a').each(
                            function()
                            {
                                    if ( $.mobile.path.parseUrl( this.href ).href == window.location.href )
                                    {
                                            $(this).trigger( 'setSelected.mm' );
                                    }
                            }
                    );
            }
        );
    }
};
