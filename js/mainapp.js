var mainApp = angular.module("mainApp",['ui.bootstrap','ngDialog']);

mainApp.controller('healthFacilitiesController',function($scope,$http,$location,ngDialog){
  $scope.facilities = [];
  $scope.query = "";
  $scope.disabled = true;

  //var url = 'http://htools-tz-healthfacilities-dev.dokku-2.healthtools.codeforafrica.org/api/facilities?q=';
  var url = 'api/facilities?q=';

  $scope.newFacility = function(){
    $scope.query = document.getElementById('query').value;
    if($scope.query.length > 0)
      $scope.disabled = false;
    else $scope.disabled = true;

    console.log($scope.query);
  }

  $scope.searchFacilities = function(){
    $scope.facilities = [];

    $http.get(url+$scope.query)
    .then(function successCallback(response) {
        if(response.data.facilities){
          $scope.facilities = response.data.facilities;
          $scope.no_results = "";
        }
        else {
          $scope.no_results = "Hakuna kituo cha afya kilicho karibu yako.";
        }
    },
    function errorCallback(response) {
        console.log(response.data);
    });

    ngDialog.open({
      template: 'facilities',
      className: 'ngdialog-theme-default',
      scope: $scope
    });
  }

  $scope.showEmbedCodes = function(){
    ngDialog.open({
      template: 'embed',
      className: 'ngdialog-theme-default',
      scope: $scope
    });
  }
});