var mainApp = angular.module("mainApp",['ui.bootstrap','ngDialog']);

mainApp.controller('healthFacilitiesController',function($scope,$http,$location,ngDialog){
  $scope.facilities = [];
  $scope.query = "";

  var url = $location.$$absUrl + 'api/facilities?q=';

  $scope.searchFacilities = function(){
    console.log(url);
    $scope.query = "";
    $scope.facilities = [];
    $scope.query = document.getElementById('query').value;

    $http.get(url+$scope.query)
    .then(function successCallback(response) {
        $scope.facilities = response.data.facilities;
    },
    function errorCallback(response) {
        console.log(response);
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