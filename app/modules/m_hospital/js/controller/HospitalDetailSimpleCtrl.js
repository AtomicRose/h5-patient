app.controller('HospitalDetailSimpleCtrl', ['$scope', '$rootScope','$state','$stateParams', function ($scope, $rootScope, $state, $stateParams) {
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: false,
        title: '瑞金医院',
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);


    //TODO ajax request the hospital data by the hospitalId

    $scope.hospitalDesc = '上海交通大学医学院附属瑞金医院建于1907年，原名广慈医院，是一所大型综合性教学三级甲等医院。医院占地面积12万平方米，建筑面积24.5万平方米，绿化面积4万平方米，核定床位1600张，全院职工3496人，其中医师1010余人（正副教授及各类高级科技人员593人）。瑞金医院拥有一大批在国内外享有较高知名度的医学专家，其中包括3名两院院士（中国科学院院士1人，中国工程院院士2人），1名欧洲科学院院士，2名发展中国家科学院院士，5名长江学者特聘教授，3名国家“973”项目首席科学家，9名国家杰出青年科学基金获得者等。瑞金医院于20世纪50年代成功抢救邱财康后，大面积烧伤治疗始终处于世界先进水平；70年代在国内率先开展了心脏和肝脏的移植手术；90年代在白血病分子生物学研究和临床医疗领域取得了重大进展；21世纪日臻完善的器官移植，使得许多病人将这里视为生命的绿洲。为此，医院获得了全国卫生系统先进集体（6次）、全国“五四”红旗团组织创建单位等.';

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

    $scope.goDepartment = function(item){
        //TODO go to the hospital-detail page. and the default selected department base on the param item
        //In the demo the data is static
        $state.go('layout.hospital-detail', {
            hospitalId: 60,
            hospitalDeptName: 'abc',
            departmentId: 103
        });
    };
}]);