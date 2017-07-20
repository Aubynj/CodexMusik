var app = angular.module('mainApp',['ngRoute']);

app.config(["$routeProvider",function($routeProvider){

  $routeProvider
  .when("/Start",{
    templateUrl : "join.htm"
  })
  .when("/Login",{
    templateUrl : "login.htm"
  })
  .when("/Beta",{
    resolve : {
      "check" : function($location, $rootScope){
        if(!$rootScope.loggedIn){
          $location.path('/Login');
        }
      }
    },
    templateUrl : "user.htm"
  })
  .otherwise({
    redirectTo : "/Start"
  })
}]);

app.controller("myList", function($scope,$location){
  $scope.currentPage = $location.path();
})


app.controller("loginContrl",function($scope, $location, $rootScope,$http){

  $scope.url = "root/login.php";

  $scope.login = function(isValid){


    var data = $.param({
      "Username":$scope.username,
      "Password":$scope.password
    });

    var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

    if(isValid){

      $http.post($scope.url, data ,config).then(function(response){

        if(response.data == 1){
          $rootScope.loggedIn = true;
          $location.path("/Beta");
        }else if(response.data == 0){
          alert("Username and Password combination cannot be found!");
        }else if(response.data == 2){
          alert("Please confirm your account.");
        }else if(response.data == 3){
          alert("Try again.");
        }
      })

  }

  }

});


//Checking all availability of usernames

app.directive('username', function($q, $timeout,$http) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      var usernames = [];
      $http.get("root/checkusers.php").then(function(response){
        usernames = response.data;
      });


      //Avoid spaces in username input
      //attrs.ngTrim = false;
      $('#nospaces').on({
        keydown: function(e){
          if(e.which === 32){
            return false;
          }
        },
        change : function(){
          this.value = this.value.replace(/\s/g, "");
        }
      });



      ctrl.$asyncValidators.username = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.resolve();
        }

        var def = $q.defer();

        $timeout(function() {
          // Mock a delayed response
          if (usernames.indexOf(modelValue) === -1) {
            // The username is available
            def.resolve();
          } else {
            def.reject();
          }

        }, 2000);

        return def.promise;
      };
    }
  };
});





app.controller("myFormJoin",['$scope','$http','$location',function($scope, $http, $location){
  $scope.url = "root/inits.php";
  $scope.checkUrl = "root/checkusers.php";


  $scope.submit = function(isValid){

    var data = $.param({
      "FullName":$scope.fullname,
      "Username":$scope.username,
      "Password":$scope.password,
      "Email":$scope.email
    });

    var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }


    if(isValid){

       $http.post($scope.url, data ,config).then(function(response){

         if(response.data == 1){
           console.log(response.data);
           alert("You have registered successfully. Please log in.");
           $location.path("/Login");
         }else if(response.data == 2){
           alert("Email already exist. Try using different email.");
         }else if(response.data == 0){
           alert("There is a problem submitting your form.");
         }

       })



    }else{
     alert("There is a problem submitting form");
   }

 };

}]);


app.controller("userSession",function($scope){

//Songs in the first list
  $scope.one = [
            {
                'id': 'one',
                'img': 'https://i.ytimg.com/vi/8u3bp0_0UGQ/maxresdefault.jpg',
                'title': 'Work',
                'artist': 'Rihanna',
                'url': 'http://bit.ly/2vdIFI6'
            },
            {
                'id': 'two',
                'img': 'https://images.genius.com/ccc87d4afb4e2d957a8c3c2700390bc1.1000x1000x1.jpg',
                'title': 'I\'m the one',
                'artist': 'DJ Khali',
                'url': "http://bit.ly/2ueI8rU"
            },
            {
                'id': 'three',
                'img': 'https://s-media-cache-ak0.pinimg.com/736x/ce/2c/d6/ce2cd6c93adb2b71c15ed4df1069f7fe--drunk-in-love-jay-z.jpg',
                'title': 'Drunken Love',
                'artist': 'Beyonce',
                'url': 'http://bit.ly/2uaplOO'
            },
            {
                'id': 'four',
                'img': 'https://images.genius.com/86e4006ed9590730cd3f521813e831d9.850x850x1.jpg',
                'title': 'Good Life',
                'artist': 'Kehlani',
                'url': 'http://bit.ly/2rTm1a3'
            }
          ];

//SOngs in second list
$scope.two = [
          {
              'id': 'one',
              'img': 'http://gh.tooxclusive.com/wp-content/uploads/2017/02/Screen-Shot-2017-02-26-at-09.27.17.png',
              'title': 'My Baby',
              'artist': 'MagNom ft Joe B',
              'url': 'http://bit.ly/2u9SqtK'
          },
          {
              'id': 'two',
              'img': 'http://www.ghanasongs.com/wp-content/uploads/2017/05/Shatta-Wale-Forgetti-Ft-Millitants-x-Natty-Lee-x-Pope-Skinny-Prod-By-Willis-Beatz-www.Ghanasongs.com_.jpg',
              'title': 'Forgetti',
              'artist': 'Shatta Wale',
              'url': 'http://bit.ly/2ujqAvt'
          },
          {
              'id': 'three',
              'img': 'https://i1.wp.com/www.zedextreme.com/wp-content/uploads/2017/06/Davido-R.-Kelly-IF-Remix.jpeg?fit=960%2C960&ssl=1',
              'title': 'IF RemiX',
              'artist': 'Davido ft R-Kelly',
              'url': 'http://bit.ly/2tNrcq9'
          },
          {
              'id': 'four',
              'img': 'http://music.com.gh/wp-content/uploads/2016/11/Bisa-Kdei-Life.jpg',
              'title': 'Life',
              'artist': 'Bisa-Kdei ft Patoranking',
              'url': 'http://bit.ly/2sRhi5u'
          }
        ];

//Songs in third lists
        $scope.three = [
                 {
                     'id': 'one',
                     'img': 'https://static.pulse.com.gh/img/incoming/origs6783494/6186365603-w644-h960/Lil-Win-Ladder-Feat.jpg',
                     'title': 'Ladder',
                     'artist': 'Lil Win',
                     'url': 'http://bit.ly/2t4SAmp'
                 },
                 {
                     'id': 'two',
                     'img': 'https://lh3.googleusercontent.com/-wexvSbZiZck/WQ6-ytf8fWI/AAAAAAAAA80/fzQdlOYpB4skMwnWXYLk5hjIVU5xh7ocwCHM/s1600/lil%2Bwin.jpg',
                     'title': 'Mama Boss Papa',
                     'artist': 'Lil Win ft Young Chorus',
                     'url': 'http://bit.ly/2iyfYDM'
                 },
                 {
                     'id': 'three',
                     'img': 'http://www.ghanamotion.com/wp-content/uploads/2017/03/shatta-wale-joint-77-addi-self-captan-taking-over-500x500.jpg',
                     'title': 'Taking Over',
                     'artist': 'Shatta Wale',
                     'url': 'http://bit.ly/2tND6Am'
                 },
                 {
                     'id': 'four',
                     'img': 'https://www.beatznation.com/wp-content/uploads/2016/09/Shatta-Wale-World-Champion-www.beatznation.com--470x470.jpg',
                     'title': 'Ayoo',
                     'artist': 'Shata Wale',
                     'url': 'http://bit.ly/2sQL7Dn'
                 }
               ];





});
