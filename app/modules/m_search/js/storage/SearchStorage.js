app.factory('SearchStorage', ['ngStorage', function (ngStorage) {
    var search_storage = ngStorage.sessionStorage('search_local_obj');
    return{
        SEARCH_STORAGE: search_storage
    };
}]);