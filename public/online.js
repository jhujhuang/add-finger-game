(function () {
    'use strict';

    angular
        .module('app')
        .controller('GameController', GameController);

    GameController.$inject = ['$rootScope', '$routeParams'];
    function GameController($rootScope, $routeParams) {

        /* Register services. "Make the socket" */

        var socket = (function ($rootScope) {
          var socket = io.connect('http://localhost');
          return {
            on: function (eventName, callback) {
              socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                  callback.apply(socket, args);
                });
              });
            },
            emit: function (eventName, data, callback) {
              socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                  if (callback) {
                    callback.apply(socket, args);
                  }
                });
              })
            }
          };
        })($rootScope);
        console.log('made socket');

        socket.on('send:time', function (data) {
            vm.time = data.time;
            console.log('received time update' + vm.time);
        });

        /* Local variables */

        var vm = this;
        vm.time = 'TIME';

        vm.test = function() {
            vm.time = 'TESTTEST';
        };

        // some jQuery to make a link serve as an input option TODO: delete all
        $("#save_link").on('click', function(e) {
            e.preventDefault();
            if (vm.isInSession) {
                saveVersion();
            } else {
                alert("Please open a photo first!");
            }
        });

        $("#upload_link").on('click', function(e){
            e.preventDefault();
            $("#upload:hidden").trigger('click');
        });

        $("#open_link").on('click', function(e){
            e.preventDefault();
            $("#open").css('display', 'block');
            // get all the user's photos.
            openImage();
        });

        $("#hide_open_link").on('click', function(e) {
            e.preventDefault();
            $("#open").css('display', 'none');
        });

        $("#invite_link").on('click', function(e){
            e.preventDefault();
            if (vm.isInSession) {
                $("#invite_message").css('display', 'block');
            } else {
                alert("Please open a photo first!");
            }
        });

        $("#hide_invite_link").on('click', function(e) {
            e.preventDefault();
            $("#invite_message").css('display', 'none');
        });

        $("#revisions_link").on('click', function(e) {
            e.preventDefault();
            if (vm.isInSession) {
                $("#revisions").css('display', 'block');
                // Get all revisions
                getRevisions();
            } else {
                alert("Please open a photo first!");
            }
        });

        $("#hide_revisions_link").on('click', function(e) {
            e.preventDefault();
            console.log("Hide revisions");
            $("#revisions").css('display', 'none');
        });


        $("#upload:hidden").on('change', function(e){
            // var selectedFile = this.files[0];
            // selectedFile.convertToBase64(function(base64){
            //    alert(base64);
            // })
            uploadImage();
        });

        $('#photo-title').on('change', function(e) {
            e.preventDefault();
            if (vm.isInSession) {
                changeTitle(document.getElementById('photo-title').value);
            } else {
                alert("Please open a photo first!");
            }
        });


        initController();


        function initController() {
            console.log("Initialize the controller");
        }


        /* Editing related variables and logic. */

        vm.url = "undefined";
        vm.html = "";
        vm.isInSession = false;
        vm.title = "";


        if($routeParams.pId) {
            // TODO
            console.log("Is in session: " + vm.isInSession);
        }


        checkIsInSession();

        function checkIsInSession() {
            console.log("Checking is in session: " + vm.isInSession)
            if (vm.isInSession) {
                console.log("Set interval to fetch.");
            }   else {
                console.log("Currently no editing session is in place.");
            }
        }

    }

})();