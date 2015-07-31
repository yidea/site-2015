/**
 * routeApp
 */
import express from "express";
import Configs from "../../config/configs";

let router = express.Router(),
  WEBPACK_DEV = process.env.WEBPACK_DEV === "true",
  HOST = process.env.HOST || "127.0.0.1";

router.get("/", (req, res) => {
  // Render JS? Server-side? Bootstrap?
  // JS/CSS bundle rendering.
  let bundleJs;
  let bundleCss;
  let renderJs = true;
  if (WEBPACK_DEV) {
    bundleJs = "http://" + HOST + ":" + Configs.WEBPACK_DEV_PORT + "/js/bundle.js";
    // bundleJs = `http://127.0.0.1:${WEBPACK_DEV_PORT}/js/bundle.js`;
    // bundleCss = `http://127.0.0.1:${WEBPACK_DEV_PORT}/js/style.css`;
  } else { // PROD
    let stats = require("../../dist/server/stats.json");
    bundleJs = path.join("/js", stats.assetsByChunkName.main[0]);
    bundleCss = path.join("/js", stats.assetsByChunkName.main[1]);
  }
  // Server-rendered page.
  let content;
  // if (renderSs) {
  //  content = res.locals.bootstrapComponent ||
  //    React.renderToString(new Page({ flux: new Flux() }));
  // }

  // Response.
  res.render("index.hbs", {
    layout: false,
    title: WEBPACK_DEV ? "Dev" : "Prod",
    bootstrap: res.locals.bootstrapData,
    render: {
      js: renderJs
    },
    bundles: {
      js: bundleJs,
      css: bundleCss
    },
    content: content
  });
});

export default router;
