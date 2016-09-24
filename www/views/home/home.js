'Use Strict';
angular.module('App').controller('homeController', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, $firebaseAuth, Auth, FURL, Utils) {
  var ref = firebase.database().ref();
  $scope.authObj = $firebaseAuth();

  var itemsRef = firebase.database().ref('items/');
  $scope.items = $firebaseArray(itemsRef);

  $scope.logOut = function () {
      Auth.logout();
      $location.path("/login");
  }

  $scope.checkUser = function () {
    var firebaseUser = $scope.authObj.$getAuth();

    if (firebaseUser) {
    $log.log("Signed in as:", firebaseUser.uid);
    } else {
    $log.log("Signed out");
    $location.path("/login");
    }
  }

}

);
