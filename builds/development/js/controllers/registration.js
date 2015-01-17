myApp.controller('RegistrationController', function($scope, $location, Authentication){
  $scope.login = function(){
    Authentication
    .login($scope.user)
    .then(function(data) {
      $location.path('meetings');
    }).catch(function(error) {
      $scope.message = 'Login failed !';
    });
  }
  $scope.register = function(){
    Authentication.register($scope.user)
    .then(function(user){
      Authentication
      .login($scope.user)
      .then(function(data) {
        $location.path('meetings');
      }).catch(function(error) {
        $scope.message = 'Login failed !';
      });
      $location.path('/meetings');
    }, function(error){
      $scope.message = error.toString();
    });
  };
});