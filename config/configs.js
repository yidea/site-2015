/**
 * configs
 */
module.exports = {
  APP_DEV_PORT: 3000,
  WEBPACK_DEV_PORT: 2992,
  API_QARTH_SHELF: "http://model.stg.cdqarth.prod.walmart.com/tags/shelf?confidence=0.0",
  API_QARTH_PRODUCT_TYPE:
    "http://model.stg.cdqarth.prod.walmart.com/tags/product_type?confidence=0.0",
  API_FIREBASE: "https://sweltering-heat-7932.firebaseio.com/",
  sessionSecret: process.env.SESSION_SECRET || "12345",
  ROUTE_SHELF: "shelf",
  ROUTE_PRODUCT_TYPE: "product-type"
};
