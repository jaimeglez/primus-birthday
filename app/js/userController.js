function userController($scope, $timeout){

    //set calendar in the 80's 
    $scope.birthday = new Date(1988,0,1);
    var actualMonth = new Date().getMonth();

    //Initialize corsAPI
    $scope.cAPI = new corsAPI('bierdhrdunq');

    //make the query and request to the API
    $scope.cAPI.select('birthdays1', null, function(data){
        $scope.$apply(function(){
        $scope.users = data.array_;
        });
    });

    //set criteria in order to filter the array of users
    $scope.filterbyMonth = function(){
        $scope.criteria = { month: actualMonth};
    };

    //reset the criteria in order to get all records
    $scope.listAll = function(){
        $scope.criteria = '';
    };

    //filter with the previous criteria
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

        $scope.newUser = {
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            birthday: $scope.birthday.toISOString(),
            urlImage: $scope.image
        };


        $scope.cAPI.insert('birthdays1',$scope.newUser, function(data){
          $scope.newUser["_id"] = arguments[0]._id;
          console.log(arguments);
        });

        $scope.users.push($scope.newUser);
    };

    $scope.delUser = function(user){

        var index=$scope.users.indexOf(user)
        $scope.users.splice(index,1); 

        $scope.cAPI.del('birthdays1', user._id, function(){
          console.log(arguments);
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
