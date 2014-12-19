'use strict';

/**@ngInject*/
var ProjectsServicesController = function($scope, $modalInstance, Cart, products, categories) {

  this.Cart = Cart;

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  /**
   * @todo This mirrors the marketplace controller currently
   *       and very close to the admin/products page.
   *       Perhaps we could wrap it up into a service/factory better.
   */
  this.categories = categories;
  // Only display non deleted products.
  this.products = _.filter(products, function(product) {
    return product.deleted_at === null;
  });

  _.each(this.categories, _.bind(function(category) {
    category.products = _.filter(this.products, function(product) {
      return product.product_category_id == category.id;
    });
  }, this));
};

ProjectsServicesController.prototype = {

  addToCart: function(projectId, productId, productName) {
    this.Cart.add(projectId, productId, productName);
  }
};

module.exports = ProjectsServicesController;