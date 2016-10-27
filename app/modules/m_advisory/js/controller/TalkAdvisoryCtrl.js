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
                    $state.go('layout.home');
                }
            }
        })
    }

    var talkList = [
        {from: 'myzd', text: '您好'},
        {from: 'myzd', text: '哈喽'},
        {from: 'client', text: '吃饭起'},
        {from: 'myzd', text: '好！'}
    ];

    $scope.talkList = talkList;

    var talkContentScroll = new IScroll('#talkContentScroll', {
        mouseWheel: false,
        click: true
    });

    setInterval(function () {
        talkContentScroll.refresh();
    }, 500);


    $scope.upText = function(event,_text){
        // console.log('_text',_text);
        if(event.which === 13) {
            var textObj = {
                from: 'client', text: _text
            }
            talkList.push(textObj);
            $scope.talkList = talkList;
            $scope.talkText = '';
            talkContentScroll.scrollTo(0, talkContentScroll.maxScrollY, 0);
        }
    }


}]);