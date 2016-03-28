myApp.factory("PetService", ["$http", function($http){

    var petData = {};


    var getData = function(){
       $http.get("/pets").then(function(response){
          console.log("getting",response.data);

          petData.results = response.data;

       });
    };

    var nukePet = function(petId){
        console.log("in factory", petId.petId);
        $http.delete("/pets/" + petId.petId).then(function(response){
            getData();
        });
    };

    // var initialCall = function(){
    //       if(petData.results === undefined){
    //         $http.get("/pets").then(function(response){
    //           petData.results = response.data;
    //         });
    //       }
    //     };

    var postData = function(data){
       $http.post("/pets", data).then(function(response){
          console.log("posting",response.data);
          getData();
       });
    };

    return {
      postData: postData,
      getData: getData,
      petData: petData,
      nukePet: nukePet,
      //initialCall: initialCall
    };
}]);
