'Use Strict';
angular.module('App', ['ionic','ngStorage', 'ngCordova','firebase', 'pascalprecht.translate','ngMessages'])
.config(function($stateProvider, $urlRouterProvider, $translateProvider, $translateStaticFilesLoaderProvider) {



  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('sanitize');
  $translateProvider.fallbackLanguage("en");

  $translateProvider.useStaticFilesLoader({
          prefix: 'langs/lang-',
          suffix: '.json'
        });

$stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login/login.html',
      controller:'loginController'
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'views/forgot/forgot.html',
      controller:'forgotController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register/register.html',
      controller:'registerController'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html',
      controller:'homeController'
    })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'views/templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'views/templates/tab-dash.html',
        controller: 'homeController'
      }
    }
  })

  .state('tab.trending', {
    url: '/trending',
    views: {
      'tab-trending': {
        templateUrl: 'views/templates/tab-trending.html',
        controller: 'TrendingCtrl'
      }
    }
  })

  .state('tab.saved', {
    url: '/saved',
    views: {
      'tab-saved': {
        templateUrl: 'views/templates/tab-saved.html',
        controller: 'homeController'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'views/templates/tab-account.html',
        controller: 'homeController'
      }
    }
  });
$urlRouterProvider.otherwise("/login");
})
// Changue this for your Firebase App URL.
.constant('FURL', {
    apiKey: "AIzaSyCtjYhDXXlJU5uoz1dA1y7QCtDHd30vxJw",
    authDomain: "shrink-ray.firebaseapp.com",
    databaseURL: "https://shrink-ray.firebaseio.com",
    storageBucket: "shrink-ray.appspot.com",
  }
  )
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function(FURL) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
