app.controller('FindDiseaseCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'StorageConfig', function ($scope, $rootScope, $state, $stateParams, StorageConfig) {
    var storageTab = StorageConfig.FIND_STORAGE.getItem('findTab');
    $scope.tabSelected = storageTab || 0;
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        title: '心肌梗塞',
        enableRefresh: false,
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    $scope.departmentList = [
        {
            departmentName: '整型美容科',
            id: '102io1'
        },
        {
            departmentName: '普外科',
            id: '102io1'
        },
        {
            departmentName: '小儿外科',
            id: '102io1'
        },
        {
            departmentName: '烧伤科',
            id: '102io1'
        },
        {
            departmentName: '皮肤科',
            id: '102io1'
        }
    ];

    $scope.goHospital = function (item) {
        //TODO go to the hospital list
        $state.go('layout.hospital');
    };

    $scope.doctorList = [
        {
            id: '3131',
            name: '王今夕',
            hospital: '北京协和医院',
            picUrl: 'app/images/img/head.jpg'
        },
        {
            id: '3131',
            name: '王今夕',
            hospital: '北京协和医院',
            picUrl: 'app/images/img/head.jpg'
        },
        {
            id: '3131',
            name: '王今夕',
            hospital: '北京协和医院',
            picUrl: 'app/images/img/head.jpg'
        },
        {
            id: '3131',
            name: '王今夕',
            hospital: '北京协和医院',
            picUrl: 'app/images/img/head.jpg'
        },
        {
            id: '3131',
            name: '王今夕',
            hospital: '北京协和医院',
            picUrl: 'app/images/img/head.jpg'
        }
    ];
    var content = document.getElementById('scrollRecommendContent');
    $scope.viewLen = $scope.doctorList.length >= 5 ? 6 : $scope.doctorList.length;
    content.style.width = $scope.viewLen * (150 / 12) + 'rem';
    var scrollRecommendDoctor = new IScroll('#scrollRecommendDoctor', {
        scrollX: true,
        scrollY: false,
        mouseWheel: false,
        click: true
    });
    setInterval(function(){
        scrollRecommendDoctor.refresh();
    }, 200);

    $scope.goDoctorDetail = function(item){
        $state.go('layout.doctor-detail',{
            doctorId: item.id
        });
    };
    $scope.moreRecommendDoctor = function(){
        $state.go('layout.doctor-recommend',{
            diseaseId: 'disease111'//entry the find disease Id
        });
    };

    $scope.goDiseaseDetail = function(){
        $state.go('layout.disease-detail', {
            diseaseId: '2131'
        });
    }
}]);