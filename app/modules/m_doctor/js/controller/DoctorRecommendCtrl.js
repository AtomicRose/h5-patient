app.controller('DoctorRecommendCtrl', ['$scope', '$rootScope', 'DoctorService','$state', 'dialog', '$stateParams', 'DoctorStorage', 'CommonService', 'StorageConfig', function ($scope, $rootScope, DoctorService, $state, dialog, $stateParams, DoctorStorage, CommonService, StorageConfig) {
    
    window.headerConfig={
        enableHeader: true,
        enableBack: true,
        title: '名医推荐'
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    var areaScroll = new IScroll('#areaFilter',{
        click: true
    });
    var hospitalScroll = new IScroll('#hospitalFilter', {
        click: true
    });
    var levelScroll = new IScroll('#levelFilter', {
        click: true
    });
    var doctorScroll = new IScroll('#doctorScroll', {
        click: true
    });

    setInterval(function(){
        areaScroll.refresh();
        hospitalScroll.refresh();
        levelScroll.refresh();
        doctorScroll.refresh();
    }, 300);


    $scope.ctrlFilter = function(index){
        if($scope.filterIndex == index){
            $scope.filterShow = !$scope.filterShow;
        }else{
            $scope.filterShow = true;
        }
        $scope.filterIndex = index;
    };

}]);