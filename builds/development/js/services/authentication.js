myApp.factory('Authentication', function($firebase, $location, $q, $firebaseAuth, FIREBASE_URL, $rootScope){
  var ref = new Firebase(FIREBASE_URL);

  var myObject = {
    login: function(user){
      var deferred = $q.defer();
      function authHandler(error, authData) {
        if (error) {
          deferred.reject();
        } else {
          var userRef = new Firebase(FIREBASE_URL + '/users/' + authData.uid);
          var user = $firebase(ref).$asObject();
          user.$loaded().then(function(){
            $rootScope.currentUser = user;
          });

          deferred.resolve();
        }
      }
      ref.authWithPassword({
        email    : user.email,
        password : user.password
      }, authHandler);
      return deferred.promise;
    }, // login
    logout: function(){
      ref.unauth();
    }, // logout
    register: function(user){
      return $firebaseAuth(ref)
      .$createUser(user.email, user.password)
      .then(function(regUser){
        var ref = new Firebase(FIREBASE_URL + '/users');
        var firebaseUsers = $firebase(ref);
        var userInfo = {
          date: Firebase.ServerValue.TIMESTAMP,
          regUser: regUser.uid,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        }
        firebaseUsers.$set(regUser.uid, userInfo);
      }); // add user
    }, // register
    signedIn: function(){
      var authObj = $firebaseAuth(ref);
      var authData = authObj.$getAuth();
      return authData != null;
    }
  }

  // add the function to the $rootScope
  $rootScope.signedIn = function(){
    return myObject.signedIn();
  }

  return myObject;
});

