app.controller('DoctorRecommendCtrl', ['$scope', '$rootScope', 'DoctorService', '$state', 'dialog', '$stateParams', 'DoctorStorage', 'CommonService', 'StorageConfig', function ($scope, $rootScope, DoctorService, $state, dialog, $stateParams, DoctorStorage, CommonService, StorageConfig) {

    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        title: '名医推荐'
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    /************** filter *******************/

    /**
     * mock data
     * @type {{hot: *[], all: *[]}}
     */

    var area = {
        hot: [
            {
                city: '北京',
                id: '1'
            },
            {
                city: '上海',
                id: '1'
            },
            {
                city: '广州',
                id: '1'
            },
            {
                city: '深圳',
                id: '1'
            }
        ],
        all: [
            {
                letter: 'A',
                list: [
                    {
                        city: '安庆',
                        id: '1'
                    },
                    {
                        city: '安阳',
                        id: '1'
                    },
                    {
                        city: '鞍山',
                        id: '1'
                    }
                ]
            },
            {
                letter: 'B',
                list: [
                    {
                        city: '北京',
                        id: '1'
                    },
                    {
                        city: '宝鸡',
                        id: '1'
                    },
                    {
                        city: '贝阿',
                        id: '1'
                    }
                ]
            },
            {
                letter: 'D',
                list: [
                    {
                        city: '大庆',
                        id: '1'
                    },
                    {
                        city: '德顺',
                        id: '1'
                    },
                    {
                        city: '德安',
                        id: '1'
                    }
                ]
            },
            {
                letter: 'F',
                list: [
                    {
                        city: '抚顺',
                        id: '1'
                    },
                    {
                        city: '阜阳',
                        id: '1'
                    },
                    {
                        city: '福安',
                        id: '1'
                    }
                ]
            },
            {
                letter: 'G',
                list: [
                    {
                        city: '高浦',
                        id: '1'
                    },
                    {
                        city: '固阳',
                        id: '1'
                    }
                ]
            },
            {
                letter: 'H',
                list: [
                    {
                        city: '合肥',
                        id: '1'
                    },
                    {
                        city: '和安',
                        id: '1'
                    },
                    {
                        city: '湖口',
                        id: '1'
                    }
                ]
            }
        ]
    };
    var hospital = [
        {
            hospital_name: '上海市第二军医大学附属长海医院',
            short_name: '长海医院',
            id: '1'
        },
        {
            hospital_name: '上海市复旦大学附属华山医院',
            short_name: '华山医院',
            id: '2'
        },
        {
            hospital_name: '上海市同济大学附属仁济医院',
            short_name: '仁济医院',
            id: '3'
        },
        {
            hospital_name: '上海市曙光医院',
            short_name: '',
            id: '4'
        },
    ];
    var level = [
        {
            name: '教授',
            id: '0'
        },
        {
            name: '副教授',
            id: '1'
        },
        {
            name: '主任医师',
            id: '2'
        },
        {
            name: '副主任医师',
            id: '3'
        },
        {
            name: '主治医师',
            id: '1'
        }
    ];

    $scope.hotCity = area.hot;
    var formatRes = formatCityList(area.all);
    $scope.allCity = formatRes.cityArray;
    $scope.letterNavList = formatRes.letterArray;
    $scope.hospitalList = hospital;
    $scope.levelList = level;

    function formatCityList(objArea) {
        var tempArray = [];
        var letterArray = [];
        for (var i = 0; i < objArea.length; i++) {
            tempArray.push({
                city: objArea[i].letter,
                id: objArea[i].letter,
                type: 'tag'
            });
            letterArray.push(objArea[i].letter);
            for (var j = 0, list = objArea[i].list; j < list.length; j++) {
                tempArray.push(list[j]);
            }
        }
        return {
            letterArray: letterArray,
            cityArray: tempArray
        };
    }

    var areaScroll = new IScroll('#areaFilter', {
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

    setInterval(function () {
        areaScroll.refresh();
        hospitalScroll.refresh();
        levelScroll.refresh();
        doctorScroll.refresh();
    }, 300);


    $scope.ctrlFilter = function (index) {
        if ($scope.filterIndex == index) {
            $scope.filterShow = !$scope.filterShow;
        } else {
            $scope.filterShow = true;
        }
        $scope.filterIndex = index;
    };
    $scope.scrollToLetter = function(item){
        var ele = document.getElementById(item);
        areaScroll.scrollToElement(ele);
    };
    if(!DoctorStorage.AREA_HOSPITAL_LEVEL_STORAGE.getItem('selectedCity')){
        DoctorStorage.AREA_HOSPITAL_LEVEL_STORAGE.putItem('selectedCity', $scope.hotCity[1]);
    }
    if(!DoctorStorage.AREA_HOSPITAL_LEVEL_STORAGE.getItem('selectedHospital')){
        DoctorStorage.AREA_HOSPITAL_LEVEL_STORAGE.putItem('selectedHospital', $scope.hospitalList[0]);
    }
    if(!DoctorStorage.AREA_HOSPITAL_LEVEL_STORAGE.getItem('selectedLevel')){
        DoctorStorage.AREA_HOSPITAL_LEVEL_STORAGE.putItem('selectedLevel', $scope.levelList[0]);
    }
    $scope.selectedCity =DoctorStorage.AREA_HOSPITAL_LEVEL_STORAGE.getItem('selectedCity');
    $scope.selectedHospital = DoctorStorage.AREA_HOSPITAL_LEVEL_STORAGE.getItem('selectedHospital');
    $scope.selectedLevel = DoctorStorage.AREA_HOSPITAL_LEVEL_STORAGE.getItem('selectedLevel');
    $scope.selectCity = function(item){
        if(item.type !== 'tag'){
            $scope.selectedCity = item;
            DoctorStorage.AREA_HOSPITAL_LEVEL_STORAGE.putItem('selectedCity', item);
            DoctorStorage.AREA_HOSPITAL_LEVEL_STORAGE.putItem('selectedHospital', $scope.hospitalList[0]);
            $scope.selectedHospital = DoctorStorage.AREA_HOSPITAL_LEVEL_STORAGE.getItem('selectedHospital');
            $scope.filterShow = false;
            //TODO call the query service to get the hospital list in current city.
        }
    };
    $scope.selectHospital = function(item){
        $scope.selectedHospital = item;
        DoctorStorage.AREA_HOSPITAL_LEVEL_STORAGE.putItem('selectedHospital', item);
        $scope.filterShow = false;
        //TODO call the query service to get the hospital list in current city.
    };
    $scope.selectLevel = function(item){
        $scope.selectedLevel = item;
        DoctorStorage.AREA_HOSPITAL_LEVEL_STORAGE.putItem('selectedLevel', item);
        $scope.filterShow = false;
        //TODO call the query service to get the hospital list in current city.
    };
    /************** end filter ******************/

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

    $scope.selectDoctor = function(item){
        $state.go('layout.doctor-detail',{
            doctorId: item.id
        });
    };

}]);