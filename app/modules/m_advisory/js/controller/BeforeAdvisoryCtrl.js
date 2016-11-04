app.controller('BeforeAdvisoryCtrl', ['$rootScope', '$scope', 'dialog', '$state', 'DoctorStorage', function ($rootScope, $scope, dialog, $state, DoctorStorage) {
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: true,
        title: '在线咨询'
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    $scope.userGender = 'male';
    $scope.goSelectDisease = function () {
        $state.go('layout.disease', {
            operateType: 1
        });
    };
    $scope.goStartTalk = function () {
        $state.go('layout.advisory-talk');
    };
    $scope.selectedDiseaseName = DoctorStorage.DISEASE_STORAGE.getItem('currentDisease')? DoctorStorage.DISEASE_STORAGE.getItem('currentDisease').disease : '请选择您的疾病名称';
}]);