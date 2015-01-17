myApp.controller('MeetingsController', function($scope, $firebase, $rootScope, FIREBASE_URL, $firebaseAuth){
  var ref = new Firebase(FIREBASE_URL);
  var authObj = $firebaseAuth(ref);
  var authData = authObj.$getAuth();
  if (authData){
    var meetingsRef = new Firebase(FIREBASE_URL + '/users/' + authData.uid + '/meetings');

    var meetingsInfo = $firebase(meetingsRef);
    var meetingsObj = $firebase(meetingsRef).$asObject();
    var meetingsArray = $firebase(meetingsRef).$asArray();

    meetingsObj.$loaded().then(function(data){
      $scope.meetings = meetingsObj;
    });

    meetingsArray.$loaded().then(function(data){
      $rootScope.howManyMeetings = meetingsArray.length;
    });

    meetingsArray.$watch(function(event){
      $rootScope.howManyMeetings = meetingsArray.length;
    });
    $scope.addMeeting = function(){
      meetingsInfo.$push({
        name: $scope.meetingname,
        date: Firebase.ServerValue.TIMESTAMP
      }).then(function(){
        $scope.meetingname = '';
      });
    }
    $scope.deleteMeeting = function(key){
      meetingsInfo.$remove(key);
    }
  }

});