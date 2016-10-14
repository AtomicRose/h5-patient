app.controller('HospitalRankCtrl', ['$scope', '$rootScope', 'CommonService', 'dialog', 'StorageConfig', 'HospitalService','$state', '$stateParams', function ($scope, $rootScope, CommonService, dialog, StorageConfig, HospitalService, $state, $stateParams) {
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: false,
        title: '医院排行榜'
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    var defaultObj = {
        page: 1,
        limit: 20
    }
    $scope.isShowMoreBtn = true;
    getHospitalList(defaultObj);
    function getHospitalList(_params){
        var spinner = dialog.showSpinner();
        HospitalService.getTopHospitalList(_params).then(
            function(res){
                if (!$scope.hospitalList) {
                    $scope.hospitalList = res.results;
                }else{
                    var _all = $scope.hospitalList;
                    $scope.hospitalList = _all.concat(res.results);
                }
                if (defaultObj.page==5) {
                    $scope.isShowMoreBtn = false;
                }
                dialog.closeSpinner(spinner.id);
            },
            function(res){
                dialog.closeSpinner(spinner.id);
                dialog.alert(res.errorMsg);
            }
        );
    }

    $scope.goToDetail = function(_id){
        $state.go('layout.hospital-detail', {
            hospitalId: _id
        });
    }
    
    $scope.loadMore = function(){
        defaultObj.page = defaultObj.page+1;
        getHospitalList(defaultObj);
    }

}]);