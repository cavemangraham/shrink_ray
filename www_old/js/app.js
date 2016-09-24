// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase', 'ngOpenFB'])

.run(function($ionicPlatform, ngFB) {

  ngFB.init({appId: '922565317849296'});

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://shrink-ray.firebaseio.com/items");
  return $firebaseArray(itemsRef);
})

.controller("ListCtrl", function($scope, Items, ngFB) {

  $scope.items = Items;

  $scope.addItem = function() {
    var name = prompt("What do you need to buy?");
    if (name) {
      $scope.items.$add({
        "name": name
      });
    }
  };

  $scope.fbLogin = function () {
    ngFB.login({ scope: 'email' }).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded', response);

                var credential = firebase.auth.FacebookAuthProvider.credential(
                    response.authResponse.accessToken);

                firebase.auth().signInWithCredential(credential).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });

            } else {
                alert('Facebook login failed');
            }
        });

}});
