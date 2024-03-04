module.exports = {
    // other configurations...
    mode: 'development', // or 'production'
    resolve: {
        fallback: {
            crypto: require.resolve('crypto-browserify')
        }
    }
};
