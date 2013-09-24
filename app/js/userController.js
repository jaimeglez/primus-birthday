var plucker = angular.module('plunker', ['ui.bootstrap']);

function userController($scope, $timeout){

    //set calendar in the 80's 
    $scope.birthday = new Date(1988,0,1);

    //Initialize CloudAPI
    $scope.cAPI = new CloudAPI('filublfqmse');

    $scope.cAPI.select('firstapp', null, function(data){
        $scope.orginalData = data.array_;
        $scope.$apply(function(){
        $scope.users = data.array_;
        });
    });

    //Add a new user
    $scope.addUser = function(){

        var newUser = {
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            birthday: $scope.birthday.toISOString(),
            urlImage: $scope.image
        };

        $scope.cAPI.insert('firstapp',newUser, function(){
          console.log(arguments);
          $scope.users.push(newUser);
        });
    };

    //datepicker
    $scope.open = function() {
        $timeout(function() {
            $scope.opened = true;
        });
    };

    $scope.dateOptions = {
        'year-format': "'yyyy'",
        'starting-day': 1
    };

}


// plucker.directive('calendar', function(){

//     return{
//        restrict: 'E',
//        replace: true,
//        template: '<h3>My directive</h3>'

//        controller: function(){},

//        compile: function($attr){}

//        link: function(){},
//     };

// });
