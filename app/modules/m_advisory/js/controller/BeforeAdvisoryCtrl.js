app.controller('BeforeAdvisoryCtrl', ['$rootScope', '$scope', 'dialog','$state', function ($rootScope, $scope, dialog,$state) {
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: true,
        title: '在线咨询'
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    $scope.userGender = 'male';
    $scope.goSelectDisease = function(){
        $state.go('layout.disease');
    };
    $scope.goStartTalk = function(){
        $state.go('layout.advisory-talk');
    }
}]);