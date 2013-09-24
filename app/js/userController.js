function userController($scope){

  //Initialize CloudAPI
  $scope.cAPI = new CloudAPI('filublfqmse');

  //Method to refres da list
  $scope.refreshList = function(){
    $scope.cAPI.select('firstapp', null, function(data){
      $scope.$apply(function(){
        $scope.users = data.array_;
      });
    });
  };

  //Add a new user
  $scope.addUser = function(){
    var newUser = {
      firstname: $scope.firstname,
      lastname: $scope.lastname,
      birthday: $scope.birthday,
      urlImage: $scope.image
    };

    $scope.cAPI.insert('firstapp',newUser, function(){
      console.log(arguments);
    });
  };


  //Populate the list
  $scope.refreshList();
}

