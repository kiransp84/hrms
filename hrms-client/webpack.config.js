const path = require('path');

module.exports = {
    entry: path.resolve(__dirname,'src/index.js'),
    output :{
        filename: 'bundle.js',
        path : path.resolve(__dirname,'dist')
    },
    devtool : 'source-map',
    mode:'development',
    module : {
        rules : [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use:['babel-loader']
            },
            {
                test: /\.css$/i,
                use:[
                    {
                        loader:"style-loader",
                        options : { injectType : "styleTag"}
                    },
                    {
                        loader:"css-loader",
                        options : { modules : true }
                    }
                ]
            },
        ]
    },
    devServer:{
        static: path.join(__dirname, 'public/'),
        devMiddleware : {            
            //publicPath : '/dist/'
        },
        port:3001,
        hot:"only",
        proxy : {
            '/bff':'http://localhost:3000'
        }
    }
}