myApp.controller('StatusController', function($scope, $rootScope, $firebase, $firebaseAuth, Authentication, $location, FIREBASE_URL){
  var ref = new Firebase(FIREBASE_URL);
  $scope.authObj = $firebaseAuth(ref);
  $scope.authObj.$onAuth(function(authData) {
    if (authData) {
      console.log('Logged in as:', authData.uid);
      var ref = new Firebase(FIREBASE_URL + '/users/' + authData.uid);
      var user = $firebase(ref).$asObject();
      user.$loaded().then(function(){
        $rootScope.currentUser = user;
      });
    } else {
      console.log('Logged out');
      $rootScope.currentUser = null;
    }
  });
  $scope.logout = function(){
    Authentication.logout();
    $location.path('/login');
  }
});