app.controller('DoctorCtrl', ['$scope', '$rootScope', 'DoctorService','$state', 'dialog', '$stateParams', 'DoctorStotage', 'CommonService', 'StorageConfig', function ($scope, $rootScope, DoctorService, $state, dialog, $stateParams, DoctorStotage, CommonService, StorageConfig) {
    
    window.headerConfig={
        enableHeader: true,
        enableBack: true,
        title: '找名医'
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    $scope.goDoc = function(_id){
        $state.go('layout.doctor-detail', {
            doctorId: _id
        });
    }

    var defaultParams = {
        city: 0,
        disease: '',
        disease_sub_category: ''
    }
    var tabObj = {dept:'',disease:'',city:''};
    if(!DoctorStotage.DOCTOR_TAB_STORAGE.getItem('tabObj')){
        selectedCall(defaultParams);
        console.log('无tab缓存');
    }else{
        getLocalTab(DoctorStotage.DOCTOR_TAB_STORAGE.getItem('tabObj'));
    }
    function getLocalTab(_tabObj){
        console.log('_tabObj',_tabObj);
        $scope.deptName = _tabObj.dept.name||'';
        $scope.diseaseName = _tabObj.disease.name||'';
        $scope.cityName = _tabObj.city.city||0;
        defaultParams = {
            city: _tabObj.city.id||0,
            disease: _tabObj.disease.id||'',
            disease_sub_category: _tabObj.dept.id||''
        };
        if (defaultParams.disease_sub_category) {
            getDiseaseList(defaultParams.disease_sub_category);
        }
        selectedCall(defaultParams);//刷新医生列表
    }
    //  初始化获取科室列表
    getDeptList();

    $scope.isShowContent = false;
    $scope.showContent = function(_index){
        $scope.isShowContent = true;
        if (_index==$scope.selectedIndex) {
            //重复选中则关闭列表
            $scope.hideContent();
        }else{
            // console.log('ul',_ulist);
            if(_index==2&&$scope.deptName==undefined){//疾病
                $scope.selectedIndex = 1;
                return false;
            }
            $scope.selectedIndex = _index;
        }
    }
    $scope.hideContent = function(){
        $scope.selectedIndex = false;
        $scope.isShowContent = false;
    }

    $scope.getClass = function(_index, _name){
        if (_name == $scope.deptName) {
            // var setScrollTime = setTimeout(function() {
            //     console.log(_index,_name)
            //     var _ulist = document.getElementById('scrollContainer');
            //     _ulist.scorllTop = _index*47;
            // }, 2000);
            return 'li-selected';
        }
        return false;
    }

    $scope.clickDeptList = function(_deptObj,$event){
        $event.stopPropagation();
        $scope.hideContent();
        $scope.deptName = _deptObj.name;
        defaultParams.disease_sub_category = _deptObj.id;
        selectedCall(defaultParams);//刷新医生列表
        getDiseaseList(_deptObj.id);//获取疾病列表
        tabObj.dept = _deptObj;
        DoctorStotage.DOCTOR_TAB_STORAGE.putItem('tabObj', tabObj);
    }
    $scope.clickDiseaseList = function(_diseaseObj,$event){
        $event.stopPropagation();
        $scope.hideContent();
        $scope.diseaseName = _diseaseObj.name;
        defaultParams.disease = _diseaseObj.id;
        selectedCall(defaultParams);//刷新医生列表
        tabObj.disease = _diseaseObj;
        DoctorStotage.DOCTOR_TAB_STORAGE.putItem('tabObj', tabObj);
    }
    $scope.clickCityList = function(_cityObj,$event){
        $event.stopPropagation();
        $scope.hideContent();
        $scope.cityName = _cityObj.city;
        defaultParams.city = _cityObj.id;
        selectedCall(defaultParams);//刷新医生列表
        tabObj.city = _cityObj;
        DoctorStotage.DOCTOR_TAB_STORAGE.putItem('tabObj', tabObj);
    }
    function openDeptList(_list){
        if (_list&&_list.length) {
            $scope.deptList = _list;
        }
    }
    function openDiseaseList(_list){
        if (_list&&_list.length) {
            $scope.diseaseList = _list;
        }
    }
    function openCityList(_list){
        if (_list&&_list.length) {
            $scope.cityList = _list;
        }
    }

    function selectedCall(params) {
        var spinner = dialog.showSpinner();
        var _params = params;
        if($stateParams.diseasesId!=''){
            _params.disease = $stateParams.diseasesId;
        }
        // console.log('_params',_params);
        DoctorService.getDoctorByQuery(_params).then(function(res){
            dialog.closeSpinner(spinner.id);
            if(res.results && res.results.length){
                // "isContracted": "1", 签约专家    isServiceId  2-义诊
                $scope.doctorList = res.results;
            }else{
                $scope.doctorList = [];
                dialog.toast('该地区暂时没有医生哦~');
            }
        },function(res){
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }

    // var deptId,diseaseId;
    function getDeptList(){
        DoctorService.getDetpList().then(
            function(res){
                var _deptList = res.results;
                openDeptList(_deptList);
            },
            function(res){
                console.log('res',res);
            }
        );
    }
    function getDiseaseList(_id){
        var optionUrl = {
            deptId: _id
        }
        DoctorService.getDiseaseList(optionUrl).then(
            function(res){
                var _disList = res.results.disease;
                openDiseaseList(_disList);
            },
            function(res){
                console.log('res',res);
            }
        );
    }

    //  获取地区
    var defaultAllCity = {city: '全部地区', id: 0, is_hot: 0};
    if (!(StorageConfig.CITY_STORAGE.getItem('doctorCities') && StorageConfig.CITY_STORAGE.getItem('doctorCities').length)) {
        requestGetCities();
    }else{
        openCityList((StorageConfig.CITY_STORAGE.getItem('doctorCities')));
    }
    function requestGetCities() {
        var params = {
            has_team: 0,
            type: 'doctor'
        };
        CommonService.getCity(params).then(function (res) {
            var allCities = [defaultAllCity].concat(res.results);
            openCityList(allCities);
            StorageConfig.CITY_STORAGE.putItem('doctorCities', allCities);
        }, function (res) {
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }

}]);