angular.module('rpi_remote_control')
  .service('ApiService', function($http, $q) {


    var req = {
     method: 'GET',
     url: '',
     headers: { }
    };

    var service = {};

    service.performCall = function(url) {
      var deferred = $q.defer();
      req.url = url;
      $http(req)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data, status){
          deferred.reject("error-do-api-call-" + status);
        });
      return deferred.promise;
    }

    return service;

  })
  .controller('app', function($scope, ApiService){
    $scope.leds = [0,1,2];
    $scope.acendeLed = function(id){
      ApiService.performCall("http://vinifig.me:3079/liga/" + id).then(
        function(){
          console.log("Requisição para ligar led " + (id + 1) + " realizada com sucesso")
        },function(){
          console.log("Requisição para ligar led " + (id + 1) + " não realizada")
        }
      )
    }

    $scope.apagaLed = function(id){
      ApiService.performCall("http://vinifig.me:3079/desliga/" + id).then(
        function(){
          console.log("Requisição para desligar led " + (id + 1) + " realizada com sucesso")
        },function(){
          console.log("Requisição para desligar led " + (id + 1) + " não realizada")
        }
      )
    }
  })
