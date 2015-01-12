'use strict';

/**@ngInject*/
function ServiceController(service, OrderItemResource) {
  this.service = service;

  this.OrderItemResource = OrderItemResource;
}

ServiceController.prototype = {

  startService: function() {
    this.OrderItemResource.startService({order_id: this.service.order_id, id: this.service.id});
  },

  stopService: function() {
    this.OrderItemResource.stopService({order_id: this.service.order_id, id: this.service.id});
  },

  getLogs: function() {

  }

};

ServiceController.resolve = {
  /**@ngInject*/
  service: function($stateParams, $q, projects, OrderItemResource, ProductResource) {

    var deferred = $q.defer();
    var orderItemData = {};

    OrderItemResource.get({order_id: $stateParams.order_id, id: $stateParams.id}).$promise.then(function(orderItem) {

      orderItemData = orderItem;

      // Add on the project.
      orderItemData.project = _.find(projects, function(project) {
        return project.id == orderItem.project_id;
      });

      // Add on the product.
      ProductResource.get({id: orderItem.product_id}).$promise.then(function(product) {
        orderItemData.product = product;
        deferred.resolve(orderItemData);
      })

    });

    return deferred.promise;
  }
};

module.exports = ServiceController;

