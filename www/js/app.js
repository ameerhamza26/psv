// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
        })

    .state('barscan', {
        url: '/barscan',
        templateUrl: 'templates/barscan.html',
        controller: 'BarscanCtrl'
    })

    .state('map', {
        url: '/map',
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
    })

    .state('splash', {
        url: '/splash',
        templateUrl: 'templates/splash.html',
        controller: 'SplashCtrl'
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/splash');
})

.controller('HomeCtrl', function($scope, $state) {
    $scope.navigate = function(id) {
        $state.go('barscan', { id: id });
    }
})

.controller('SplashCtrl', function($scope, $state, $timeout, $ionicHistory) {
    $ionicHistory.nextViewOptions({
            disableBack: true
        });
    $timeout(function(){
        $state.go('barscan');
    },5000);
})

.controller('BarscanCtrl', function($scope, $cordovaBarcodeScanner, $state, $ionicHistory, $ionicLoading, $timeout) {
    $scope.showCamera = true;
    $scope.showVefied = false;
    $scope.showExpired = false;
    $scope.showFake = false;
    $scope.tryAgain = false;
    $scope.showSoldout = false;
    $scope.scanBarcode = function() {
        $scope.showCamera = false;
        $scope.showVefied = false;
        $scope.showExpired = false;
        $scope.showFake = false;
        $scope.tryAgain = false;
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            //alert(imageData.text);
            //alert(getRandomInt(1,4))
            $scope.showCamera = false;
            $ionicLoading.show();
            $timeout(function() {
                $ionicLoading.hide();
                if (!imageData.cancelled) {

                    //var id = getRandomInt(1, 4);
                    if (imageData.text == 'TjyaFHlvSBg5RpD8Z6aE' || imageData.text == 'fsINjl3lwoi3BjviSRYE' || imageData.text == 'ujQJT7rDAwKsGffMfMKu') {
                        //alert("in if");
                        $scope.showVefied = true;
                        $scope.showExpired = false;
                        $scope.showFake = false;
                        $scope.showSoldout = false;
                        $scope.tryAgain = true;
                    } else if (imageData.text == 'y3WGnU54A1Fh69PlorBC' || imageData.text == 'oHAAEesobo2LMvg0NxNA' || imageData.text == 'SpNdn38EKSchlGlEUGLj') {
                        $scope.showVefied = false;
                        $scope.showExpired = false;
                        $scope.showFake = true;
                        $scope.showSoldout = false;
                        $scope.tryAgain = true;
                    } else if (imageData.text == 'da5720LjjsGhLzMEdmBC' || imageData.text == 'qGrxReviCuxOuOsQW5O6' || imageData.text == 'T5jNLFBoRRDfKDLOsJGm') {
                        $scope.showVefied = false;
                        $scope.showExpired = true;
                        $scope.showSoldout = false;
                        $scope.showFake = false;

                        $scope.tryAgain = true;
                    } else if (imageData.text == 'Fte7EQ3fXhNr4wMAOpxh' || imageData.text == 'Nxl0PNCazXLFZUmGDeVA' || imageData.text == 'd4FP8seX7dcKFnd6d6Ws') {
                        $scope.showVefied = false;
                        $scope.showExpired = false;
                        $scope.showSoldout = true;
                        $scope.showFake = false;

                        $scope.tryAgain = true;
                    } else {
                        $scope.showVefied = false;
                        $scope.showExpired = false;
                        $scope.showFake = true;
                        $scope.showSoldout = false;
                        $scope.tryAgain = true;
                    }
                } else {
                    $scope.showCamera = true;
                    $scope.showVefied = false;
                    $scope.showExpired = false;
                    $scope.showFake = false;
                    $scope.tryAgain = false;
                    $scope.showSoldout = false;
                }
            }, 2000);


            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    $scope.navigateToMap = function() {
        $ionicHistory.clearCache().then(function() { $state.go('map') })
    }

})

.controller('MapCtrl', function($scope, $http) {



    function initMap(latLng) {
        try {
            var mapOptions = {
                center: latLng,
                zoom: 11,
                mapTypeId: google.maps.MapTypeId.TERRAIN,
                disableDefaultUI: true,
                zoomControl: true,
                styles: [{ "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{ "color": "#f7f1df" }] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#d0e3b4" }] }, { "featureType": "landscape.natural.terrain", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.business", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.medical", "elementType": "geometry", "stylers": [{ "color": "#fbd3da" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#bde6ab" }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffe15f" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#efd151" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "color": "black" }] }, { "featureType": "transit.station.airport", "elementType": "geometry.fill", "stylers": [{ "color": "#cfb2db" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#a2daf2" }] }]
            };
            var infoWindow = new google.maps.InfoWindow({
                content: ""
            });
            map = new google.maps.Map(document.getElementById("map"), mapOptions);
            $http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=24.876852,67.062625&radius=10000&type=pharmacy&key=AIzaSyCyWjvylezBmwr7XhXjQUyAwuC8wq1tf_g', {}).success(function(res) {
                console.log("res", res);
                for (var j = 0; j < res.results.length; j++) {
                    var markerPos = new google.maps.LatLng(res.results[j].geometry.location.lat, res.results[j].geometry.location.lng);

                    var marker = new google.maps.Marker({
                        map: map,
                        animation: google.maps.Animation.DROP,
                        position: markerPos,
                        icon: 'img/feedmarker.png',
                    });

                    var infoWindowContent = "<h4>" + res.results[j].name + "</h4>";
                    addInfoWindow(marker, infoWindowContent, infoWindow);
                }
            })
        } catch (er) {
            console.log("err", er);
        }
    }

    function addInfoWindow(marker, content, infoWindow) {
        marker.addListener('click', function() {
            infoWindow.setContent(content);
            infoWindow.open(map, this);
        });
    }
    var latLng = new google.maps.LatLng(24.876852, 67.062625);
    initMap(latLng);

})
