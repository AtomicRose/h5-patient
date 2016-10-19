app.controller('FeedbackCtrl',['$scope','$rootScope','StorageConfig','$state', 'dialog', function($scope,$rootScope,StorageConfig,$state,dialog){
    window.headerConfig={
        enableHeader: true,
        enableBack: true,
        enableRefresh: false,
        title: '意见反馈'
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);


    $scope.routerGo = function(url){
        $state.go(url);
    }

    $scope.textChange = function(_txt){
        $scope.feedbackTextNum = _txt.length;
        // $scope.$apply();
    }
    
}]);