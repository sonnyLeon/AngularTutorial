// Code goes here

(function() {
  var app = angular.module("gitHubViewer", []);

  var MainController = function($scope, $http, $interval, $log) {

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
    
    var decrementCountdown = function() {
      $scope.countdown -= 1;
      if($scope.countdown < 1){
        $scope.search($scope.username);
      }
    };
    
    var countdownInterval = null;
    var startCountdown = function() {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    $scope.search = function(username) {
      $log.info("searching for " + username);
      $http.get("https://api.github.com/users/" + username)
        .then(onUserComplete, onError);
        
      if(countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
    }

    $scope.message = "GitHub Viewer";
    $scope.username = "angular";
    $scope.repoSortOrder = "-stargazers_count"
    $scope.countdown = 5;
    startCountdown();

  };

  app.controller("MainController", ["$scope", "$http", "$interval", "$log", MainController]);

}());
