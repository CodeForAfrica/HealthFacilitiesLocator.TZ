var mainApp = angular.module("mainApp",['ui.bootstrap','ngDialog']);

mainApp.controller('healthFacilitiesController',function($scope,$http,ngDialog){
  $scope.facilities = [];
  $scope.query = "";

  var url = 'http://localhost/C4T/health-tool/api/facilities?q=';

  $scope.searchFacilities = function(){
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
});