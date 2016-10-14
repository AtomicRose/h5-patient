app.controller('IndexCtrl', ['$scope', function ($scope) {
    $scope.hello = 'This is the index html.';

        DynamicLoad.ready({
            components: ['dialog', ['helper', false]],
            jsFiles: [],
            cssFiles: [],
            modules: ['ngDialog']
        }, ['dialog', 'helper', function (dialog, helper) {
            console.log(dialog);
            console.log(helper);
            console.log(app);
        }]);
}]);
