/**
 * Created by vsury1 on 12/17/15.
 */

angular.module('cartApp', ['ui.router'])
    .config(configFn)
    .service('cartService', cartService)
    .controller('itemController', itemController)
    .controller('basketController', basketController);


configFn.$injector = ['$stateProvider', '$urlRouterProvider'];
basketController.$injector = ['cartService', '$scope'];
itemController.$injector = ['cartService'];
cartService.$injector = ['$http'];

function configFn($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/cartApp');

    $stateProvider.state('cartApp', {
        url: '/cartApp',
        views: {
            "Items": {
                templateUrl: './src/templates/items.html',
                controller: 'itemController',
                controllerAs: 'itemC'
            },
            "Basket": {
                templateUrl: './src/templates/basket.html',
                controller: 'basketController',
                controllerAs: 'basketC'
            }
        }

    });
}

function basketController(cartService, $scope) {
    "use strict";
    var basketC = this;
    basketC.totalItems = 0;
    cartService.getProducts().then(function (response) {
        basketC.products = response.data.Details;
    });
    $scope.$watch(function () {
        return cartService.getUpdatedProducts();
    }, function (oldVal) {
        basketC.products = oldVal;
    });
}
function itemController(cartService) {
    "use strict";
    var itemC = this;
    itemC.sortBase = 'Name';
    cartService.getProducts().then(function (response) {
        itemC.products = cartService.products = response.data.Details;
    });
    itemC.updateQty = function (index, boolean) {
        $.grep(itemC.products, function (product) {
            if (product.Id === index) {
                if (boolean) {
                    product.BasketQty = product.BasketQty + 1;
                }
                else {
                    product.BasketQty = product.BasketQty - 1;
                }
            }
        });
        cartService.updateProducts(itemC.products);
    };
}

function cartService($http) {
    "use strict";
    var products = [];

    return {
        getProducts: getProducts,
        updateProducts: updateProducts,
        getUpdatedProducts: getUpdatedProducts
    };

    function getProducts() {
        return $http({
            url: '//localhost:9000/products',
            method: 'GET',
            params: {callback: 'JSON_CALLBACK'},
            cache: 'false'
        });
    }

    function getUpdatedProducts() {
        return products;
    }

    function updateProducts(product) {
        products = product;
    }
}