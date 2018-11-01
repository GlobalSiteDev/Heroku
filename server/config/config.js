const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET: '19megaSECRET!password92',
        DATABASE: 'mongodb://BohdanMohitych:BOHDANmohitych1992@ds249123.mlab.com:49123/heroku_mx2wcd8m'
    }
}

exports.get = function get(env){
    return config[env] || config.default
}