/**
 * Express
 */
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import flash from "express-flash";
import morgan from "morgan";
import methodOverride from "method-override";
import compression from "compression";
import exphbs from "express-handlebars";

import Configs from "../config/configs";
import routeApp from "./routes/routeApp";
import routeApi from "./routes/routeApi";

let app = module.exports = express(),
  HOST = process.env.HOST || "127.0.0.1",
  PORT = process.env.PORT || Configs.APP_DEV_PORT,
  env = process.env.NODE_ENV = process.env.NODE_ENV || "development",
  WEBPACK_DEV = process.env.WEBPACK_DEV === "true";

// Express setup, middleware
app.engine("hbs", exphbs({extname: ".hbs"}));
app.set("views", path.join(__dirname, "./views"));
app.use("/js", express.static(path.join(__dirname, "../dist/js")));
app.use(express.static(path.join(__dirname, "../..", "public")));
// app.use(express.static(__dirname + "/dist", { maxage: "720h" })); // set Etag, maxage
// X-Powered-By header has no functional value.
// Keeping it makes it easier for an attacker to build the site"s profile
app.disable("x-powered-by");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded w req.body
app.use(methodOverride()); // method override
if (WEBPACK_DEV) {
  app.use(morgan("dev")); // log request to console on DEV
}

// Cookie parser should be above session
// cookieParser - Parse Cookie header and populate req.cookies with an object keyed by cookie names
app.use(cookieParser());
// Create a session middleware with the given options, set store strategy
app.use(session({
  resave: true,
  saveUninitialized: true,
  // Use generic cookie name for security purposes
  key: "sessionId",
  secret: Configs.sessionSecret,
  // Add HTTPOnly, Secure attributes on Session Cookie
  cookie: {
    httpOnly: true,
    secure: true
  }
}));
app.use(flash()); // use flash
app.use(compression()); // gzip response

// init global variables
app.locals.host = HOST;

/**
 * Routes
 */
// App
app.use("/", routeApp);

// REST API
app.use("/api", routeApi);

// 404 custom error handler
app.use((req, res) => { //handle all unhandled requests, put at bottom
  res
    .status(404)
    .render("index.hbs", {
      layout: false,
      title: "404 Page",
      content: "404 Page. Sorry, page not found"
    });
});

// Start server
app.listen(PORT);

export default app;
