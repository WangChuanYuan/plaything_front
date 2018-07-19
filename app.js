//引入express及中间件
var express = require('express');
var proxy = require('http-proxy-middleware')
var app = express();

//指定启动服务器到哪个文件夹，express将dist作为静态资源
app.use(express.static('./dist'));
app.use('/api',proxy({
  target: 'http://localhost:8080', // target host
  changeOrigin: true,               // needed for virtual hosted sites
  ws: true,                         // proxy websockets
  pathRewrite: {
    '^/api' : '',
  },
}))

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
