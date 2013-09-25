var plucker = angular.module('plunker', ['ui.bootstrap']);

function userController($scope, $timeout){

    //set calendar in the 80's 
    $scope.birthday = new Date(1988,0,1);
    var actualMonth = new Date().getMonth();

    //Initialize CloudAPI
    $scope.cAPI = new CloudAPI('bierdhrdunq');

    //make the query and request to the API
    $scope.cAPI.select('birthdays1', null, function(data){
        $scope.originalData = data.array_;
        $scope.$apply(function(){
        $scope.users = data.array_;
        });
    });

    $scope.filterbyMonth = function(){
        $scope.criteria = { month: actualMonth};
    };

    $scope.listAll = function(){
        $scope.criteria = '';
    };

    $scope.criteriaMatch = function( user ) {
            var birthdayMonth = new Date(user.birthday).getMonth();
            if ($scope.criteria){
                if (birthdayMonth === $scope.criteria.month)
                    { return user; }
            }
            else { return user; }
    };

    //Add a new user
    $scope.addUser = function(){

        var newUser = {
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            birthday: $scope.birthday.toISOString(),
            urlImage: $scope.image
        };

        $scope.cAPI.insert('birthdays1',newUser, function(){
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
