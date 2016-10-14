app.controller('SearchCtrl', ['$scope', '$rootScope', '$state', 'SearchService', 'dialog', 'SearchStorage', function ($scope, $rootScope, $state, SearchService, dialog, SearchStorage) {
    window.headerConfig = {
        enableHeader: false
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    //第一次进入页面search input获取焦点
    document.getElementById('searchInput').focus();
    if (SearchStorage.SEARCH_STORAGE.getItem('searchResult')) {
        var _res = SearchStorage.SEARCH_STORAGE.getItem('searchResult');
        $scope.searchContent = _res.text;
        getSimpleList(_res.results);
    }
    if (SearchStorage.SEARCH_STORAGE.getItem('searchMoreResult')) {
        var _res = SearchStorage.SEARCH_STORAGE.getItem('searchMoreResult');
        $scope.searchContent = _res.text;
        getCompleteList(_res.results);
    }

    $scope.routerGo = function(url){
        $state.go(url);
    }
    $scope.getMoreResult = function(obj){
        SearchStorage.SEARCH_STORAGE.putItem('searchMoreResult', {
            results: obj,
            text: $scope.searchContent
        });
        $state.go('layout.searchMore');
    }

    $scope.searchInfo = function(searchText){
        $scope.resDoc = false;
        $scope.resHp = false;
        $scope.resDes = false;
        if(searchText){
            $scope.searchTips = '正在查询"'+searchText+'"的结果,请稍等...';
            var params = {
                name: searchText
            };
            SearchService.searchInfo(params).then(
                function (res) {
                    SearchStorage.SEARCH_STORAGE.putItem('searchResult', {
                        results: res.results,
                        text: searchText
                    });
                    for(var obj in res.results) {
                        if(res.results.hasOwnProperty(obj)){
                            $scope.searchTips = false;
                            getSimpleList(res.results);
                            return true;
                        }
                    }
                    $scope.searchTips = '抱歉，没有找到任何关于"'+searchText+'"的结果。';
                }, 
                function (res) {
                    console.log('err',res);
                    var _alert = dialog.alert(res.errorMsg,{title:'出错啦！'});
                });
        }
    }

    function getSimpleList(_res){
        var res = _res;
        if (res.doctors) {
            $scope.resDoc = {
                simple: res.doctors.slice(0,3),
                complete: res.doctors,
                num: res.doctors.length,
                name: '医生'
            };
        }
        if(res.hospitals){
            $scope.resHp = {
                simple: res.hospitals.slice(0,3),
                complete: res.hospitals,
                num: res.hospitals.length,
                name: '医院'
            };
        }
        if(res.diseases){
            $scope.resDes = {
                simple: res.diseases.slice(0,3),
                complete: res.diseases,
                num: res.diseases.length,
                name: '疾病'
            };
        }
    }

    function getCompleteList(_res){
        var res = _res;
        if (res.name== '医生') {
            $scope.moreDoc = res.complete;
        }
        if(res.name== '医院'){
            $scope.moreHp = res.complete;
        }
        if(res.name== '疾病'){
            $scope.moreDes = res.complete;
        }
    }

    $scope.findHospital = function(_id){
        $state.go('layout.search-hospital',{
            diseasesId: _id
        });
    }

    $scope.findDoctor = function(_id){
        $state.go('layout.doctor',{
            diseasesId: _id
        });
    }

    $scope.goHp = function(_id){
        $state.go('layout.hospital-detail',{
            hospitalId: _id
        });
    }

    $scope.goDoc = function(_id){
        $state.go('layout.doctor-detail',{
            doctorId: _id
        });
    }

}]);