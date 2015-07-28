# DJ人脉公共标签维护

##用webpack构建的简单React应用实践

## Step by Step

  * 安装nodejs
  * npm install 相关插件
    * npm install webpack -g 全局安装webpack
    * npm install xxx-loader --save-dev 加入相应资源加载工具
  * 执行webpack打包到bundle.js

## webpack配置文件
```js
// webpack.config.js
var webpack = require('webpack');
var path = require('path');
var bower_dir = path.join(__dirname, 'bower_components');
var node_modules_dir = path.join(__dirname, 'node_modules');

var config = {
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(path);
    },
    cache: true,
    entry: {
        app: ['./js/app.js'],
        //拆分应用和第三方应用
        vendors: ['react','jquery','bootstrap','bootstrap.css']
    },
    output: {
        //多重入口的场景 可以选对应用名称打包应用文件 example:(app/mobile)
        //filename: '[name].js'
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },
    resolve: {
        alias: {}
    },
    module: {
        noParse: [],
        loaders: [
            {test: /\.js$/, loader: 'jsx-loader', exclude: [bower_dir, node_modules_dir]},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: path.resolve(bower_dir, 'jquery/jquery.min.js'), loader: 'expose?jQuery'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff2"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
        //如果用了*.min.js 就没有必要再次混淆编译
        //new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ]
};

config.addVendor('react', path.resolve(bower_dir, 'react/react.min.js'));
//config.addVendor('flux', path.resolve(bower_dir, 'ss/Flux.js'));
config.addVendor('jquery', path.resolve(bower_dir, 'jquery/jquery.min.js'));
config.addVendor('bootstrap', bower_dir + '/bootstrap/js/bootstrap.min.js');
config.addVendor('bootstrap.css', bower_dir + '/bootstrap/css/bootstrap.min.css');

module.exports = config;
```

