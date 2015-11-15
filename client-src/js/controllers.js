function getPastelColor() {
  var r = (Math.round(Math.random()* 127) + 70).toString(16);
  var g = (Math.round(Math.random()* 127) + 70).toString(16);
  var b = (Math.round(Math.random()* 127) + 70).toString(16);
  return '#' + r + g + b;
}

module.exports = function(app) {

  app.controller('MainCtrl', [
    '$scope',
    'User',
    function($scope, User) {

      $scope.loggedIn = false;
      $scope.$watch(function() {
        return User.isAuthenticated();
      }, function(auth) {
        $scope.loggedIn = auth;
      });
      $scope.logout = function() {
        User.logout(function() {
          $scope.loggedIn = false;
        });
      };

      $scope.nav = false;
      $scope.toggleNav = function() {
        if($scope.nav) {
          $scope.nav = false;
        } else {
          $scope.nav = true;
        }
      }
      $scope.isHome = true;
      $scope.$on('$stateChangeSuccess', function(ev, to) {
        $scope.nav = false;
        if(to.name == 'home')
          $scope.isHome = true;
        else
          $scope.isHome = false;
      });

      $scope.ratio = {
        'questions': 130,
        'replied': 60
      };
    }
  ]);

  app.controller('HomeCtrl', [
    '$scope',
    'Eixos',
    function($scope, Eixos) {
      $scope.eixos = Eixos;
    }
  ]);

  app.controller('IndicadorCtrl', [
    '$scope',
    'Indicador',
    'Eixo',
    'ActiveCycle',
    'Analise',
    function($scope, Indicador, Eixo, ActiveCycle, Analise) {

      $scope.indicador = Indicador;
      $scope.eixo = Eixo;
      $scope.ciclo = ActiveCycle;
      $scope.analise = Analise;

      $scope.getStatus = function(analise) {
        if(analise.status == 'partial')
          return 'Parcialmente cumprido';
        else if(analise.status == 'complete')
          return 'Cumprido';
        else if(analise.status == 'incomplete')
          return 'Não cumprido';
      };

      $scope.getStatusClass = function(analise) {
        if(analise.status == 'partial')
          return 'cross yellow';
        else if(analise.status == 'complete')
          return 'check';
        else if(analise.status == 'incomplete')
          return 'cross red';
      }

      // Fake data
      var date = moment('2015-06-05')
      $scope.since = date.fromNow();
      $scope.date = date.format('LLLL');
      $scope.date_ = date.format('L');
      $scope.pastelColor = _.memoize(function() {
        return getPastelColor();
      });

    }
  ]);

  app.controller('EixoCtrl', [
    '$scope',
    'Eixo',
    'Actions',
    'Indicadores',
    function($scope, Eixo, Actions, Indicadores) {

      $scope.eixo = Eixo;
      $scope.actions = Actions;
      $scope.indicadores = Indicadores;

    }
  ]);

  app.controller('RepCtrl', [
    '$scope',
    function($scope) {

      $scope.rep = {
        name: 'Ministério do Trabalho e Emprego (Detrae/SIT)',
        slug: 'MTE DETRAE',
        ratio: {
          'questions': 50,
          'replied': 20
        }
      }

    }
  ]);

  app.controller('StatusCtrl', [
    '$scope',
    function($scope) {

      $scope.ratio = {
        'questions': 120,
        'replied': 80
      }

      $scope.label = '{{ratio.replied}}/{{ratio.questions}} respondidas'

      $scope.orgs = [
        {
          id: 1,
          title: 'Lorem ipsum',
          ratio: {
            'questions': 30,
            'replied': 19
          }
        },
        {
          id: 1,
          title: 'Lorem ipsum',
          ratio: {
            'questions': 30,
            'replied': 19
          }
        },
        {
          id: 1,
          title: 'Lorem ipsum',
          ratio: {
            'questions': 30,
            'replied': 19
          }
        },
        {
          id: 1,
          title: 'Lorem ipsum',
          ratio: {
            'questions': 30,
            'replied': 19
          }
        },
        {
          id: 1,
          title: 'Lorem ipsum',
          ratio: {
            'questions': 30,
            'replied': 19
          }
        },
        {
          id: 1,
          title: 'Lorem ipsum',
          ratio: {
            'questions': 30,
            'replied': 19
          }
        }
      ]
    }
  ]);

};
