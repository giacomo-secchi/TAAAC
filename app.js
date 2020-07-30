require('dotenv').load();
const path = require("path")
    , fs = require("fs")
    , express = require("express")
    , morgan = require('morgan')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , helpers = require('./api/helpers')
    , webpack = require('webpack')
    , webpackDevMiddleware = require('webpack-dev-middleware');

require("./api/models/db");
require('./api/config/passport'); 

const app = express();

const hostname = "127.0.0.1";
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



if (process.env.NODE_ENV == "development") {
  // log
  var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
  app.use(morgan('combined', { stream: accessLogStream }));



  // webpack development middleware configuration
  const webpackConfig = require('./webpack.dev');
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    // noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require("webpack-hot-middleware")(compiler));
}

var options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now());
  }
};

app.use(express.static(path.join(__dirname, "public"), options));

app.use(passport.initialize());

// set views
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "server", "views"));

// set routes
const routesApi = require("./api/routes/index");
app.use('/api', routesApi);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    helpers.sendJSONResponse(res, 401, 
      {
        "message" : `${err.name}: ${err.message}`
      }
    );
  }
});


const routes = require("./server/routes/index");
app.use("/", routes);


app.listen(PORT, () =>
  console.log(`Server running at http://${hostname}:${PORT}/`)
);
