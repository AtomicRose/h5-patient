app.controller('DiseaseDetailCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'StorageConfig', function ($scope, $rootScope, $state, $stateParams, StorageConfig) {
    var storageTab = StorageConfig.FIND_STORAGE.getItem('findTab');
    $scope.tabSelected = storageTab || 0;
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        title: '甲状腺肿瘤',
        enableRefresh: false,
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    $scope.navList = ['疾病概述','发病原因','临床检查','疾病诊断','治疗方法','预防及饮食','推荐专家'];
    $scope.selectedNavIndex = 0;
    $scope.selectNav = function (index) {
        $scope.selectedNavIndex = index;
    };

    $scope.doctorList = [
        {
            id: '3131',
            name: '王进喜',
            title: ['教授','主任医师'],
            department: {
                department_name: '眼科',
                id: '10w02910'
            },
            hospital: {
                hospital_name: '北京协和医院',
                id: '0190110',
                short_name: '协和医院'
            },
            desc:'擅长：长期从事乳腺癌的一线临床和科研工作，苏打放多少在乳腺癌的早期发现，早期诊断，早期治疗，早期手术方面巴拉巴拉巴拉巴拉'
        },
        {
            id: '3131',
            name: '王进喜',
            title: ['教授','主任医师'],
            department: {
                department_name: '眼科',
                id: '10w02910'
            },
            hospital: {
                hospital_name: '北京协和医院',
                id: '0190110',
                short_name: '协和医院'
            },
            desc:'擅长：长期从事乳腺癌的一线临床和科研工作，苏打放多少在乳腺癌的早期发现，早期诊断，早期治疗，早期手术方面巴拉巴拉巴拉巴拉'
        },
        {
            id: '3131',
            name: '王进喜',
            title: ['教授','主任医师'],
            department: {
                department_name: '眼科',
                id: '10w02910'
            },
            hospital: {
                hospital_name: '北京协和医院',
                id: '0190110',
                short_name: '协和医院'
            },
            desc:'擅长：长期从事乳腺癌的一线临床和科研工作，苏打放多少在乳腺癌的早期发现，早期诊断，早期治疗，早期手术方面巴拉巴拉巴拉巴拉'
        },
        {
            id: '3131',
            name: '王进喜',
            title: ['教授','主任医师'],
            department: {
                department_name: '眼科',
                id: '10w02910'
            },
            hospital: {
                hospital_name: '北京协和医院',
                id: '0190110',
                short_name: '协和医院'
            },
            desc:'擅长：长期从事乳腺癌的一线临床和科研工作，苏打放多少在乳腺癌的早期发现，早期诊断，早期治疗，早期手术方面巴拉巴拉巴拉巴拉'
        },
        {
            id: '3131',
            name: '王进喜',
            title: ['教授','主任医师'],
            department: {
                department_name: '眼科',
                id: '10w02910'
            },
            hospital: {
                hospital_name: '北京协和医院',
                id: '0190110',
                short_name: '协和医院'
            },
            desc:'擅长：长期从事乳腺癌的一线临床和科研工作，苏打放多少在乳腺癌的早期发现，早期诊断，早期治疗，早期手术方面巴拉巴拉巴拉巴拉'
        },
        {
            id: '3131',
            name: '王进喜',
            title: ['教授','主任医师'],
            department: {
                department_name: '眼科',
                id: '10w02910'
            },
            hospital: {
                hospital_name: '北京协和医院',
                id: '0190110',
                short_name: '协和医院'
            },
            desc:'擅长：长期从事乳腺癌的一线临床和科研工作，苏打放多少在乳腺癌的早期发现，早期诊断，早期治疗，早期手术方面巴拉巴拉巴拉巴拉'
        },
        {
            id: '3131',
            name: '王进喜',
            title: ['教授','主任医师'],
            department: {
                department_name: '眼科',
                id: '10w02910'
            },
            hospital: {
                hospital_name: '北京协和医院',
                id: '0190110',
                short_name: '协和医院'
            },
            desc:'擅长：长期从事乳腺癌的一线临床和科研工作，苏打放多少在乳腺癌的早期发现，早期诊断，早期治疗，早期手术方面巴拉巴拉巴拉巴拉'
        },
        {
            id: '3131',
            name: '王进喜',
            title: ['教授','主任医师'],
            department: {
                department_name: '眼科',
                id: '10w02910'
            },
            hospital: {
                hospital_name: '北京协和医院',
                id: '0190110',
                short_name: '协和医院'
            },
            desc:'擅长：长期从事乳腺癌的一线临床和科研工作，苏打放多少在乳腺癌的早期发现，早期诊断，早期治疗，早期手术方面巴拉巴拉巴拉巴拉'
        }
    ];

    if(window.innerWidth<375){
        $scope.isTooSmall = true;
    }
    
    $scope.selectDoctor = function(item){
        $state.go('layout.doctor-detail',{
            doctorId: item.id
        });
    };

    var doctorScroll = new IScroll('#doctorRecommend', {
        click: true
    });
    setInterval(function(){
        doctorScroll.refresh();
    }, 300);
}]);