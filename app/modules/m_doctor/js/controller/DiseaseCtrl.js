app.controller('DiseaseCtrl', ['$scope', '$rootScope', '$state', 'DoctorStorage','$stateParams', function ($scope, $rootScope, $state, DoctorStorage,$stateParams) {
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        title: '疾病选择'
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    var departmentScroll = new IScroll('#departmentScroll', {
        mouseWheel: false,
        click: true
    });
    var diseaseScroll = new IScroll('#diseaseScroll', {
        mouseWheel: false,
        click: true
    });

    $scope.allList = [
        {
            department: '普外科',
            id: '10000',
            usuallyDisease: [
                {
                    disease: '骨折',
                    id: '10001'
                },
                {
                    disease: '踝关节扭伤',
                    id: '10002'
                }
            ],
            allDisease: [
                {
                    letter: 'A',
                    list: [
                        {
                            disease: 'A1',
                            id: 'A1'
                        },
                        {
                            disease: 'A2',
                            id: 'A2'
                        },
                        {
                            disease: 'A3',
                            id: 'A3'
                        },
                        {
                            disease: 'A4',
                            id: 'A4'
                        }
                    ]
                },
                {
                    letter: 'B',
                    list: [
                        {
                            disease: 'B1',
                            id: 'B1'
                        },
                        {
                            disease: 'B2',
                            id: 'B2'
                        },
                        {
                            disease: 'B3',
                            id: 'B3'
                        },
                        {
                            disease: 'B4',
                            id: 'B4'
                        },
                        {
                            disease: 'B5',
                            id: 'B5'
                        },
                        {
                            disease: 'B6',
                            id: 'B6'
                        },
                        {
                            disease: 'B7',
                            id: 'B7'
                        },
                        {
                            disease: 'B8',
                            id: 'B8'
                        },
                        {
                            disease: 'B4',
                            id: 'B4'
                        }
                    ]
                },
                {
                    letter: 'D',
                    list: [
                        {
                            disease: 'D1',
                            id: 'D1'
                        },
                        {
                            disease: 'D2',
                            id: 'D2'
                        },
                        {
                            disease: 'D3',
                            id: 'D3'
                        },
                        {
                            disease: 'D4',
                            id: 'D4'
                        }
                    ]
                },
                {
                    letter: 'E',
                    list: [
                        {
                            disease: 'E1',
                            id: 'E1'
                        },
                        {
                            disease: 'E2',
                            id: 'E2'
                        },
                        {
                            disease: 'E3',
                            id: 'E3'
                        },
                        {
                            disease: 'E4',
                            id: 'E4'
                        }
                    ]
                },
                {
                    letter: 'G',
                    list: [
                        {
                            disease: 'G1',
                            id: 'G1'
                        },
                        {
                            disease: 'G2',
                            id: 'G2'
                        },
                        {
                            disease: 'G3',
                            id: 'G3'
                        },
                        {
                            disease: 'G4',
                            id: 'G4'
                        }
                    ]
                },
                {
                    letter: 'H',
                    list: [
                        {
                            disease: 'H1',
                            id: 'H1'
                        },
                        {
                            disease: 'H2',
                            id: 'H2'
                        },
                        {
                            disease: 'H3',
                            id: 'H3'
                        },
                        {
                            disease: 'H4',
                            id: 'H4'
                        }
                    ]
                }
            ]
        },
        {
            department: '心血管外科',
            id: '20000',
            usuallyDisease: [
                {
                    disease: '心肌梗塞',
                    id: '20001'
                },
                {
                    disease: '缺血性心脏病',
                    id: '20002'
                },
                {
                    disease: '心率失常',
                    id: '20003'
                }
            ],
            allDisease: [
                {
                    letter: 'A',
                    list: [
                        {
                            disease: 'A1',
                            id: 'A1'
                        },
                        {
                            disease: 'A2',
                            id: 'A2'
                        },
                        {
                            disease: 'A3',
                            id: 'A3'
                        },
                        {
                            disease: 'A4',
                            id: 'A4'
                        }
                    ]
                },
                {
                    letter: 'B',
                    list: [
                        {
                            disease: 'B1',
                            id: 'B1'
                        },
                        {
                            disease: 'B2',
                            id: 'B2'
                        },
                        {
                            disease: 'B3',
                            id: 'B3'
                        },
                        {
                            disease: 'B4',
                            id: 'B4'
                        },
                        {
                            disease: 'B5',
                            id: 'B5'
                        },
                        {
                            disease: 'B6',
                            id: 'B6'
                        },
                        {
                            disease: 'B7',
                            id: 'B7'
                        },
                        {
                            disease: 'B8',
                            id: 'B8'
                        },
                        {
                            disease: 'B4',
                            id: 'B4'
                        }
                    ]
                },
                {
                    letter: 'D',
                    list: [
                        {
                            disease: 'D1',
                            id: 'D1'
                        },
                        {
                            disease: 'D2',
                            id: 'D2'
                        },
                        {
                            disease: 'D3',
                            id: 'D3'
                        },
                        {
                            disease: 'D4',
                            id: 'D4'
                        }
                    ]
                }
            ]
        }
    ];

    if(!DoctorStorage.DISEASE_STORAGE.getItem('departmentIndex')){
        DoctorStorage.DISEASE_STORAGE.putItem('departmentIndex', 0);
    }
    $scope.selectedDepartmentIndex = DoctorStorage.DISEASE_STORAGE.getItem('departmentIndex');
    var formatRes = formatList($scope.allList[$scope.selectedDepartmentIndex]);
    $scope.allDiseaseList = formatRes.diseaseList;
    $scope.letterNavList = formatRes.letterList;

    $scope.selectDepartment = function (item, index) {
        $scope.selectedDepartmentIndex = index;
        DoctorStorage.DISEASE_STORAGE.putItem('departmentIndex', index);
        $scope.selectedDiseaseIndex = '';
        var formatRes = formatList(item);
        $scope.allDiseaseList = formatRes.diseaseList;
        $scope.letterNavList = formatRes.letterList;
    };

    $scope.selectDisease = function (item, index) {
        if (item.type === 'tag') {
            return false;
        }
        $scope.selectedDiseaseIndex = index;
        DoctorStorage.DISEASE_STORAGE.putItem('diseaseIndex', index);
        //TODO go to the doctor page
        /**
         * operateType
         * 0: go to the doctor recommend page;
         * 1: return the disease id and disease info; just push in the session storage.
         */
        if($stateParams.operateType == 0){
            console.log(item);
            $state.go('layout.doctor-recommend', {
                diseaseId: item.id
            });
            return true;
        }
        if($stateParams.operateType == 1){

        }
    };

    $scope.scrollToLetter = function (item) {
        var ele = document.getElementById(item);
        diseaseScroll.scrollToElement(ele);
    };

    function formatList(item) {
        var tempArray = [];
        var letterArray = [];
        var uList = item.usuallyDisease;
        var aList = item.allDisease;
        tempArray.push({
            disease: '常见疾病',
            id: 'tag_usually',
            type: 'tag'
        });
        for (var k = 0; k < uList.length; k++) {
            tempArray.push(uList[k]);
        }
        tempArray.push({
            disease: '全部疾病',
            id: 'tag_all',
            type: 'tag'
        });
        for (var i = 0; i < aList.length; i++) {
            tempArray.push({
                disease: aList[i].letter,
                id: aList[i].letter,
                type: 'tag'
            });
            letterArray.push(aList[i].letter);
            for (var j = 0, list = aList[i].list; j < list.length; j++) {
                tempArray.push(list[j]);
            }
        }
        return {
            diseaseList: tempArray,
            letterList: letterArray
        };
    }

    setInterval(function () {
        diseaseScroll.refresh();
    }, 500);

}]);