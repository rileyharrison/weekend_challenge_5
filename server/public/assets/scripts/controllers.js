myApp.controller("AddController", ["$scope", "PetService", function($scope, PetService){
    var petObject = {};
    var petService = PetService;

    //POST HERE
    $scope.submit = function(data){
      petService.postData(data);
    };


}]);

myApp.controller("ShowController", ["$scope", "PetService", function($scope, PetService){
    var petService = PetService;

    //GET HERE
    console.log("before getdata");
    petService.getData();

    $scope.myPets = petService.petData;
    console.log("we are in the showcontroller", $scope.myPets);

    $scope.deletePet = function(petId){
        console.log("fixing to nuke", petId);
        var nukeId = {"petId": petId}
        petService.nukePet(nukeId);

    };



}]);

myApp.controller("HomeController", ["$scope", "PetService", function($scope, PetService){
    var petService = PetService;
    petService.getData();
    $scope.myPets = petService.petData;




}]);
