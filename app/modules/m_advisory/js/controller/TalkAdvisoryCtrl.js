app.controller('TalkAdvisoryCtrl', ['$rootScope', '$scope', 'dialog','$state', function ($rootScope, $scope, dialog,$state) {
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: false,
        title: '在线咨询'
    };
    window.headerConfig.otherRightOperate= {
        enable: true,
        html: '重新提问',
        clickCall: goBack
    }
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    
    function goBack(){
        dialog.confirm('您将退出本次对话（内容不做保留），欢迎您再次咨询！',{
            okText: '确认退出',
            cancelText: '关闭弹框',
            closeCallback: function(value){
                if(value == 0){
                }
                if(value == 1){
                    $state.go('layout.advisory-before');
                }
            }
        })
    }

    var talkList = [
        {from: 'myzd', text: '您好'},
        {from: 'myzd', text: '哈喽'},
        {from: 'client', text: '吃饭起'},
        {from: 'myzd', text: '好！'},
        {
            from: 'myzd', doc: {
                name: '许三观',
                hospital: '北京协和医院',
                dept: '心血管外科',
                title: '教授',
                class: '主任医师'
            }
        }
    ];

    $scope.talkList = talkList;

    var talkContentScroll = new IScroll('#talkContentScroll', {
        mouseWheel: false,
        click: true
    });

    
    setInterval(function () {
        talkContentScroll.refresh();
        if (needScroll) {
            talkContentScroll.scrollTo(0, talkContentScroll.maxScrollY, 0);
            needScroll = false;
        }
    }, 500);

    var needScroll = false;
    $scope.upText = function(event,_text){
        // console.log('_text',_text);
        if(event.which === 13) {
            var textObj = {
                from: 'client', text: _text
            }
            talkList.push(textObj);
            $scope.talkList = talkList;
            $scope.talkText = '';
            needScroll = true;
        }
    }


}]);