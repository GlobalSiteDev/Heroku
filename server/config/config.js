const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET: '19megaSECRET!password92',
        DATABASE: 'mongodb://localhost:27017/testApp'
    }
}

exports.get = function get(env){
    return config[env] || config.default
}