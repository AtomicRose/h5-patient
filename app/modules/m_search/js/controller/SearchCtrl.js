app.controller('SearchCtrl', ['$scope', '$rootScope', '$state', 'SearchService', 'dialog', 'SearchStorage', function ($scope, $rootScope, $state, SearchService, dialog, SearchStorage) {
    window.headerConfig = {
        enableHeader: false
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    //第一次进入不显示back button
    $scope.isShowBackBtn = false;
    //第一次进入页面search input获取焦点
    document.getElementById('searchInput').focus();
    if (SearchStorage.SEARCH_STORAGE.getItem('searchResult')) {
        var _res = SearchStorage.SEARCH_STORAGE.getItem('searchResult');
        $scope.searchContent = _res.text;
        getSimpleList(_res.results);
    }
    // if (SearchStorage.SEARCH_STORAGE.getItem('searchMoreResult')) {
    //     var _res = SearchStorage.SEARCH_STORAGE.getItem('searchMoreResult');
    //     $scope.searchContent = _res.text;
    //     getCompleteList(_res.results);
    // }

    //初始化scroll
    var listScroll = new IScroll('#listScroll', {
        mouseWheel: false,
        click: true
    });
    setInterval(function () {
        listScroll.refresh();
    }, 500);

    // 跳转（取消-》首页）
    $scope.routerGo = function(url){
        $state.go(url);
    }

    // 点击查看更多
    $scope.getMoreResult = function(index){// 1des 2doc 3hos
        //显示back button
        $scope.isShowBackBtn = true;

        if (index == 1) { //疾病
            $scope.resDes = resDes.complete;
            $scope.resDoc = null;
            $scope.resHp = null;
            $scope.resMoveNum = $scope.resDesNum;
            $scope.resDesNum = 0;
            return true;
        }
        else if(index == 2){ //医生
            $scope.resDoc = resDoc.complete;
            $scope.resDes = null;
            $scope.resHp = null;
            $scope.resMoveNum = $scope.resDocNum;
            $scope.resDocNum = 0;
            return true;
        }
        else if(index == 3){ //医院
            $scope.resHp = resHp.complete;
            $scope.resDoc = null;
            $scope.resDes = null;
            $scope.resMoveNum = $scope.resHpNum;
            $scope.resHpNum = 0;
            return true;
        }else{
            return false;
        }
    }

    //搜索 获取res
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

    // 显示3条搜索结果
    var resDoc,resHp,resDes;
    function getSimpleList(_res){
        var res = _res;
        $scope.resMoveNum = null;

        if (res.doctors) {
            resDoc = {
                simple: res.doctors.slice(0,3),
                complete: res.doctors,
                num: res.doctors.length,
                name: '医生'
            };
            $scope.resDoc = resDoc.simple;
            $scope.resDocNum = resDoc.num;
        }
        if(res.hospitals){
            resHp = {
                simple: res.hospitals.slice(0,3),
                complete: res.hospitals,
                num: res.hospitals.length,
                name: '医院'
            };
            $scope.resHp = resHp.simple;
            $scope.resHpNum = resHp.num;
        }
        if(res.diseases){
            resDes = {
                simple: res.diseases.slice(0,3),
                complete: res.diseases,
                num: res.diseases.length,
                name: '疾病'
            };
            $scope.resDes = resDes.simple;
            $scope.resDesNum = resDes.num;
        }
    }

    // function getCompleteList(_res){
    //     var res = _res;
    //     if (res.name== '医生') {
    //         $scope.moreDoc = res.complete;
    //     }
    //     if(res.name== '医院'){
    //         $scope.moreHp = res.complete;
    //     }
    //     if(res.name== '疾病'){
    //         $scope.moreDes = res.complete;
    //     }
    // }


    //跳转医院详情
    $scope.goHp = function(_id){
        // $state.go('layout.hospital-detail',{
        //     hospitalId: _id
        // });
        $state.go('layout.hospital-detail-simple');
        
    }

    //跳转医生详情
    $scope.goDoc = function(_id){
        $state.go('layout.doctor-detail',{
            doctorId: _id
        });
    }

    //跳转疾病详情
    $scope.goDesDetail = function(){
        $state.go('layout.find-disease');
    }

    // 点击back button
    $scope.backStep = function(){
        $scope.isShowBackBtn = false;
        var _res = SearchStorage.SEARCH_STORAGE.getItem('searchResult');
        console.log('ressss',_res);
        getSimpleList(_res.results);
    }

    // 清楚input内容 并还原默认
    $scope.cleatInput = function(){
        $scope.searchContent = '';
        $scope.resDoc = null;
        $scope.resDes = null;
        $scope.resHp = null;
        $scope.searchTips = null;
        $scope.isShowBackBtn = false;
    }
}]);