/**
 * container
 */
import React from "react";
import Router, {RouteHandler} from "react-router";
import AltContainer from "alt/AltContainer";
import Configs from "config/configs";

export default React.createClass({
  displayName: "container",

  propTypes: {
    flux: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  },

  mixins: [Router.State],

  componentWillMount() {
    this._setRoute();
  },

  componentWillReceiveProps() {
    this._setRoute();
  },

  _setRoute() {
    this.routeName = "";
    if (this.isActive(Configs.ROUTE_SHELF)) {
      this.routeName = Configs.ROUTE_SHELF;
    } else if (this.isActive(Configs.ROUTE_PRODUCT_TYPE)) {
      this.routeName = Configs.ROUTE_PRODUCT_TYPE;
    }
  },

  _wrapAlt(component) {
    const Store = this.props.flux.getStore("Store"),
      Action = this.props.flux.getActions("Action");
    return (
      <AltContainer
        actions={{ Action: Action }}
        stores={{ Store: Store }}
        inject={{
          routeName: this.routeName
        }}
        >
        {component}
      </AltContainer>
    );
  },

  render() {
    // dynamic title & nav
    let title = "",
      navTarget = "",
      navText = "Review Items",
      headerHref = "/";
    if (this.routeName) {
      if (this.routeName === Configs.ROUTE_SHELF) {
        title = "Shelf Suggestion";
        headerHref = `/#/${Configs.ROUTE_SHELF}`;
      } else if (this.routeName === Configs.ROUTE_PRODUCT_TYPE) {
        title = "Product Type Suggestion";
        headerHref = `/#/${Configs.ROUTE_PRODUCT_TYPE}`;
      } else {
        navText = "";
      }
      navTarget = headerHref + "/review";
    }

    return (
      <div className="item-setup ResponsiveContainer">
        <h1>{title}</h1>
        <div className="item-setup-body">
          {this._wrapAlt(<RouteHandler/>)}
        </div>
      </div>
    );
  }
});
