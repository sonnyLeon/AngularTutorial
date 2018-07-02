// Code goes here

(function() {
  var app = angular.module("gitHubViewer", []);

  var MainController = function($scope, $http) {

    var onUserComplete = function(response) {
      $scope.user = response.data;
      $http.get($scope.user.repos_url).then(onRepos, onError);
    };
    
    var onRepos = function(response) {
      $scope.repos = response.data;
    }

    var onError = function(reason) {
      $scope.error = "Couldn't fetch the user";
    };

    $scope.search = function(username) {
      $http.get("https://api.github.com/users/" + username)
        .then(onUserComplete, onError);
    }

    $scope.message = "GitHub Viewer";
    $scope.username = "angular";
    $scope.repoSortOrder = "-stargazers_count"

  };

  app.controller("MainController", ["$scope", "$http", MainController]);

}());
