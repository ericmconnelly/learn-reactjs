var webpack = require('webpack');
var path = require('path');
var bower_dir = path.join(__dirname, 'bower_components');
var node_modules_dir = path.join(__dirname, 'node_modules');

var config = {
    devtool: 'inline-source-map',
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(path);
    },
    cache: true,
    entry: {
        app: ["webpack/hot/dev-server", "./js/app.js"],
        //app: ['./js/app.js'],
        //拆分应用和第三方应用
        vendors: ['react','jquery','bootstrap','bootstrap.css', 'lodash']
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
            {
                test: /\.js?$/,
                loaders: ['react-hot', 'babel'],
                exclude: [bower_dir, node_modules_dir]
            },
            //{test: /\.js$/, loader: ['react-hot', 'babel'], exclude: [bower_dir, node_modules_dir]},
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
        //如果用了*.min.js 就没有必要再次混淆编译
        //new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
};

config.addVendor('lodash', path.resolve(bower_dir, 'lodash/lodash.min.js'));
config.addVendor('jquery', path.resolve(bower_dir, 'jquery/jquery.min.js'));
config.addVendor('bootstrap', bower_dir + '/bootstrap/js/bootstrap.min.js');
config.addVendor('bootstrap.css', bower_dir + '/bootstrap/css/bootstrap.min.css');

module.exports = config;
