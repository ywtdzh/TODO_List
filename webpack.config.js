let path = require('path');

module.exports = {
    "entry": {
        "app": "./react-app/App.jsx"
    },
    "output": {
        "filename": "[name].js",
        "path": path.resolve(__dirname, 'static')
    },
    "module": {
        "loaders": [
            {test: /\.jsx$/, loader: 'babel-loader', exclude:'/node_modules/'},
            {test: /\.js$/, loader: 'babel-loader', exclude:'/node_modules/'},
            {test: /\.css$/, loader: 'style-loader!css-loader', exclude:'/node_modules/'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
            {test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml"}
        ]
    },
    "node": {
        "file": "empty",
        "url": "empty",
    }
};